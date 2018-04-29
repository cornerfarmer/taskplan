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

            self.running = self.queue.get()
            self.running.start(self.running_sem)
