import pickle
from multiprocessing import Process, Value
import sys
import importlib
from enum import Enum
import uuid
import datetime
from pathlib import Path


class State(Enum):
    INIT = 0
    QUEUED = 1
    RUNNING = 2
    STOPPED = 3

class TaskWrapper:

    def __init__(self, task_dir, class_name, preset, project, total_iterations):
        self.task_dir = task_dir
        self.class_name = class_name
        self.preset = preset
        self.process = None
        self.state = State.INIT
        self.uuid = uuid.uuid4()
        self.project = project
        self._finished_iterations = Value('i', 0)
        self.start_time = None
        self.total_iterations = total_iterations

    def start(self, running_sem):
        sys.stdout.flush()
        self.process = Process(target=TaskWrapper._run, args=(self.task_dir, self.class_name, self.preset, running_sem, self._finished_iterations, self.total_iterations))
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
    def _run(task_dir, class_name, preset, running_sem, finished_iterations, total_iterations):
        sys.path.append(str(task_dir))
        task_class = getattr(importlib.import_module(class_name), class_name)
        task = task_class()
        task.run(preset, None, finished_iterations, total_iterations)
        running_sem.release()

    def save_metadata(self):
        data = {}
        data['uuid'] = str(self.uuid)
        data['preset_uuid'] = str(self.preset.uuid)
        data['finished_iterations'] = self._finished_iterations.value
        data['total_iterations'] = self.total_iterations
        path = self.project.result_dir / Path(self.preset.name)
        path.mkdir(parents=True, exist_ok=True)
        with open(path / Path("metadata.pk"), 'wb') as handle:
            pickle.dump(data, handle)

    def load_metadata(self, path):
        with open(path / Path("metadata.pk"), 'rb') as handle:
            data = pickle.load(handle)
            self.uuid = uuid.UUID(data['uuid'])
            self.preset = self.project.configuration.presets_by_uuid[data['preset_uuid']]
            self._finished_iterations.value = data['finished_iterations']
            self.total_iterations = data['total_iterations']

