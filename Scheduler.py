import threading
from multiprocessing import Semaphore

import EventManager
from TaskWrapper import State
from queue import Queue


class Scheduler:

    def __init__(self, event_manager, max_running):
        self.event_manager = event_manager
        self.runnings = []
        self.queue = []
        self.queue_mutex = Semaphore(1)
        self.wakeup_sem = Semaphore(0)
        self.max_running = max_running

        t = threading.Thread(target=self._schedule)
        t.start()

    def enqueue(self, task):
        self.queue_mutex.acquire()

        self.queue.append(task)
        task.queue_index = len(self.queue) - 1
        task.state = State.QUEUED
        self.event_manager.throw(EventManager.EventType.TASK_CHANGED, task)

        self.queue_mutex.release()
        self.wakeup_sem.release()

    def _schedule(self):
        while True:
            self.wakeup_sem.acquire()
            self.queue_mutex.acquire()

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

            self.queue_mutex.release()

    def pause(self, task_uuid):
        self.queue_mutex.acquire()
        for running in self.runnings:
            if str(running.uuid) == task_uuid:
                running.pause()
        self.queue_mutex.release()

    def _update_indices(self):
        for i in range(0, len(self.queue)):
            self.queue[i].queue_index = i
            self.event_manager.throw(EventManager.EventType.TASK_CHANGED, self.queue[i])

    def reorder(self, task_uuid, new_index):
        self.queue_mutex.acquire()

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

        self.queue_mutex.release()

    def update_new_client(self, client):
        self.event_manager.throw_for_client(client, EventManager.EventType.SCHEDULER_OPTIONS, self)

    def update_clients(self):
        self.queue_mutex.acquire()
        for running in self.runnings:
            self.event_manager.throw(EventManager.EventType.TASK_CHANGED, running)
        self.queue_mutex.release()

    def change_total_iterations(self, task_uuid, total_iterations):
        self.queue_mutex.acquire()
        for task in self.runnings:
            if str(task.uuid) == task_uuid:
                task.set_total_iterations(total_iterations)
                self.event_manager.throw(EventManager.EventType.TASK_CHANGED, task)
                break
        self.queue_mutex.release()