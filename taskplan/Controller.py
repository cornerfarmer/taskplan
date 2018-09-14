from taskconf.config.Preset import Preset

from taskplan.Project import Project
from taskplan.EventManager import EventType
from taskplan.ProjectManager import ProjectManager
from taskplan.Scheduler import Scheduler
import time
import threading
import json
from pkg_resources import resource_filename

class Controller:
    def __init__(self, event_manager):
        self.global_config = Controller.load_global_config()
        projects = Project.load_projects(self.global_config)

        self.scheduler = Scheduler(event_manager, self.global_config.get_int("max_running_tasks"))
        self.project_manager = ProjectManager(projects, event_manager)
        self.event_manager = event_manager

    @staticmethod
    def load_global_config():
        with open(resource_filename('taskplan.resources', 'default_global_config.json'), 'r') as f:
            default_config = json.load(f)
        default_preset = Preset(default_config)

        with open('taskplan.json') as f:
            config = json.load(f)
        return Preset(config, default_preset)

    def start(self):
        self.scheduler.start()
        self.run_update_thread = True
        self.update_thread = threading.Thread(target=self._update_clients)
        self.update_thread.start()

    def _update_clients(self):
        while self.run_update_thread:
            self.scheduler.update_clients()
            self.project_manager.update_clients()

            time.sleep(3)

    def update_new_client(self, client):
        self.project_manager.update_new_client(client)
        self.scheduler.update_new_client(client)

    def start_new_task(self, project_name, preset_uuid, total_iterations):
        task = self.project_manager.create_task(project_name, preset_uuid, total_iterations)
        self.scheduler.enqueue(task)
        return task

    def pause_task(self, task_uuid):
        self.scheduler.pause(task_uuid)

    def save_now_task(self, task_uuid):
        self.scheduler.save_now(task_uuid)

    def cancel_task(self, task_uuid):
        removed_task = self.scheduler.cancel(task_uuid)
        if removed_task is not None:
            if removed_task.finished_iterations_and_update_time()[0] == 0:
                self.project_manager.remove_task(removed_task)
            else:
                self.event_manager.throw(EventType.TASK_CHANGED, removed_task)

    def run_task_now(self, task_uuid):
        self.scheduler.run_now(task_uuid)

    def continue_task(self, task_uuid, total_iterations):
        task = self.project_manager.find_task_by_uuid(task_uuid)
        if total_iterations > 0:
            task.set_total_iterations(total_iterations)

        if task is not None and task.finished_iterations_and_update_time()[0] < task.total_iterations():
            self.scheduler.enqueue(task)
            return task
        else:
            return None

    def finish_task(self, task_uuid):
        task = self.project_manager.find_task_by_uuid(task_uuid)
        task.finish()
        self.event_manager.log("The total iterations of task \"" + str(task) + "\" has decreased to " + str(task.total_iterations()) + ", so the task is now considered finished", "The task has been finished")
        self.event_manager.throw(EventType.TASK_CHANGED, task)

    def reorder_task(self, task_uuid, new_index):
        self.scheduler.reorder(task_uuid, new_index)

    def edit_preset(self, project_name, preset_uuid, new_data):
        project = self.project_manager.project_by_name(project_name)
        configuration = project.configuration
        if preset_uuid in configuration.presets_by_uuid:
            preset = configuration.presets_by_uuid[preset_uuid]
            new_data['uuid'] = preset.uuid
            new_data['creation_time'] = preset.data['creation_time']
            preset.set_data(new_data)

            configuration.save()
            self.event_manager.throw(EventType.PRESET_CHANGED, preset, project)
            self.event_manager.log("Preset \"" + preset.name + "\" has been changed", "Preset has been changed")

    def add_preset(self, project_name, new_data):
        project = self.project_manager.project_by_name(project_name)

        preset = project.configuration.add_preset(new_data, project.configuration.presets[-1].file)

        self.event_manager.throw(EventType.PRESET_CHANGED, preset, project)
        self.event_manager.log("Preset \"" + preset.name + "\" has been added", "Preset has been added")

    def change_total_iterations(self, task_uuid, total_iterations):
        self.scheduler.change_total_iterations(task_uuid, total_iterations)

    def open_tensorboard(self, project_name):
        project = self.project_manager.project_by_name(project_name)
        self.event_manager.log("Starting tensorboard for project \"" + str(project_name) + "\"...", "Starting tensorboard...")
        project.start_tensorboard(self.event_manager)
        return project.tensorboard_port

    def change_max_running_tasks(self, new_max_running):
        self.scheduler.set_max_running(new_max_running)

    def add_version(self, project_name, version_name):
        project = self.project_manager.project_by_name(project_name)
        project.add_version(version_name)
        self.event_manager.throw(EventType.PROJECT_CHANGED, project)

    def adjust_task_preset(self, task_uuid, new_config):
        task = self.project_manager.find_task_by_uuid(task_uuid)
        task.adjust_config(new_config)

    def clone_task(self, task_uuid):
        task = self.project_manager.find_task_by_uuid(task_uuid)
        cloned_task = self.project_manager.clone_task(task)
        self.event_manager.throw(EventType.TASK_CHANGED, cloned_task)

        self.event_manager.log("Task \"" + str(task) + "\" has been cloned", "Task has been cloned")

    def stop(self):
        self.run_update_thread = False
        self.update_thread.join()

        self.scheduler.stop()
