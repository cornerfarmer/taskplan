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
    project_manager = ProjectManager(projects)

    def update_clients():
        while True:
            scheduler.update_clients()

            time.sleep(3)

    t = threading.Thread(target=update_clients)
    t.start()

    app = Flask(__name__, static_folder="web")

    @app.route('/update')
    def update():
        def gen():
            q = event_manager.subscribe()
            print("subscribe")

            if scheduler.running is not None:
                q.put(ServerSentEvent(EventType.TASK_CHANGED, scheduler.running))
            for task in list(scheduler.queue.queue):
                q.put(ServerSentEvent(EventType.TASK_CHANGED, task))

            try:
                while True:
                    event = q.get()
                    yield event.encode()
            finally:
                event_manager.unsubscribe(q)
                print("unsubscribe")

        return Response(gen(), mimetype="text/event-stream")

    @app.route('/start/<string:project_name>/<string:preset_name>')
    def start(project_name, preset_name):
        task = project_manager.create_task(project_name, preset_name)
        scheduler.enqueue(task)
        return ""

    return app


def create_app():
    return run([Project(".", "TestTask")])