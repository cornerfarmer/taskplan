from multiprocessing import Process
import sys
import importlib
from enum import Enum
import uuid

class State(Enum):
    INIT = 0,
    QUEUED = 1,
    RUNNING = 2,
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

    def start(self, running_sem):
        sys.stdout.flush()
        self.process = Process(target=TaskWrapper._run, args=(self.task_dir, self.class_name, self.preset, running_sem))
        self.process.start()
        self.state = State.RUNNING

    def stop(self):
        self.state = State.STOPPED
        if self.process is not None:
            self.process.join()

    @staticmethod
    def _run(task_dir, class_name, preset, running_sem):
        sys.path.append(task_dir)
        task_class = getattr(importlib.import_module(class_name), class_name)
        task = task_class()
        task.run(preset, None)
        running_sem.release()