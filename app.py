from flask import Flask, jsonify, Response

from EventManager import EventManager, ServerSentEvent, EventType
from Project import Project
from ProjectManager import ProjectManager
from Scheduler import Scheduler
import time
import threading
from flask import request, render_template
import json

from config.Preset import Preset


def run(projects, max_running):
    event_manager = EventManager()
    scheduler = Scheduler(event_manager, max_running)
    project_manager = ProjectManager(projects, event_manager)

    def update_clients():
        while True:
            scheduler.update_clients()
            project_manager.update_clients()

            time.sleep(3)

    t = threading.Thread(target=update_clients)
    t.start()

    app = Flask(__name__, static_folder="web/dist", static_url_path="/static", template_folder="web/dist")

    @app.route('/')
    def static_page():
        return render_template('index.html')

    @app.route('/update')
    def update():
        def gen():
            q = event_manager.subscribe()
            print("subscribe")

            project_manager.update_new_client(q)
            scheduler.update_new_client(q)

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
        task = project_manager.create_task(project_name, preset_uuid, total_iterations)
        scheduler.enqueue(task)
        return ""

    @app.route('/pause/<string:task_uuid>')
    def pause(task_uuid):
        scheduler.pause(task_uuid)
        return ""

    @app.route('/cancel/<string:task_uuid>')
    def cancel(task_uuid):
        removed_task = scheduler.cancel(task_uuid)
        if removed_task is not None:
            if removed_task.finished_iterations_and_update_time()[0] == 0:
                project_manager.remove_task(removed_task)
            else:
                event_manager.throw(EventType.TASK_CHANGED, removed_task)
        return ""

    @app.route('/run_now/<string:task_uuid>')
    def run_now(task_uuid):
        scheduler.run_now(task_uuid)
        return ""

    @app.route('/continue/<string:task_uuid>')
    @app.route('/continue/<string:task_uuid>/<int:total_iterations>')
    def continue_task(task_uuid, total_iterations=0):
        task = project_manager.find_task_by_uuid(task_uuid)
        if total_iterations > 0:
            task.set_total_iterations(total_iterations)

        if task is not None and task.finished_iterations_and_update_time()[0] < task.total_iterations():
            scheduler.enqueue(task)
        return ""

    @app.route('/finish/<string:task_uuid>')
    def finish(task_uuid):
        task = project_manager.find_task_by_uuid(task_uuid)
        task.finish()
        event_manager.throw(EventType.TASK_CHANGED, task)
        return ""

    @app.route('/reorder/<string:task_uuid>/<int:new_index>')
    def reorder_task(task_uuid, new_index):
        scheduler.reorder(task_uuid, new_index)
        return ""

    @app.route('/edit/<string:project_name>/<string:preset_uuid>', methods=['POST'])
    def edit_preset(project_name, preset_uuid):
        new_data = json.loads(request.form.get('data'))

        project = project_manager.project_by_name(project_name)
        configuration = project.configuration
        if preset_uuid in configuration.presets_by_uuid:
            preset = configuration.presets_by_uuid[preset_uuid]
            new_data['uuid'] = preset.uuid
            preset.set_data(new_data)
            configuration.save()
            event_manager.throw(EventType.PRESET_CHANGED, preset, project)

        return ""

    @app.route('/add/<string:project_name>', methods=['POST'])
    def add_preset(project_name):
        new_data = json.loads(request.form.get('data'))

        project = project_manager.project_by_name(project_name)

        preset = project.configuration.add_preset(new_data)

        event_manager.throw(EventType.PRESET_CHANGED, preset, project)

        return ""

    @app.route('/change/<string:task_uuid>/<int:total_iterations>')
    def change(task_uuid, total_iterations):
        scheduler.change_total_iterations(task_uuid, total_iterations)
        return ""

    @app.route('/tensorboard/<string:project_name>')
    def open_tensorboard(project_name):
        project = project_manager.project_by_name(project_name)
        project.start_tensorboard(event_manager)
        return Response(str(project.tensorboard_port), 'text/xml')

    @app.route('/log/<string:task_uuid>')
    def log(task_uuid):
        task = project_manager.find_task_by_uuid(task_uuid)
        return render_template('log.html', task_uuid=task_uuid, preset_name=task.preset.name, try_number=task.try_number, created=str(task.creation_time))

    @app.route('/read_log/<string:task_uuid>')
    def read_log(task_uuid):
        task = project_manager.find_task_by_uuid(task_uuid)
        def gen():
            log_file = open(task.build_save_dir() / "main.log", 'r')

            while not log_file.closed:
                line = log_file.readline()
                if not line:
                    time.sleep(1)
                else:
                    yield "data: " + line + "\n\n"

        return Response(gen(), mimetype="text/event-stream")

    @app.route('/change_max_running/<int:new_max_running>')
    def change_max_running(new_max_running):
        scheduler.set_max_running(new_max_running)
        return ""

    return app


def create_app():
    return run([Project(".", "TestTask"), Project("/home/domin/Dokumente/watteNN", "WatteNNTask", result_dir="task_results")], 1)