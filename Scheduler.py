import threading
from multiprocessing import Semaphore
from threading import RLock

import TaskPlan.EventManager as EventManager
from TaskPlan.TaskWrapper import State
from queue import Queue
import logging

class Scheduler:

    def __init__(self, event_manager, max_running):
        self.event_manager = event_manager
        self.runnings = []
        self.queue = []
        self._queue_mutex = RLock()
        self.wakeup_sem = Semaphore(0)
        self._max_running = max_running

        t = threading.Thread(target=self._schedule)
        t.start()

    def enqueue(self, task):
        with self._queue_mutex:
            self.queue.append(task)
            task.queue_index = len(self.queue) - 1
            task.state = State.QUEUED
            self.event_manager.throw(EventManager.EventType.TASK_CHANGED, task)
            self.event_manager.log("The task \"" + str(task) + "\" has been added to queue", "Task added to the queue")

            self.wakeup_sem.release()

    def _schedule(self):
        while True:
            self.wakeup_sem.acquire()

            with self._queue_mutex:
                for running in self.runnings[:]:
                    if not running.is_running():
                        running.stop()
                        self.event_manager.throw(EventManager.EventType.TASK_CHANGED, running)
                        if running.had_error():
                            self.event_manager.log("The task \"" + str(running) + "\" has been stopped due to an error after " + str(running.finished_iterations_and_update_time()[0]) + " finished iterations", "Error occurred in task", logging.ERROR)
                        elif running.finished_iterations_and_update_time()[0] < running.total_iterations():
                            self.event_manager.log("The task \"" + str(running) + "\" has been paused after " + str(running.finished_iterations_and_update_time()[0]) + " finished iterations", "Task has been paused")
                        else:
                            self.event_manager.log("The task \"" + str(running) + "\" has been finished after " + str(running.finished_iterations_and_update_time()[0]) + " finished iterations", "Task has been finished")
                        self.runnings.remove(running)

                if len(self.queue) > 0 and len(self.runnings) < self._max_running:
                    self.runnings.append(self.queue.pop(0))
                    self._update_indices()
                    self.runnings[-1].start(self.wakeup_sem)
                    self.event_manager.throw(EventManager.EventType.TASK_CHANGED, self.runnings[-1])
                    self.event_manager.log("The task \"" + str(self.runnings[-1]) + "\" has been started, beginning with iteration " + str(self.runnings[-1].finished_iterations_and_update_time()[0]), "Next task has been started")

    def pause(self, task_uuid):
        with self._queue_mutex:
            for running in self.runnings:
                if str(running.uuid) == task_uuid:
                    running.pause()

    def run_now(self, task_uuid):
        with self._queue_mutex:
            for task in self.queue:
                if str(task.uuid) == task_uuid:
                    self.reorder(task_uuid, 0)
                    for i in range(self._max_running - 1, len(self.runnings)):
                        self.pause(str(self.runnings[i].uuid))
                    self.event_manager.log("The task \"" + str(task) + "\" will be started as soon as possible", "Preset has been prioritized")
                    break

    def cancel(self, task_uuid):
        removed_task = None
        with self._queue_mutex:
            for task in self.queue:
                if str(task.uuid) == task_uuid:
                    self.queue.remove(task)
                    removed_task = task
                    removed_task.state = State.STOPPED
                    self.event_manager.log("The task \"" + str(removed_task) + "\" has been cancelled", "Task has been cancelled")
                    break
            return removed_task

    def _update_indices(self):
        for i in range(0, len(self.queue)):
            self.queue[i].queue_index = i
            self.event_manager.throw(EventManager.EventType.TASK_CHANGED, self.queue[i])

    def reorder(self, task_uuid, new_index):
        with self._queue_mutex:
            task_to_reorder = None
            for index, task in enumerate(self.queue):
                if str(task.uuid) == task_uuid:
                    task_to_reorder = task
                    break

            if task_to_reorder is not None:
                new_index = max(0, min(len(self.queue) - 1, new_index))
                self.queue.remove(task_to_reorder)
                self.queue.insert(new_index, task_to_reorder)

                self._update_indices()

    def update_new_client(self, client):
        self.event_manager.throw_for_client(client, EventManager.EventType.SCHEDULER_OPTIONS, self)

    def update_clients(self):
        with self._queue_mutex:
            for running in self.runnings:
                self.event_manager.throw(EventManager.EventType.TASK_CHANGED, running)

    def change_total_iterations(self, task_uuid, total_iterations):
        with self._queue_mutex:
            for task in self.runnings:
                if str(task.uuid) == task_uuid:
                    task.set_total_iterations(total_iterations)
                    self.event_manager.throw(EventManager.EventType.TASK_CHANGED, task)
                    return

            for task in self.queue:
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
