import threading
from multiprocessing import Semaphore

from EventManager import EventType
from TaskWrapper import State
from queue import Queue


class Scheduler:

    def __init__(self, event_manager):
        self.event_manager = event_manager
        self.running = None
        self.queue = Queue()
        self.running_sem = Semaphore(1)

        t = threading.Thread(target=self._schedule)
        t.start()

    def enqueue(self, task):
        self.queue.put(task)
        task.state = State.QUEUED
        self.event_manager.throw(EventType.TASK_CHANGED, task)

    def _schedule(self):
        while True:
            self.running_sem.acquire()

            if self.running is not None:
                self.running.stop()
                self.event_manager.throw(EventType.TASK_CHANGED, self.running)
                self.running = None

            self.running = self.queue.get()
            self.running.start(self.running_sem)
            self.event_manager.throw(EventType.TASK_CHANGED, self.running)

    def pause(self, task_uuid):
        if self.running is not None and str(self.running.uuid) == task_uuid:
            self.running.pause()

    def update_new_client(self, client):
        if self.running is not None:
            self.event_manager.throw_for_client(client, EventType.TASK_CHANGED, self.running)

        for task in list(self.queue.queue):
            self.event_manager.throw_for_client(client, EventType.TASK_CHANGED, task)

    def update_clients(self):
        if self.running is not None:
            self.event_manager.throw(EventType.TASK_CHANGED, self.running)