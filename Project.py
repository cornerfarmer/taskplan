import copy
import os
import pickle
import threading
from pathlib import Path

from TaskPlan.EventManager import EventType
from TaskPlan.TaskWrapper import TaskWrapper, State
from TaskConf.config.Configuration import Configuration
import subprocess
import time

class Project:

    def __init__(self, task_dir, task_class_name, name="", result_dir="results", config_dir="config"):
        self.task_dir = Path(task_dir).resolve()
        self.task_class_name = task_class_name
        self.configuration = Configuration(str(self.task_dir / Path(config_dir)))
        self.configuration.save()
        self.name = task_class_name if name is "" else name
        self.result_dir = self.task_dir / Path(result_dir)
        self.result_dir.mkdir(exist_ok=True, parents=True)
        self.tasks = []
        self.tensorboard_port = None
        self._load_saved_tasks()
        self.versions = ["initial"]
        self._load_metadata()

    def _save_metadata(self):
        data = {}
        data['versions'] = self.versions
        with open(str(self.task_dir / Path("metadata.pk")), 'wb') as handle:
            pickle.dump(data, handle)

    def _load_metadata(self):
        if (self.task_dir / Path("metadata.pk")).exists():
            with open(str(self.task_dir / Path("metadata.pk")), 'rb') as handle:
                data = pickle.load(handle)
                self.versions = data['versions']

    def _load_saved_tasks(self):
        for checkpoint in self.result_dir.iterdir():
            for task in checkpoint.iterdir():
                for path in task.iterdir():
                    if path.is_dir():
                        try:
                            task = TaskWrapper(self.task_dir, self.task_class_name, None, None, self, 0, 0, None)
                            task.load_metadata(path)
                            task.state = State.STOPPED
                            self.tasks.append(task)
                        except:
                            pass

    def create_task(self, preset_uuid, total_iterations):
        if preset_uuid in self.configuration.presets_by_uuid:
            preset = self.configuration.presets_by_uuid[preset_uuid]
        else:
            raise LookupError("No preset with uuid " + preset_uuid)

        preset_data = copy.deepcopy(preset.data)
        preset_data['uuid'] = None
        preset_data['config'] = preset.compose_config()
        del preset_data['base']
        task_preset = self.configuration.add_preset(preset_data, None)
        task = TaskWrapper(self.task_dir, self.task_class_name, task_preset, preset.uuid, self, total_iterations, self.maximal_try_of_preset(preset) + 1, self.versions[-1])
        task.save_metadata()
        self.tasks.append(task)

        return task

    def maximal_try_of_preset(self, preset):
        maximal_try = -1
        for task in self.tasks:
            if task.original_preset_uuid == preset.uuid and task.code_version == self.versions[-1]:
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
                time.sleep(5)

            event_manager.throw(EventType.PROJECT_CHANGED, self)

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

    def remove_task(self, task):
        if task in self.tasks:
            self.tasks.remove(task)
            task.remove_data()

    def add_version(self, new_version):
        self.versions.append(new_version)
        self._save_metadata()
