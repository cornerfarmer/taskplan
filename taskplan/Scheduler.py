import logging

import taskplan.EventManager as EventManager
from taskplan.Device import LocalDevice
from taskplan.Remote import RemoteDevice
from taskplan.TaskWrapper import State
import json

class Scheduler:

    def __init__(self, event_manager, metadata, allow_remote, print_log):
        self.event_manager = event_manager
        self.devices = [LocalDevice()]
        self.print_log = print_log

        if allow_remote:
            if "remote_devices" not in metadata:
                metadata["remote_devices"] = []

            for remote_device in metadata["remote_devices"]:
                self.devices.append(RemoteDevice(remote_device.split(":")[0], int(remote_device.split(":")[1])))

    def save_metadata(self):
        return {
            "remote_devices":  [(remote_device.host + ":" + str(remote_device.port)) for remote_device in self.devices[1:]]
        }

    def start(self, project_manager):
        self.connect_all(project_manager)

    def enqueue(self, task, device_uuid=None):
        device = self.device_with_uuid(device_uuid)
        device.queue.append(task)
        task.device = device
        task.queue_index = len(device.queue) - 1
        task.state = State.QUEUED
        self.event_manager.throw(EventManager.EventType.TASK_CHANGED, task)
        self.event_manager.log("The task \"" + str(task) + "\" has been added to queue", "Task added to the queue")


    def schedule(self):
        for device in self.devices:
            if device.is_connected():
                for running in device.runnings[:]:
                    if not running.is_running():
                        running.stop()
                        self.event_manager.throw(EventManager.EventType.TASK_CHANGED, running)
                        if running.had_error:
                            self.event_manager.log("The task \"" + str(running) + "\" has been stopped due to an error after " + str(running.finished_iterations_and_update_time()[0]) + " finished iterations", "Error occurred in task", logging.ERROR)
                        elif running.finished_iterations_and_update_time()[0] < running.total_iterations:
                            self.event_manager.log("The task \"" + str(running) + "\" has been paused after " + str(running.finished_iterations_and_update_time()[0]) + " finished iterations", "Task has been paused")
                        else:
                            self.event_manager.log("The task \"" + str(running) + "\" has been finished after " + str(running.finished_iterations_and_update_time()[0]) + " finished iterations", "Task has been finished")
                        device.runnings.remove(running)

                if len(device.queue) > 0 and len(device.runnings) < 1:
                    device.runnings.append(device.queue.pop(0))
                    self._update_indices()
                    device.runnings[-1].start(self.print_log)
                    self.event_manager.throw(EventManager.EventType.TASK_CHANGED, device.runnings[-1])
                    self.event_manager.throw(EventManager.EventType.PROJECT_CHANGED, device.runnings[-1].project)
                    self.event_manager.log("The task \"" + str(device.runnings[-1]) + "\" has been started, beginning with iteration " + str(device.runnings[-1].finished_iterations_and_update_time()[0]), "Next task has been started")


    def pause(self, task_uuid):
        for device in self.devices:
            for running in device.runnings:
                if str(running.uuid) == task_uuid:
                    running.pause()
                    self.event_manager.throw(EventManager.EventType.TASK_CHANGED, running)
                    return

    def pause_and_cancel_all(self):
        for device in self.devices:
            for running in device.runnings:
                running.pause()
                self.event_manager.throw(EventManager.EventType.TASK_CHANGED, running)

        for device in self.devices:
            for task in device.queue:
                device.queue.remove(task)
                removed_task = task
                removed_task.state = State.STOPPED
                self.event_manager.log("The task \"" + str(removed_task) + "\" has been cancelled", "Task has been cancelled")
                self.event_manager.throw(EventManager.EventType.TASK_CHANGED, removed_task)

    def terminate(self, task_uuid):
        for device in self.devices:
            for running in device.runnings:
                if str(running.uuid) == task_uuid:
                    running.terminate()
                    self.event_manager.throw(EventManager.EventType.TASK_CHANGED, running)
                    return

    def save_now(self, task_uuid):
        for device in self.devices:
            for running in device.runnings:
                if str(running.uuid) == task_uuid:
                    running.save_now()
                    self.event_manager.throw(EventManager.EventType.TASK_CHANGED, running)
                    return

    def create_checkpoint_now(self, task_uuid):
        for device in self.devices:
            for running in device.runnings:
                if str(running.uuid) == task_uuid:
                    running.create_checkpoint_now()
                    self.event_manager.throw(EventManager.EventType.TASK_CHANGED, running)
                    return True
        return False

    def run_now(self, task_uuid):
        for device in self.devices:
            for task in device.queue:
                if str(task.uuid) == task_uuid:
                    self.reorder(task_uuid, 0)
                    for i in range(0, len(device.runnings)):
                        self.pause(str(device.runnings[i].uuid))
                    self.event_manager.log("The task \"" + str(task) + "\" will be started as soon as possible", "Task has been prioritized")
                    break

    def cancel(self, task_uuid):
        for device in self.devices:
            for task in device.queue:
                if str(task.uuid) == task_uuid:
                    device.queue.remove(task)
                    removed_task = task
                    removed_task.state = State.STOPPED
                    self.event_manager.log("The task \"" + str(removed_task) + "\" has been cancelled", "Task has been cancelled")
                    return removed_task
        return None

    def _update_indices(self):
        for device in self.devices:
            for i in range(0, len(device.queue)):
                device.queue[i].queue_index = i
                self.event_manager.throw(EventManager.EventType.TASK_CHANGED, device.queue[i])

    def reorder(self, task_uuid, new_index):
        task_to_reorder = None
        for device in self.devices:
            for index, task in enumerate(device.queue):
                if str(task.uuid) == task_uuid:
                    task_to_reorder = task
                    break

        if task_to_reorder is not None:
            new_index = max(0, min(len(task_to_reorder.device.queue) - 1, new_index))
            task_to_reorder.device.queue.remove(task_to_reorder)
            task_to_reorder.device.queue.insert(new_index, task_to_reorder)

            self._update_indices()

    def update_new_client(self, client):
        self.event_manager.throw_for_client(client, EventManager.EventType.SCHEDULER_OPTIONS, self)


    def update_clients(self, project_manager):
        device_changed = False
        for device in self.devices:
            if type(device) == RemoteDevice:
                if device.is_connected():
                    if device.check_connection():
                        self._on_device_disconnect(device)
                        device_changed = True

        if device_changed:
            self.event_manager.throw(EventManager.EventType.SCHEDULER_OPTIONS, self)

        for device in self.devices:
            for running in device.runnings:
                running.receive_updates()
                self.event_manager.throw(EventManager.EventType.TASK_CHANGED, running)

    def change_total_iterations(self, task_uuid, total_iterations):
        for device in self.devices:
            for task in device.runnings:
                if str(task.uuid) == task_uuid:
                    task.set_total_iterations(total_iterations)
                    self.event_manager.throw(EventManager.EventType.TASK_CHANGED, task)
                    return

            for task in device.queue:
                if str(task.uuid) == task_uuid:
                    task.set_total_iterations(total_iterations)
                    self.event_manager.throw(EventManager.EventType.TASK_CHANGED, task)
                    return

    def device_with_uuid(self, device_uuid):
        if device_uuid is None:
            return self.devices[0]

        for device in self.devices:
            if device_uuid == str(device.uuid):
                return device
        raise Exception("Device not found with uuid " + device_uuid)

    def _on_device_connect(self, device, project_manager):
        current_task, start_time = device.current_task()

        if current_task is not None:
            running_task = project_manager.find_task_by_uuid(current_task)
            device.runnings = [running_task]
            running_task.set_as_running(device, start_time)
            self.event_manager.throw(EventManager.EventType.TASK_CHANGED, running_task)

    def _on_device_disconnect(self, device):
        for running_task in device.runnings:
            running_task.set_as_stopped()
            self.event_manager.throw(EventManager.EventType.TASK_CHANGED, running_task)
            device.runnings = []

    def connect_device(self, device_uuid, project_manager):
        device = self.device_with_uuid(device_uuid)
        if type(device) == RemoteDevice and not device.is_connected():
            device.connect()
            if device.is_connected():
                self._on_device_connect(device, project_manager)
                self.event_manager.throw(EventManager.EventType.SCHEDULER_OPTIONS, self)

    def disconnect_device(self, device_uuid):
        device = self.device_with_uuid(device_uuid)
        if type(device) == RemoteDevice and device.is_connected():
            device.disconnect()
            self._on_device_disconnect(device)
            self.event_manager.throw(EventManager.EventType.SCHEDULER_OPTIONS, self)

    def add_device(self, device_address, project_manager):
        self.devices.append(RemoteDevice(device_address.split(":")[0], int(device_address.split(":")[1])))
        self.event_manager.throw(EventManager.EventType.SCHEDULER_OPTIONS, self)
        self.connect_device(str(self.devices[-1].uuid), project_manager)
        self._save_metadata()

    def connect_all(self, project_manager):
        device_changed = False
        for device in self.devices:
            if type(device) == RemoteDevice:
                if not device.is_connected():
                    if device.connect():
                        self._on_device_connect(device, project_manager)
                        device_changed = True

        if device_changed:
            self.event_manager.throw(EventManager.EventType.SCHEDULER_OPTIONS, self)