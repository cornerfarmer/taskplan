import json
import time

from flask import Flask, jsonify, Response
from flask import request, render_template

from taskplan.Controller import Controller
from taskplan.EventManager import EventManager

try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path

def run():
    event_manager = EventManager()

    controller = Controller(event_manager, allow_remote=True)
    controller.start()

    app = Flask(__name__, static_folder="web/build/static", static_url_path="/static", template_folder="web/build")
    app.config["DEBUG"] = True

    @app.route('/')
    def static_page():
        return render_template('index.html')

    @app.route('/update')
    def update():
        def gen():
            q = event_manager.subscribe()
            print("subscribe")

            controller.update_new_client(q)

            try:
                while True:
                    event = q.get()
                    yield event.encode()
            finally:
                event_manager.unsubscribe(q)
                print("unsubscribe")

        return Response(gen(), mimetype="text/event-stream")

    @app.route('/start/<int:total_iterations>', methods=['POST'])
    def start(total_iterations):
        data = json.loads(request.form.get('data'))
        controller.start_new_task(data["params"], data["config"], total_iterations, device_uuid=data["device"])
        return jsonify({})

    @app.route('/test/<int:total_iterations>', methods=['POST'])
    def test(total_iterations):
        data = json.loads(request.form.get('data'))
        controller.start_new_task(data["params"], data["config"], total_iterations, is_test=True, device_uuid=data["device"])
        return jsonify({})

    @app.route('/pause/<string:task_uuid>')
    def pause(task_uuid):
        controller.pause_task(task_uuid)
        return jsonify({})

    @app.route('/pause_all/')
    def pause_all():
        controller.pause_all_tasks()
        return jsonify({})

    @app.route('/terminate/<string:task_uuid>')
    def terminate(task_uuid):
        controller.terminate_task(task_uuid)
        return jsonify({})

    @app.route('/save_now/<string:task_uuid>')
    def save_now(task_uuid):
        controller.save_now_task(task_uuid)
        return jsonify({})

    @app.route('/cancel/<string:task_uuid>')
    def cancel(task_uuid):
        controller.cancel_task(task_uuid)
        return jsonify({})

    @app.route('/reload')
    def reload():
        controller.reload()
        return jsonify({})

    @app.route('/remove_task/<string:task_uuid>')
    def remove_task(task_uuid):
        controller.remove_task(task_uuid)
        return jsonify({})

    @app.route('/remove_param/<string:param_uuid>')
    def remove_param(param_uuid):
        controller.remove_param(param_uuid)
        return jsonify({})

    @app.route('/remove_param_value/<string:param_value_uuid>')
    def remove_param_value(param_value_uuid):
        controller.remove_param_value(param_value_uuid)
        return jsonify({})

    @app.route('/run_now/<string:task_uuid>')
    def run_now(task_uuid):
        controller.run_task_now(task_uuid)
        return jsonify({})

    @app.route('/continue/<string:task_uuid>/<string:device_uuid>')
    @app.route('/continue/<string:task_uuid>/<string:device_uuid>/<int:total_iterations>')
    def continue_task(task_uuid, device_uuid, total_iterations=0):
        controller.continue_task(task_uuid, total_iterations, device_uuid)
        return jsonify({})

    @app.route('/finish/<string:task_uuid>')
    def finish(task_uuid):
        controller.finish_task(task_uuid)
        return jsonify({})

    @app.route('/reorder_task/<string:task_uuid>/<int:new_index>')
    def reorder_task(task_uuid, new_index):
        controller.reorder_task(task_uuid, new_index)
        return jsonify({})

    @app.route('/edit_param/<string:param_uuid>', methods=['POST'])
    def edit_param(param_uuid):
        new_data = json.loads(request.form.get('data'))
        controller.edit_param(param_uuid, new_data)
        return jsonify({})

    @app.route('/edit_param_value/<string:param_uuid>/<string:param_value_uuid>', methods=['POST'])
    def edit_param_value(param_uuid, param_value_uuid):
        new_data = json.loads(request.form.get('data'))
        controller.edit_param_value( param_uuid, param_value_uuid, new_data)
        return jsonify({})

    @app.route('/add_param', methods=['POST'])
    def add_param():
        new_data = json.loads(request.form.get('data'))
        controller.add_param(new_data)
        return jsonify({})

    @app.route('/add_param_batch', methods=['POST'])
    def add_param_batch():
        config = json.loads(request.form.get('data'))["config"]
        controller.add_param_batch(config)
        return jsonify({})

    @app.route('/add_param_value/<string:param_uuid>', methods=['POST'])
    def add_param_value(param_uuid):
        new_data = json.loads(request.form.get('data'))
        controller.add_param_value(param_uuid, new_data)
        return jsonify({})

    @app.route('/change/<string:task_uuid>/<int:total_iterations>')
    def change(task_uuid, total_iterations):
        controller.change_total_iterations(task_uuid, total_iterations)
        return jsonify({})

    @app.route('/tensorboard')
    def open_tensorboard():
        return Response(str(controller.open_tensorboard()), 'text/xml')

    @app.route('/log')
    @app.route('/log/<string:task_uuid>')
    @app.route('/log/<string:task_uuid>/<string:sub_task>')
    def log(task_uuid="", sub_task=""):
        if task_uuid is "":
            return render_template('log.html', task_name="Global")
        else:
            #task = controller.find_task_by_uuid(task_uuid)
            return render_template('log.html', task_uuid=task_uuid, sub_task=sub_task, task_name="", created=str(""))

    @app.route('/read_log/')
    @app.route('/read_log/<string:task_uuid>')
    @app.route('/read_log/<string:task_uuid>/<string:sub_task>')
    def read_log(task_uuid="", sub_task=""):
        if task_uuid is not "":
            path = controller.get_task_dir(task_uuid)
            if sub_task is not "":
                path /= Path(sub_task)
            log_path = str(path / "main.log")
        else:
            log_path = str(Path('.') / "global.log")

        def gen():
            log_file = open(log_path, 'r')

            while not log_file.closed:
                line = log_file.readline()
                if not line:
                    time.sleep(1)
                else:
                    yield "data: " + line + "\n\n"

        return Response(gen(), mimetype="text/event-stream")

    @app.route('/change_max_running/<int:new_max_running>')
    def change_max_running(new_max_running):
        controller.change_max_running_tasks(new_max_running)
        return jsonify({})

    @app.route('/add_code_version/<string:version_name>')
    def add_code_version(version_name):
        controller.add_code_version(version_name)
        return jsonify({})

    @app.route('/select_code_version/<string:version_uuid>')
    def select_code_version(version_uuid):
        controller.select_code_version(version_uuid)
        return jsonify({})

    @app.route('/config/param_value', methods=['POST'])
    @app.route('/config/param_value/<string:param_value_uuid>', methods=['POST'])
    def config_param_value(param_value_uuid=None):
        base_uuid = json.loads(request.form.get('data'))["bases"]
        return jsonify(controller.config_param_value(base_uuid[0] if len(base_uuid) > 0 and base_uuid[0] != "" else None, param_value_uuid))

    @app.route('/config/existing_task/<string:task_uuid>', methods=['POST'])
    def config_existing_task(task_uuid):
        return jsonify(controller.existing_task_config(task_uuid))

    @app.route('/config/task', methods=['POST'])
    def config_task():
        param_value_uuids = json.loads(request.form.get('data'))["bases"]
        return jsonify(controller.task_config(param_value_uuids))

    @app.route('/clone_task/<string:task_uuid>')
    def clone_task(task_uuid):
        controller.clone_task(task_uuid)

        return jsonify({})

    @app.route('/set_task_notes/<string:task_uuid>', methods=['POST'])
    def set_task_notes(task_uuid):
        new_notes = json.loads(request.form.get('data'))["notes"]
        controller.set_task_notes(task_uuid, new_notes)

        return jsonify({})

    @app.route('/extract_checkpoint/<string:task_uuid>/<int:checkpoint_id>')
    def extract_checkpoint(task_uuid, checkpoint_id):
        controller.extract_checkpoint(task_uuid, checkpoint_id)

        return jsonify({})


    @app.route('/reorder_param/<string:param_uuid>/<int:new_index>')
    def reorder_param(param_uuid, new_index):
        controller.reorder_param(param_uuid, new_index)
        return jsonify({})

    @app.route('/connect_device/<string:device_uuid>')
    def connect_device(device_uuid):
        controller.connect_device(device_uuid)
        return jsonify({})


    @app.route('/disconnect_device/<string:device_uuid>')
    def disconnect_device(device_uuid):
        controller.disconnect_device(device_uuid)
        return jsonify({})


    @app.route('/add_device/<string:device_address>')
    def add_device(device_address):
        controller.add_device(device_address)
        return jsonify({})

    @app.route('/create_checkpoint/<string:task_uuid>')
    def create_checkpoint(task_uuid):
        controller.create_checkpoint(task_uuid)
        return jsonify({})

    return app, controller
