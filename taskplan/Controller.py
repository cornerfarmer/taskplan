import json
import threading
import time
from pathlib import Path

from pkg_resources import resource_filename
from taskconf.config.Configuration import Configuration

from taskplan.EventManager import EventType
from taskplan.Project import Project
from taskplan.Scheduler import Scheduler
import queue

class Controller:
    def __init__(self, event_manager, allow_remote=False):
        self.call_queue = queue.Queue(maxsize=1)
        self.return_queue = queue.Queue(maxsize=1)

        if Path("taskplan_metadata.json").exists():
            with open('taskplan_metadata.json') as f:
                metadata = json.load(f)
        else:
            metadata = {"project": {}, "scheduler": {}}

        self.scheduler = Scheduler(event_manager, metadata["scheduler"], allow_remote)#, self.global_config.get_list("remote_devices") if allow_remote else [])
        self.project = Project.create_from_config_file(event_manager, metadata["project"], "taskplan.json")

        self.save_metadata()
        self.event_manager = event_manager

    def save_metadata(self):
        metadata = {}
        metadata["project"] = self.project.save_metadata()
        metadata["scheduler"] = self.scheduler.save_metadata()
        with open('taskplan_metadata.json', "w") as f:
            json.dump(metadata, f)

    def start(self):
        self.run_update_thread = True
        self.scheduler.start(self.project)
        self.update_thread = threading.Thread(target=self._update)
        self.update_thread.start()

    def _update(self):
        while self.run_update_thread:
            self.scheduler.update_clients(self.project)
            self.project.update_clients()
            self.scheduler.schedule()

            try:
                function, args, kwargs = self.call_queue.get(timeout=1)
                function = getattr(self, function)
                result = function(*args, **kwargs)
                self.return_queue.put(result)
            except queue.Empty:
                pass

    def __getattr__(self, name):
        name = "_" + name
        def method(*args, **kwargs):
            self.call_queue.put((name, args, kwargs))
            return self.return_queue.get()

        return method

    def _update_new_client(self, client):
        self.project.update_new_client(client)
        self.scheduler.update_new_client(client)

    def _start_new_task(self, params, config, total_iterations, is_test=False, device_uuid=None):
        task = self.project.create_task(params, config, total_iterations, is_test)
        self.scheduler.enqueue(task, device_uuid)
        return task

    def _pause_task(self, task_uuid):
        self.scheduler.pause(task_uuid)

    def _pause_all_tasks(self):
        self.scheduler.pause_and_cancel_all()

    def _terminate_task(self, task_uuid):
        self.scheduler.terminate(task_uuid)

    def _save_now_task(self, task_uuid):
        self.scheduler.save_now(task_uuid)

    def _cancel_task(self, task_uuid):
        removed_task = self.scheduler.cancel(task_uuid)
        if removed_task is not None:
            self.event_manager.throw(EventType.TASK_CHANGED, removed_task)

    def _remove_task(self, task_uuid):
        task = self.project.find_task_by_uuid(task_uuid)
        self.project.remove_task(task)

    def _remove_param(self, param_uuid):
        self.project.remove_param(param_uuid)

    def _remove_param_value(self, param_value_uuid):
        self.project.remove_param_value(param_value_uuid)

    def _run_task_now(self, task_uuid):
        self.scheduler.run_now(task_uuid)

    def _continue_task(self, task_uuid, total_iterations, device_uuid=None):
        task = self.project.find_task_by_uuid(task_uuid)
        if total_iterations > 0:
            task.set_total_iterations(total_iterations)

        if task is not None and task.finished_iterations_and_update_time()[0] < task.total_iterations:
            self.scheduler.enqueue(task, device_uuid)
            return task
        else:
            return None

    def _finish_task(self, task_uuid):
        task = self.project.find_task_by_uuid(task_uuid)
        task.finish()
        self.event_manager.log("The total iterations of task \"" + str(task) + "\" has decreased to " + str(task.total_iterations) + ", so the task is now considered finished", "The task has been finished")
        self.event_manager.throw(EventType.TASK_CHANGED, task)

    def _reorder_task(self, task_uuid, new_index):
        self.scheduler.reorder(task_uuid, new_index)

    def _reorder_param(self, param_uuid, new_index):
        changed_params = self.project.change_sorting(param_uuid, new_index)

        for param in changed_params:
            self.event_manager.throw(EventType.PARAM_CHANGED, param, project)

    def _edit_param(self, param_uuid, new_data):
        param = self.project.configuration.edit_param(param_uuid, new_data)

        self.event_manager.throw(EventType.PARAM_CHANGED, param, project)
        self.event_manager.log("Param \"" + param.uuid + "\" has been changed", "Param has been changed")

    def _edit_param_value(self, param_uuid, param_value_uuid, new_data):
        param, param_value = self.project.configuration.edit_param_value(param_uuid, param_value_uuid, new_data)

        self.event_manager.throw(EventType.PARAM_VALUE_CHANGED, param_value, self.project)
        self.event_manager.throw(EventType.PARAM_CHANGED, param, self.project)
        self.event_manager.log("Param value \"" + param_value.uuid + "\" has been added", "Param value has been added")

    def _add_param(self, new_data):
        param = self.project.configuration.add_param(new_data)

        self.event_manager.throw(EventType.PARAM_CHANGED, param, self.project)
        self.event_manager.log("Param \"" + param.uuid + "\" has been added", "Param has been added")

    def _add_param_batch(self, config):
        added_params, added_param_values = self.project.configuration.add_param_batch(config)

        for param in added_params:
            self.event_manager.throw(EventType.PARAM_CHANGED, param, self.project)
            self.event_manager.log("Param \"" + param.uuid + "\" has been added", "Param has been added")

        for param_value in added_param_values:
            self.event_manager.throw(EventType.PARAM_VALUE_CHANGED, param_value)
            self.event_manager.log("Param value \"" + param_value.uuid + "\" has been added", "Param value has been added")

    def _add_param_value(self, param_uuid, new_data):
        param, param_value = self.project.configuration.add_param_value(param_uuid, new_data)

        self.event_manager.throw(EventType.PARAM_VALUE_CHANGED, param_value, self.project)
        self.event_manager.throw(EventType.PARAM_CHANGED, param, self.project)
        self.event_manager.log("Param value \"" + param_value.uuid + "\" has been added", "Param value has been added")

    def _config_param_value(self, base_uuid=None, param_value_uuid=None):
        if base_uuid is None and param_value_uuid is None:
            return {'inherited_config': {}, "config": {}, 'dynamic': False}

        if base_uuid is not None:
            param_value_base = self.project.configuration.get_config(base_uuid)
            inherited_config = param_value_base.get_merged_config()
            dynamic = param_value_base.treat_dynamic()
        else:
            inherited_config = {}
            dynamic = False

        if param_value_uuid is not None:
            param_value = self.project.configuration.get_config(param_value_uuid)
            config = param_value.data['config']
        else:
            config = None

        return {'inherited_config': inherited_config, "config": config, 'dynamic': dynamic}

    def _task_config(self, param_value_uuids):
        param_values = [[self.project.configuration.get_config(uuid[0])] + uuid[1:] for uuid in param_value_uuids]

        config = Configuration({"config": {}}, param_values)

        return {'inherited_config': {}, "config": config.get_merged_config(), 'dynamic': config.treat_dynamic()}

    def _existing_task_config(self, task_uuid):
        task = self.project.find_task_by_uuid(task_uuid)
        return {'inherited_config': {}, 'config': task.config.get_merged_config(), 'dynamic': task.config.treat_dynamic()}
        
    def _change_total_iterations(self, task_uuid, total_iterations):
        self.scheduler.change_total_iterations(task_uuid, total_iterations)

    def _open_tensorboard(self):
        self.event_manager.log("Starting tensorboard...")
        self.project.start_tensorboard(self.event_manager)
        return self.project.tensorboard_port

    def _change_max_running_tasks(self, new_max_running):
        self.scheduler.set_max_running(new_max_running)

    def _add_code_version(self, version_name):
        if version_name != "":
            code_version = self.project.add_code_version(version_name)
            self.project.save_metadata()
            self.event_manager.throw(EventType.CODE_VERSION_CHANGED, code_version, self.project)
            self.event_manager.throw(EventType.PROJECT_CHANGED, self.project)
            self.select_code_version(code_version["uuid"])

    def _select_code_version(self, version_uuid):
        self.project.select_code_version(version_uuid)
        self.project.save_metadata()
        self.event_manager.throw(EventType.PROJECT_CHANGED, self.project)


    def _clone_task(self, task_uuid):
        task = self.project.find_task_by_uuid(task_uuid)
        cloned_task = self.project.clone_task(task)
        self.event_manager.throw(EventType.TASK_CHANGED, cloned_task)

        self.event_manager.log("Task \"" + str(task) + "\" has been cloned", "Task has been cloned")

    def _set_task_notes(self, task_uuid, new_notes):
        task = self.project.find_task_by_uuid(task_uuid)
        task.set_notes(new_notes)
        self.event_manager.throw(EventType.TASK_CHANGED, task)

    def _extract_checkpoint(self, task_uuid, checkpoint_id):
        task = self.project.find_task_by_uuid(task_uuid)
        new_task = self.project.extract_checkpoint(task, checkpoint_id)
        self.event_manager.throw(EventType.TASK_CHANGED, new_task)

        self.event_manager.log("Task \"" + str(new_task) + "\" has been created based on checkpoint " + str(checkpoint_id) + "of task " + str(task), "Checkpoint has been extracted")

    def stop(self):
        self.run_update_thread = False
        self.update_thread.join()

    def _connect_device(self, device_uuid):
        self.scheduler.connect_device(device_uuid, self.project)

    def _disconnect_device(self, device_uuid):
        self.scheduler.disconnect_device(device_uuid)

    def _add_device(self, device_address):
        self.scheduler.add_device(device_address, self.project)

    def _create_checkpoint(self, task_uuid):
        successful = self.scheduler.create_checkpoint_now(task_uuid)
        if not successful:
            task = self.project.find_task_by_uuid(task_uuid)
            task.create_checkpoint()
            self.event_manager.throw(EventType.TASK_CHANGED, task)

    def _reload(self):
        self.project.reload()

    def _get_task_dir(self, task_uuid):
        return self.project.find_task_by_uuid(task_uuid).build_save_dir()