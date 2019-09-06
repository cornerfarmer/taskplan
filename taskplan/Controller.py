import json
import threading
import time

from pkg_resources import resource_filename
from taskconf.config.Configuration import Configuration

from taskplan.EventManager import EventType
from taskplan.ProjectManager import ProjectManager
from taskplan.Scheduler import Scheduler


class Controller:
    def __init__(self, event_manager, allow_remote=False):
        self.global_config = Controller.load_global_config()

        self.scheduler = Scheduler(event_manager, self.global_config, allow_remote)#, self.global_config.get_list("remote_devices") if allow_remote else [])
        self.project_manager = ProjectManager(event_manager)
        self.project_manager.load_projects(self.global_config)

        self.event_manager = event_manager

    @staticmethod
    def load_global_config():
        with open(resource_filename('taskplan.resources', 'default_global_config.json'), 'r') as f:
            default_data = json.load(f)
        default_config = Configuration(default_data)

        with open('taskplan.json') as f:
            data = json.load(f)
        return Configuration(data, [default_config])

    def start(self):
        self.scheduler.start(self.project_manager)
        self.run_update_thread = True
        self.update_thread = threading.Thread(target=self._update_clients)
        self.update_thread.start()

    def _update_clients(self):
        while self.run_update_thread:
            self.scheduler.update_clients(self.project_manager)
            self.project_manager.update_clients()

            time.sleep(3)

    def update_new_client(self, client):
        self.project_manager.update_new_client(client)
        self.scheduler.update_new_client(client)

    def start_new_task(self, project_name, params, config, total_iterations, is_test=False, device_uuid=None):
        task = self.project_manager.create_task(project_name, params, config, total_iterations, is_test)
        self.scheduler.enqueue(task, device_uuid)
        return task

    def pause_task(self, task_uuid):
        self.scheduler.pause(task_uuid)

    def pause_all_tasks(self):
        self.scheduler.pause_and_cancel_all()

    def terminate_task(self, task_uuid):
        self.scheduler.terminate(task_uuid)

    def save_now_task(self, task_uuid):
        self.scheduler.save_now(task_uuid)

    def cancel_task(self, task_uuid):
        removed_task = self.scheduler.cancel(task_uuid)
        if removed_task is not None:
            self.event_manager.throw(EventType.TASK_CHANGED, removed_task)

    def remove_task(self, task_uuid):
        self.project_manager.remove_task(task_uuid)

    def remove_param(self, project_name, param_uuid):
        self.project_manager.remove_param(project_name, param_uuid)

    def remove_param_value(self, project_name, param_value_uuid):
        self.project_manager.remove_param_value(project_name, param_value_uuid)

    def run_task_now(self, task_uuid):
        self.scheduler.run_now(task_uuid)

    def continue_task(self, task_uuid, total_iterations, device_uuid=None):
        task = self.project_manager.find_task_by_uuid(task_uuid)
        if total_iterations > 0:
            task.set_total_iterations(total_iterations)

        if task is not None and task.finished_iterations_and_update_time()[0] < task.total_iterations:
            self.scheduler.enqueue(task, device_uuid)
            return task
        else:
            return None

    def finish_task(self, task_uuid):
        task = self.project_manager.find_task_by_uuid(task_uuid)
        task.finish()
        self.event_manager.log("The total iterations of task \"" + str(task) + "\" has decreased to " + str(task.total_iterations) + ", so the task is now considered finished", "The task has been finished")
        self.event_manager.throw(EventType.TASK_CHANGED, task)

    def reorder_task(self, task_uuid, new_index):
        self.scheduler.reorder(task_uuid, new_index)

    def reorder_param(self, project_name, param_uuid, new_index):
        project = self.project_manager.project_by_name(project_name)
        changed_params = project.change_sorting(param_uuid, new_index)

        for param in changed_params:
            self.event_manager.throw(EventType.PARAM_CHANGED, param, project)

    def edit_param(self, project_name, param_uuid, new_data):
        project = self.project_manager.project_by_name(project_name)

        param = project.configuration.edit_param(param_uuid, new_data)

        self.event_manager.throw(EventType.PARAM_CHANGED, param, project)
        self.event_manager.log("Param \"" + param.uuid + "\" has been changed", "Param has been changed")

    def edit_param_value(self, project_name, param_uuid, param_value_uuid, new_data):
        project = self.project_manager.project_by_name(project_name)

        param, param_value = project.configuration.edit_param_value(param_uuid, param_value_uuid, new_data)

        self.event_manager.throw(EventType.PARAM_VALUE_CHANGED, param_value, project)
        self.event_manager.throw(EventType.PARAM_CHANGED, param, project)
        self.event_manager.log("Param value \"" + param_value.uuid + "\" has been added", "Param value has been added")

    def add_param(self, project_name, new_data):
        project = self.project_manager.project_by_name(project_name)

        param = project.configuration.add_param(new_data)

        self.event_manager.throw(EventType.PARAM_CHANGED, param, project)
        self.event_manager.log("Param \"" + param.uuid + "\" has been added", "Param has been added")

    def add_param_batch(self, project_name, config):
        project = self.project_manager.project_by_name(project_name)

        added_params, added_param_values = project.configuration.add_param_batch(config)

        for param in added_params:
            self.event_manager.throw(EventType.PARAM_CHANGED, param, project)
            self.event_manager.log("Param \"" + param.uuid + "\" has been added", "Param has been added")

        for param_value in added_param_values:
            self.event_manager.throw(EventType.PARAM_VALUE_CHANGED, param_value, project)
            self.event_manager.log("Param value \"" + param_value.uuid + "\" has been added", "Param value has been added")

    def add_param_value(self, project_name, param_uuid, new_data):
        project = self.project_manager.project_by_name(project_name)

        param, param_value = project.configuration.add_param_value(param_uuid, new_data)

        self.event_manager.throw(EventType.PARAM_VALUE_CHANGED, param_value, project)
        self.event_manager.throw(EventType.PARAM_CHANGED, param, project)
        self.event_manager.log("Param value \"" + param_value.uuid + "\" has been added", "Param value has been added")

    def config_param_value(self, project_name, base_uuid=None, param_value_uuid=None):
        project = self.project_manager.project_by_name(project_name)

        if base_uuid is None and param_value_uuid is None:
            return {'inherited_config': {}, "config": {}, 'dynamic': False}

        if base_uuid is not None:
            param_value_base = project.configuration.get_config(base_uuid)
            inherited_config = param_value_base.get_merged_config()
            dynamic = param_value_base.treat_dynamic()
        else:
            inherited_config = {}
            dynamic = False

        if param_value_uuid is not None:
            param_value = project.configuration.get_config(param_value_uuid)
            config = param_value.data['config']
        else:
            config = None

        return {'inherited_config': inherited_config, "config": config, 'dynamic': dynamic}

    def task_config(self, project_name, param_value_uuids):
        project = self.project_manager.project_by_name(project_name)
        param_values = [[project.configuration.get_config(uuid[0])] + uuid[1:] for uuid in param_value_uuids]

        config = Configuration({"config": {}}, param_values)

        return {'inherited_config': {}, "config": config.get_merged_config(), 'dynamic': config.treat_dynamic()}

    def existing_task_config(self, task_uuid):
        task = self.project_manager.find_task_by_uuid(task_uuid)
        return {'inherited_config': {}, 'config': task.config.get_merged_config(), 'dynamic': task.config.treat_dynamic()}
        
    def change_total_iterations(self, task_uuid, total_iterations):
        self.scheduler.change_total_iterations(task_uuid, total_iterations)

    def open_tensorboard(self, project_name):
        project = self.project_manager.project_by_name(project_name)
        self.event_manager.log("Starting tensorboard for project \"" + str(project_name) + "\"...", "Starting tensorboard...")
        project.start_tensorboard(self.event_manager)
        return project.tensorboard_port

    def change_max_running_tasks(self, new_max_running):
        self.scheduler.set_max_running(new_max_running)

    def add_code_version(self, project_name, version_name):
        if version_name != "":
            project = self.project_manager.project_by_name(project_name)
            code_version = project.add_code_version(version_name)
            self.project_manager.save_metadata()
            self.event_manager.throw(EventType.CODE_VERSION_CHANGED, code_version, project)
            self.event_manager.throw(EventType.PROJECT_CHANGED, project)
            self.select_code_version(project_name, code_version["uuid"])

    def select_code_version(self, project_name, version_uuid):
        project = self.project_manager.project_by_name(project_name)
        project.select_code_version(version_uuid)
        self.project_manager.save_metadata()
        self.event_manager.throw(EventType.PROJECT_CHANGED, project)


    def clone_task(self, task_uuid):
        task = self.project_manager.find_task_by_uuid(task_uuid)
        cloned_task = task.project.clone_task(task)
        self.event_manager.throw(EventType.TASK_CHANGED, cloned_task)

        self.event_manager.log("Task \"" + str(task) + "\" has been cloned", "Task has been cloned")

    def set_task_notes(self, task_uuid, new_notes):
        task = self.project_manager.find_task_by_uuid(task_uuid)
        task.set_notes(new_notes)
        self.event_manager.throw(EventType.TASK_CHANGED, task)

    def extract_checkpoint(self, task_uuid, checkpoint_id):
        task = self.project_manager.find_task_by_uuid(task_uuid)
        new_task = task.project.extract_checkpoint(task, checkpoint_id)
        self.event_manager.throw(EventType.TASK_CHANGED, new_task)

        self.event_manager.log("Task \"" + str(new_task) + "\" has been created based on checkpoint " + str(checkpoint_id) + "of task " + str(task), "Checkpoint has been extracted")

    def stop(self):
        self.run_update_thread = False
        self.update_thread.join()

        self.scheduler.stop()

    def connect_device(self, device_uuid):
        self.scheduler.connect_device(device_uuid, self.project_manager)

    def disconnect_device(self, device_uuid):
        self.scheduler.disconnect_device(device_uuid)

    def add_device(self, device_address):
        self.scheduler.add_device(device_address, self.project_manager)

    def create_checkpoint(self, task_uuid):
        successful = self.scheduler.create_checkpoint_now(task_uuid)
        if not successful:
            task = self.project_manager.find_task_by_uuid(task_uuid)
            task.create_checkpoint()
            self.event_manager.throw(EventType.TASK_CHANGED, task)