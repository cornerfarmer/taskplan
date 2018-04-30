from flask import Flask, jsonify, Response

from EventManager import EventManager, ServerSentEvent, EventType
from Project import Project
from ProjectManager import ProjectManager
from Scheduler import Scheduler
import time
import threading

def run(projects):
    event_manager = EventManager()
    scheduler = Scheduler(event_manager)
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

            scheduler.update_new_client(q)
            project_manager.update_new_client(q)

            try:
                while True:
                    event = q.get()
                    yield event.encode()
            finally:
                event_manager.unsubscribe(q)
                print("unsubscribe")

        return Response(gen(), mimetype="text/event-stream")

    @app.route('/start/<string:project_name>/<string:preset_uuid>')
    def start(project_name, preset_uuid):
        task = project_manager.create_task(project_name, preset_uuid)
        scheduler.enqueue(task)
        return ""

    return app


def create_app():
    return run([Project(".", "TestTask")])