import copy
import os
import pickle
import threading
from datetime import datetime

from taskplan.View import View

try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path

from taskplan.EventManager import EventType
from taskplan.TaskWrapper import TaskWrapper, State
from taskplan.ProjectConfiguration import ProjectConfiguration
import subprocess
import time
import json
import shutil

class Project:

    def __init__(self, task_dir, task_class_name, name="", tasks_dir="tasks", config_dir="config", config_file_name="taskplan", use_project_subfolder=False, test_dir="tests", view_dir="results"):
        self.task_dir = Path(task_dir).resolve()
        self.task_class_name = task_class_name
        self.config_file_name = config_file_name
        self.name = task_class_name if name is "" else name

        if use_project_subfolder:
            tasks_dir += "/" + self.name
            config_dir += "/" + self.name
            view_dir += "/" + self.name


        self.config_dir = self.task_dir / Path(config_dir)
        if not self.config_dir.exists() or len(list(self.config_dir.iterdir())) == 0:
            self.config_dir.mkdir(exist_ok=True, parents=True)
            #with open(str(self.config_dir / Path(self.config_file_name + ".json")), 'w') as handle:
            #    handle.write('[{"config": {"save_interval": 0, "checkpoint_interval": 0},"abstract": true,"name": "Default"}]')

        self.configuration = ProjectConfiguration(self.config_dir)
        self.tasks_dir = self.task_dir / Path(tasks_dir)
        self.tasks_dir.mkdir(exist_ok=True, parents=True)
        self.test_dir = self.task_dir / Path(test_dir)
        self.test_dir.mkdir(exist_ok=True, parents=True)
        self.view_dir = self.task_dir / view_dir
        self.view_dir.mkdir(exist_ok=True, parents=True)
        self.tasks = []
        self.tensorboard_port = None
        self.view = View(self.configuration, self.view_dir)
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
        for task in self.tasks_dir.iterdir():
            if task.is_dir():
                self._load_saved_task(task)

        self.view.initialize(self.tasks)
        for path in self.test_dir.iterdir():
            self._load_saved_task(path, is_test=True)

    def _load_saved_task(self, path, is_test=False):
        try:
            task = TaskWrapper(self.task_dir, self.task_class_name, None, self, 0, None, is_test=is_test, tasks_dir=self.tasks_dir)
            task.load_metadata(path)
            task.state = State.STOPPED
            self.tasks.append(task)
        except:
            raise

    def create_task(self, choices, config, total_iterations, is_test=False):
        presets = self.configuration.get_presets()

        base_presets = []
        for preset in presets:
            if str(preset.uuid) not in choices:
                raise LookupError("No choice for the preset with uuid " + str(preset.uuid))
            choice = self.configuration.get_preset(choices[str(preset.uuid)])
            if choice.get_metadata("preset") != str(preset.uuid):
                raise LookupError("Choice " + choices[preset] + " with wrong preset")

            base_presets.append(choices[str(preset.uuid)])

        task_preset = self.configuration.add_task(base_presets, config)
        return self._create_task_from_preset(task_preset, total_iterations, is_test)

    def _create_task_from_preset(self, task_preset, total_iterations, is_test=False):
        if is_test:
            tasks_dir = self.test_dir
        else:
            tasks_dir = self.tasks_dir

        task = TaskWrapper(self.task_dir, self.task_class_name, task_preset, self, total_iterations, self.versions[-1], tasks_dir=tasks_dir, is_test=is_test)
        task.save_metadata()
        self.tasks.append(task)

        self.view.add_task(task)

        return task

    def maximal_try_of_preset(self, preset):
        maximal_try = -1
        for task in self.tasks:
            if not task.is_test and task.original_preset_uuid == preset.uuid and task.code_version == self.versions[-1]:
                maximal_try = max(maximal_try, task.try_number)
        return maximal_try

    def possible_presets(self):
        return [preset for preset in self.configuration.presets if not preset.abstract]

    def find_task_by_uuid(self, uuid):
        for task in self.tasks:
            if str(task.uuid) == uuid:
                return task
        return None

    def find_test_task_by_preset(self, preset_uuid):
        for task in self.tasks:
            if task.is_test and task.original_preset_uuid == preset_uuid:
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
            process = subprocess.Popen(["tensorboard", "--logdir", str(self.tasks_dir), "--port", str(self.tensorboard_port)], stdout=subprocess.PIPE)
            output, error = process.communicate()

            if output.startswith(b'TensorBoard attempted to bind to port'):
                self.tensorboard_port += 1
            else:
                self.tensorboard_port = -1
                break

    def remove_task(self, task):
        if task in self.tasks:
            self.view.remove_task(task)
            self.tasks.remove(task)
            task.remove_data()

    def add_version(self, new_version):
        self.versions.append(new_version)
        self._save_metadata()

    @staticmethod
    def load_projects(global_config):
        project_names = global_config.get_keys('projects')
        projects = []
        for project_name in project_names:
            if project_name != "default":
                config_prefix = "projects/" + project_name + "/"
                fallback_prefix = "projects/default/"
                projects.append(Project(
                    global_config.get_string(config_prefix + "task_dir", fallback_prefix + "task_dir"),
                    global_config.get_string(config_prefix + "task_class_name", fallback_prefix + "task_class_name"),
                    global_config.get_string(config_prefix + "name", fallback_prefix + "name"),
                    global_config.get_string(config_prefix + "tasks_dir", fallback_prefix + "tasks_dir"),
                    global_config.get_string(config_prefix + "config_dir", fallback_prefix + "config_dir"),
                    global_config.get_string(config_prefix + "config_file_name", fallback_prefix + "config_file_name"),
                    global_config.get_bool(config_prefix + "use_project_subfolder", fallback_prefix + "use_project_subfolder")
                ))

        return projects

    def clone_task(self, task):
        if task in self.tasks:
            task_preset = self.configuration.add_task([preset.uuid for preset in task.preset.base_presets], task.preset.data["config"])

            cloned_task = self._create_task_from_preset(task_preset, task.total_iterations)
            new_uuid = cloned_task.uuid

            shutil.rmtree(str(cloned_task.build_save_dir()))
            shutil.copytree(str(task.build_save_dir()), str(cloned_task.build_save_dir()))

            cloned_task.load_metadata(cloned_task.build_save_dir())

            cloned_task.state = State.STOPPED
            cloned_task.uuid = new_uuid
            cloned_task.creation_time = datetime.now()
            cloned_task.save_metadata()


            return cloned_task
