import threading
from multiprocessing import Semaphore
from threading import Lock

import EventManager
from TaskWrapper import State
from queue import Queue


class Scheduler:

    def __init__(self, event_manager, max_running):
        self.event_manager = event_manager
        self.runnings = []
        self.queue = []
        self._queue_mutex = Lock()
        self.wakeup_sem = Semaphore(0)
        self.max_running = max_running

        t = threading.Thread(target=self._schedule)
        t.start()

    def enqueue(self, task):
        with self._queue_mutex:
            self.queue.append(task)
            task.queue_index = len(self.queue) - 1
            task.state = State.QUEUED
            self.event_manager.throw(EventManager.EventType.TASK_CHANGED, task)

            self.wakeup_sem.release()

    def _schedule(self):
        while True:
            self.wakeup_sem.acquire()

            with self._queue_mutex:
                for running in self.runnings[:]:
                    if not running.is_running():
                        running.stop()
                        self.event_manager.throw(EventManager.EventType.TASK_CHANGED, running)
                        self.runnings.remove(running)

                if len(self.queue) > 0 and len(self.runnings) < self.max_running:
                    self.runnings.append(self.queue.pop(0))
                    self._update_indices()
                    self.runnings[-1].start(self.wakeup_sem)
                    self.event_manager.throw(EventManager.EventType.TASK_CHANGED, self.runnings[-1])

    def pause(self, task_uuid):
        with self._queue_mutex:
            for running in self.runnings:
                if str(running.uuid) == task_uuid:
                    running.pause()

    def cancel(self, task_uuid):
        removed_task = None
        with self._queue_mutex:
            for task in self.queue:
                if str(task.uuid) == task_uuid:
                    self.queue.remove(task)
                    removed_task = task
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
                    break