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

def run(projects, max_running):
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

    @app.route('/start/<string:project_name>/<string:preset_uuid>/<int:total_iterations>')
    def start(project_name, preset_uuid, total_iterations):
        controller.start_new_task(project_name, preset_uuid, total_iterations)
        return ""

    @app.route('/pause/<string:task_uuid>')
    def pause(task_uuid):
        controller.pause_task(task_uuid)
        return ""

    @app.route('/save_now/<string:task_uuid>')
    def save_now(task_uuid):
        controller.save_now_task(task_uuid)
        return ""

    @app.route('/cancel/<string:task_uuid>')
    def cancel(task_uuid):
        controller.cancel_task(task_uuid)
        return ""

    @app.route('/run_now/<string:task_uuid>')
    def run_now(task_uuid):
        controller.run_task_now(task_uuid)
        return ""

    @app.route('/continue/<string:task_uuid>')
    @app.route('/continue/<string:task_uuid>/<int:total_iterations>')
    def continue_task(task_uuid, total_iterations=0):
        controller.continue_task(task_uuid, total_iterations)
        return ""

    @app.route('/finish/<string:task_uuid>')
    def finish(task_uuid):
        controller.finish_task(task_uuid)
        return ""

    @app.route('/reorder/<string:task_uuid>/<int:new_index>')
    def reorder_task(task_uuid, new_index):
        controller.reorder_task(task_uuid, new_index)
        return ""

    @app.route('/edit/<string:project_name>/<string:preset_uuid>', methods=['POST'])
    def edit_preset(project_name, preset_uuid):
        new_data = json.loads(request.form.get('data'))
        controller.edit_preset(project_name, preset_uuid, new_data)
        return ""

    @app.route('/add/<string:project_name>', methods=['POST'])
    def add_preset(project_name):
        new_data = json.loads(request.form.get('data'))
        controller.add_preset(project_name, new_data)
        return ""

    @app.route('/change/<string:task_uuid>/<int:total_iterations>')
    def change(task_uuid, total_iterations):
        controller.change_total_iterations(task_uuid, total_iterations)
        return ""

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
            return render_template('log.html', task_uuid=task_uuid, sub_task=sub_task, preset_name=task.preset.name, try_number=task.try_number, created=str(task.creation_time))

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
        return ""

    @app.route('/addVersion/<string:project_name>/<string:version_name>')
    def add_version(project_name, version_name):
        controller.add_version(project_name, version_name)
        return ""

    @app.route('/config/preset/<string:project_name>')
    @app.route('/config/preset/<string:project_name>/<string:preset_base_uuid>')
    @app.route('/config/preset/<string:project_name>/<string:preset_base_uuid>/<string:preset_uuid>')
    def config_preset(project_name, preset_base_uuid=None, preset_uuid=None):
        project = controller.project_manager.project_by_name(project_name)
        configuration = project.configuration

        if preset_base_uuid is None and preset_uuid is None:
            return jsonify({'inherited_config': {}, "config": configuration.presets_by_uuid[configuration.default_preset_uuid].compose_config(), 'dynamic': False})

        if preset_base_uuid in configuration.presets_by_uuid:
            preset_base = configuration.presets_by_uuid[preset_base_uuid]

            if preset_uuid is not None:
                if preset_uuid in configuration.presets_by_uuid:
                    preset = configuration.presets_by_uuid[preset_uuid]
                    config = preset.data['config']
                else:
                    return ""
            else:
                config = None

            return jsonify({'inherited_config': preset_base.compose_config(), "config": config, 'dynamic': preset_base.treat_dynamic()})
        else:
            return ""

    @app.route('/config/task_timestep/<string:task_uuid>')
    @app.route('/config/task_timestep/<string:task_uuid>/<int:iteration>')
    def config_task_timestep(task_uuid, iteration=-1):
        task = controller.project_manager.find_task_by_uuid(task_uuid)
        if task is not None:
            if iteration == -1:
                iteration = task.finished_iterations_and_update_time()[0]
            return jsonify({'inherited_config': task.preset.compose_config_for_timestep(iteration), 'config': {}, 'dynamic': False})
        else:
            return ""

    @app.route('/config/task/<string:preset_base_uuid>/<string:task_uuid>')
    def config_task(preset_base_uuid, task_uuid):
        task = controller.project_manager.find_task_by_uuid(task_uuid)
        if task is not None:
            configuration = task.project.configuration
            if preset_base_uuid in configuration.presets_by_uuid:
                preset_base = configuration.presets_by_uuid[preset_base_uuid]
                return jsonify({'inherited_config': preset_base.compose_config(), 'config': task.preset.data['config'], 'dynamic': preset_base.treat_dynamic()})
            else:
                return ""
        else:
            return ""

    @app.route('/adjust_task_preset/<string:task_uuid>', methods=['POST'])
    def adjust_task_preset(task_uuid):
        new_data = json.loads(request.form.get('data'))
        controller.adjust_task_preset(task_uuid, new_data)

        return ""

    @app.route('/clone_task/<string:task_uuid>')
    def clone_task(task_uuid):
        controller.clone_task(task_uuid)

        return ""

    return app
