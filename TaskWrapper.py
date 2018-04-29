from multiprocessing import Process, Value
import sys
import importlib
from enum import Enum
import uuid
import datetime


class State(Enum):
    INIT = 0
    QUEUED = 1
    RUNNING = 2
    STOPPED = 3

class TaskWrapper:

    def __init__(self, task_dir, class_name, preset, project):
        self.task_dir = task_dir
        self.class_name = class_name
        self.preset = preset
        self.process = None
        self.state = State.INIT
        self.uuid = uuid.uuid4()
        self.project = project
        self._finished_iterations = Value('i', 0)
        self.start_time = None
        self.total_iterations = preset.get_int('iterations')

    def start(self, running_sem):
        sys.stdout.flush()
        self.process = Process(target=TaskWrapper._run, args=(self.task_dir, self.class_name, self.preset, running_sem, self._finished_iterations))
        self.start_time = datetime.datetime.now()
        self.process.start()
        self.state = State.RUNNING

    def stop(self):
        self.state = State.STOPPED
        if self.process is not None:
            self.process.join()

    def mean_iteration_time(self):
        if self.start_time is not None and self._finished_iterations.value > 0:
            return (datetime.datetime.now() - self.start_time).total_seconds() / self._finished_iterations.value
        else:
            return 0

    @staticmethod
    def _run(task_dir, class_name, preset, running_sem, finished_iterations):
        sys.path.append(task_dir)
        task_class = getattr(importlib.import_module(class_name), class_name)
        task = task_class()
        task.run(preset, None, finished_iterations)
        running_sem.release()