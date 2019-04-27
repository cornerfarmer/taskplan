from flask import Flask, jsonify, Response

from taskplan.Controller import Controller
from taskplan.EventManager import EventManager, EventType

import time
from flask import request, render_template
import json
try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path

def run():
    event_manager = EventManager()

    controller = Controller(event_manager)
    controller.start()

    app = Flask(__name__, static_folder="web/dist", static_url_path="/static", template_folder="web/dist")

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

    @app.route('/start/<string:project_name>/<int:total_iterations>', methods=['POST'])
    def start(project_name, total_iterations):
        data = json.loads(request.form.get('data'))
        controller.start_new_task(project_name, data["choices"], data["config"], total_iterations)
        return jsonify({})

    @app.route('/pause/<string:task_uuid>')
    def pause(task_uuid):
        controller.pause_task(task_uuid)
        return jsonify({})

    @app.route('/save_now/<string:task_uuid>')
    def save_now(task_uuid):
        controller.save_now_task(task_uuid)
        return jsonify({})

    @app.route('/cancel/<string:task_uuid>')
    def cancel(task_uuid):
        controller.cancel_task(task_uuid)
        return jsonify({})

    @app.route('/remove/<string:task_uuid>')
    def remove(task_uuid):
        controller.remove_task(task_uuid)
        return jsonify({})

    @app.route('/run_now/<string:task_uuid>')
    def run_now(task_uuid):
        controller.run_task_now(task_uuid)
        return jsonify({})

    @app.route('/continue/<string:task_uuid>')
    @app.route('/continue/<string:task_uuid>/<int:total_iterations>')
    def continue_task(task_uuid, total_iterations=0):
        controller.continue_task(task_uuid, total_iterations)
        return jsonify({})

    @app.route('/finish/<string:task_uuid>')
    def finish(task_uuid):
        controller.finish_task(task_uuid)
        return jsonify({})

    @app.route('/reorder/<string:task_uuid>/<int:new_index>')
    def reorder_task(task_uuid, new_index):
        controller.reorder_task(task_uuid, new_index)
        return jsonify({})

    @app.route('/edit_preset/<string:project_name>/<string:preset_uuid>', methods=['POST'])
    def edit_preset(project_name, preset_uuid):
        new_data = json.loads(request.form.get('data'))
        controller.edit_preset(project_name, preset_uuid, new_data)
        return jsonify({})

    @app.route('/edit_choice/<string:project_name>/<string:preset_uuid>/<string:choice_uuid>', methods=['POST'])
    def edit_choice(project_name, preset_uuid, choice_uuid):
        new_data = json.loads(request.form.get('data'))
        controller.edit_choice(project_name, preset_uuid, choice_uuid, new_data)
        return jsonify({})

    @app.route('/add_preset/<string:project_name>', methods=['POST'])
    def add_preset(project_name):
        new_data = json.loads(request.form.get('data'))
        controller.add_preset(project_name, new_data)
        return jsonify({})

    @app.route('/add_choice/<string:project_name>/<string:preset_uuid>', methods=['POST'])
    def add_choice(project_name, preset_uuid):
        new_data = json.loads(request.form.get('data'))
        controller.add_choice(project_name, preset_uuid, new_data)
        return jsonify({})

    @app.route('/change/<string:task_uuid>/<int:total_iterations>')
    def change(task_uuid, total_iterations):
        controller.change_total_iterations(task_uuid, total_iterations)
        return jsonify({})

    @app.route('/tensorboard/<string:project_name>')
    def open_tensorboard(project_name):
        return Response(str(controller.open_tensorboard(project_name)), 'text/xml')

    @app.route('/log')
    @app.route('/log/<string:task_uuid>')
    @app.route('/log/<string:task_uuid>/<string:sub_task>')
    def log(task_uuid="", sub_task=""):
        if task_uuid is "":
            return render_template('log.html', preset_name="Global")
        else:
            task = controller.project_manager.find_task_by_uuid(task_uuid)
            return render_template('log.html', task_uuid=task_uuid, sub_task=sub_task, preset_name="", created=str(task.creation_time))

    @app.route('/read_log/')
    @app.route('/read_log/<string:task_uuid>')
    @app.route('/read_log/<string:task_uuid>/<string:sub_task>')
    def read_log(task_uuid="", sub_task=""):
        if task_uuid is not "":
            task = controller.project_manager.find_task_by_uuid(task_uuid)
            path = task.build_save_dir()
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

    @app.route('/addVersion/<string:project_name>/<string:version_name>')
    def add_version(project_name, version_name):
        controller.add_version(project_name, version_name)
        return jsonify({})

    @app.route('/config/choice/new/<string:project_name>')
    @app.route('/config/choice/new/<string:project_name>/<string:preset_base_uuid>')
    @app.route('/config/choice/<string:project_name>/<string:preset_uuid>')
    @app.route('/config/choice/<string:project_name>/<string:preset_uuid>/<string:preset_base_uuid>')
    def config_choice(project_name, preset_base_uuid=None, preset_uuid=None):
        return jsonify(controller.config(project_name, preset_base_uuid, preset_uuid))

    @app.route('/config/task_timestep/<string:task_uuid>')
    @app.route('/config/task_timestep/<string:task_uuid>/<int:iteration>')
    def config_task_timestep(task_uuid, iteration=-1):
        task = controller.project_manager.find_task_by_uuid(task_uuid)
        if task is not None:
            if iteration == -1:
                iteration = task.finished_iterations_and_update_time()[0]
            return jsonify({'inherited_config': task.preset.compose_config_for_timestep(iteration), 'config': {}, 'dynamic': False})
        else:
            return jsonify({})

    @app.route('/config/task/<string:preset_base_uuid>/<string:task_uuid>')
    def config_task(preset_base_uuid, task_uuid):
        task = controller.project_manager.find_task_by_uuid(task_uuid)
        if task is not None:
            configuration = task.project.configuration
            if preset_base_uuid in configuration.presets_by_uuid:
                preset_base = configuration.presets_by_uuid[preset_base_uuid]
                return jsonify({'inherited_config': preset_base.compose_config(), 'config': task.preset.data['config'], 'dynamic': preset_base.treat_dynamic()})
            else:
                return jsonify({})
        else:
            return jsonify({})

    @app.route('/adjust_task_preset/<string:task_uuid>', methods=['POST'])
    def adjust_task_preset(task_uuid):
        new_data = json.loads(request.form.get('data'))
        controller.adjust_task_preset(task_uuid, new_data)

        return jsonify({})

    @app.route('/clone_task/<string:task_uuid>')
    def clone_task(task_uuid):
        controller.clone_task(task_uuid)

        return jsonify({})

    return app
