from flask import Flask, jsonify, Response

from EventManager import EventManager, ServerSentEvent, EventType
from Project import Project
from ProjectManager import ProjectManager
from Scheduler import Scheduler
import time
import threading
from flask import request
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

    app = Flask(__name__, static_folder="web")

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

    @app.route('/continue/<string:task_uuid>')
    def continue_task(task_uuid, extra_iterations=0):
        task = project_manager.find_task_by_uuid(task_uuid)
        if task is not None and task.finished_iterations_and_update_time()[0] < task.total_iterations + extra_iterations:
            task.total_iterations += extra_iterations
            scheduler.enqueue(task)
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

    return app


def create_app():
    return run([Project(".", "TestTask")], 1)