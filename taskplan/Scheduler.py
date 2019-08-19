import threading
from multiprocessing import Semaphore
from threading import RLock

import taskplan.EventManager as EventManager
from taskplan.Device import LocalDevice
from taskplan.Remote import RemoteDevice
from taskplan.TaskWrapper import State
import logging

class Scheduler:

    def __init__(self, event_manager, max_running, remote_devices):
        self.event_manager = event_manager
        self._queue_mutex = RLock()
        self.wakeup_sem = Semaphore(0)
        self._max_running = max_running
        self.devices = [LocalDevice()]
        for remote_device in remote_devices:
            self.devices.append(RemoteDevice(remote_device.split(":")[0], int(remote_device.split(":")[1])))

    def start(self):
        self.run_scheduler = True
        self.thread = threading.Thread(target=self._schedule)
        self.thread.start()

    def enqueue(self, task, device_uuid=None):
        with self._queue_mutex:
            device = self.device_with_uuid(device_uuid)
            device.queue.append(task)
            task.device = device
            task.queue_index = len(device.queue) - 1
            task.state = State.QUEUED
            self.event_manager.throw(EventManager.EventType.TASK_CHANGED, task)
            self.event_manager.log("The task \"" + str(task) + "\" has been added to queue", "Task added to the queue")

            self.wakeup_sem.release()

    def _schedule(self):
        while self.run_scheduler:
            try:
                self.wakeup_sem.acquire()

                with self._queue_mutex:
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

                            if len(device.queue) > 0 and len(device.runnings) < self._max_running:
                                device.runnings.append(device.queue.pop(0))
                                self._update_indices()
                                device.runnings[-1].start()
                                self.event_manager.throw(EventManager.EventType.TASK_CHANGED, device.runnings[-1])
                                self.event_manager.log("The task \"" + str(device.runnings[-1]) + "\" has been started, beginning with iteration " + str(device.runnings[-1].finished_iterations_and_update_time()[0]), "Next task has been started")
            except KeyboardInterrupt:
                print("schedule exit")

    def pause(self, task_uuid):
        with self._queue_mutex:
            for device in self.devices:
                for running in device.runnings:
                    if str(running.uuid) == task_uuid:
                        running.pause()
                        self.event_manager.throw(EventManager.EventType.TASK_CHANGED, running)
                        return

    def pause_and_cancel_all(self):
        with self._queue_mutex:
            for device in self.devices:
                for running in device.runnings:
                    running.pause()
                    self.event_manager.throw(EventManager.EventType.TASK_CHANGED, running)

        with self._queue_mutex:
            for device in self.devices:
                for task in device.queue:
                    device.queue.remove(task)
                    removed_task = task
                    removed_task.state = State.STOPPED
                    self.event_manager.log("The task \"" + str(removed_task) + "\" has been cancelled", "Task has been cancelled")
                    self.event_manager.throw(EventManager.EventType.TASK_CHANGED, removed_task)

    def terminate(self, task_uuid):
        with self._queue_mutex:
            for device in self.devices:
                for running in device.runnings:
                    if str(running.uuid) == task_uuid:
                        running.terminate()
                        self.event_manager.throw(EventManager.EventType.TASK_CHANGED, running)
                        return

    def save_now(self, task_uuid):
        with self._queue_mutex:
            for device in self.devices:
                for running in device.runnings:
                    if str(running.uuid) == task_uuid:
                        running.save_now()
                        self.event_manager.throw(EventManager.EventType.TASK_CHANGED, running)
                        return

    def run_now(self, task_uuid):
        with self._queue_mutex:
            for device in self.devices:
                for task in device.queue:
                    if str(task.uuid) == task_uuid:
                        self.reorder(task_uuid, 0)
                        for i in range(self._max_running - 1, len(device.runnings)):
                            self.pause(str(device.runnings[i].uuid))
                        self.event_manager.log("The task \"" + str(task) + "\" will be started as soon as possible", "Preset has been prioritized")
                        break

    def cancel(self, task_uuid):
        with self._queue_mutex:
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
        with self._queue_mutex:
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

    def update_clients(self):
        with self._queue_mutex:
            for device in self.devices:
                for running in device.runnings:
                    running.receive_updates()
                    self.event_manager.throw(EventManager.EventType.TASK_CHANGED, running)
                    if not running.is_running():
                        self.wakeup_sem.release()

    def change_total_iterations(self, task_uuid, total_iterations):
        with self._queue_mutex:
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

    def set_max_running(self, max_running):
        with self._queue_mutex:
            prev_max_running = self._max_running
            self._max_running = max_running
        self.event_manager.log("The maximal running tasks has been changed to " + str(max_running), "The maximal running tasks has been changed")
        self.event_manager.throw(EventManager.EventType.SCHEDULER_OPTIONS, self)
        for i in range(max_running - prev_max_running):
            self.wakeup_sem.release()

    def max_running(self):
        return self._max_running

    def stop(self):
        self.run_scheduler = False
        self.wakeup_sem.release()
        self.thread.join()

    def device_with_uuid(self, device_uuid):
        if device_uuid is None:
            return self.devices[0]

        for device in self.devices:
            if device_uuid == str(device.uuid):
                return device
        raise Exception("Device not found with uuid " + device_uuid)

    def connect_device(self, device_uuid, project_manager):
        device = self.device_with_uuid(device_uuid)
        if type(device) == RemoteDevice:
            device.connect()
            current_task, start_time = device.current_task()

            if current_task is not None:
                with self._queue_mutex:
                    running_task = project_manager.find_task_by_uuid(current_task)
                    device.runnings = [running_task]
                    running_task.set_as_running(device, start_time)
                    self.event_manager.throw(EventManager.EventType.TASK_CHANGED, running_task)

            self.event_manager.throw(EventManager.EventType.SCHEDULER_OPTIONS, self)
            self.wakeup_sem.release()