import os
import threading
from pathlib import Path

import EventManager
from TaskWrapper import TaskWrapper, State
from config.Configuration import Configuration
import subprocess
import time

class Project:

    def __init__(self, task_dir, task_class_name, result_dir="results", config_dir="config"):
        self.task_dir = Path(task_dir)
        self.task_class_name = task_class_name
        self.configuration = Configuration(config_dir)
        self.configuration.save()
        self.name = task_class_name
        self.result_dir = Path(result_dir)
        self.result_dir.mkdir(exist_ok=True, parents=True)
        self.tasks = []
        self.tensorboard_port = None
        self._load_saved_tasks()

    def _load_saved_tasks(self):
        for path in self.result_dir.iterdir():
            if path.is_dir():
                self.tasks.append(TaskWrapper(self.task_dir, self.task_class_name, None, self, 0, 0))
                self.tasks[-1].load_metadata(path)
                self.tasks[-1].state = State.STOPPED

    def create_task(self, preset_uuid, total_iterations):
        if preset_uuid in self.configuration.presets_by_uuid:
            preset = self.configuration.presets_by_uuid[preset_uuid]
        else:
            raise LookupError("No preset with uuid " + preset_uuid)

        task = TaskWrapper(self.task_dir, self.task_class_name, preset, self, total_iterations, self.maximal_try_of_preset(preset) + 1)
        task.save_metadata()
        self.tasks.append(task)

        return task

    def maximal_try_of_preset(self, preset):
        maximal_try = -1
        for task in self.tasks:
            if task.preset == preset:
                maximal_try = max(maximal_try, task.try_number)
        return maximal_try

    def possible_presets(self):
        return [preset for preset in self.configuration.presets if not preset.abstract]

    def find_task_by_uuid(self, uuid):
        for task in self.tasks:
            if str(task.uuid) == uuid:
                return task
        return None

    def start_tensorboard(self, event_manager):
        if self.tensorboard_port is None:
            port = self.tensorboard_port
            t = threading.Thread(target=self._run_tensorboard)
            t.start()

            while port != self.tensorboard_port:
                port = self.tensorboard_port
                time.sleep(2)

            event_manager.throw(EventManager.EventType.PROJECT_CHANGED, self)

    def _run_tensorboard(self):
        self.tensorboard_port = 6006
        while True:
            process = subprocess.Popen(["tensorboard", "--logdir", str(self.result_dir), "--port", str(self.tensorboard_port)], stdout=subprocess.PIPE)
            output, error = process.communicate()

            if output.startswith(b'TensorBoard attempted to bind to port'):
                self.tensorboard_port += 1
            else:
                self.tensorboard_port = -1
                break

