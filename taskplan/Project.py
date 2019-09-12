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
import shutil
import uuid

class Project:

    def __init__(self, metadata, key, task_dir, task_class_name, name="", tasks_dir="tasks", config_dir="config", config_file_name="taskplan", use_project_subfolder=False, test_dir="tests", view_dir="results"):
        self.task_dir = Path(task_dir).resolve()
        self.key = key
        self.task_class_name = task_class_name
        self.config_file_name = config_file_name
        self.name = task_class_name if name is "" else name

        if use_project_subfolder:
            tasks_dir += "/" + self.name
            config_dir += "/" + self.name
            view_dir += "/" + self.name
            test_dir += "/" + self.name


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

        self.code_versions = []
        self.current_code_version = None

        self.view = View(self.configuration, self.view_dir)

        self.add_code_version("initial")
        self.load_metadata(metadata)

        self._load_saved_tasks()

    def save_metadata(self):
        return {
            'code_versions': self.code_versions,
            "current_code_version": self.current_code_version
        }

    def load_metadata(self, metadata):
        if metadata is not None:
            self.code_versions = metadata['code_versions']
            self.current_code_version = metadata['current_code_version']
            self.view.update_code_versions(self.code_versions)

    def _load_saved_tasks(self):
        for task in self.tasks_dir.iterdir():
            if task.is_dir():
                self._load_saved_task(task)

        self.view.initialize(self.tasks)
        if self.test_dir.exists() and len(list(self.test_dir.iterdir())) > 0:
            self._load_saved_task(self.test_dir, is_test=True)

    def _load_saved_task(self, path, is_test=False):
        try:
            task = TaskWrapper(self.task_dir, self.task_class_name, None, self, 0, None, is_test=is_test, tasks_dir=self.test_dir if is_test else self.tasks_dir)
            task.load_metadata(path)
        except:
            print("Warning: Could not load task: " + str(path))
            return

        task.state = State.STOPPED
        self.tasks.append(task)
        self.configuration.register_task(task)

    def create_task(self, param_values, config, total_iterations, is_test=False):
        params = self.configuration.get_params()

        base_uuids = []
        for param in params:
            if self.configuration.has_param_values(str(param.uuid)):
                if str(param.uuid) not in param_values:
                    raise LookupError("No param value for the param with uuid " + str(param.uuid))
                param_value = self.configuration.get_config(param_values[str(param.uuid)][0])
                if param_value.get_metadata("param") != str(param.uuid):
                    raise LookupError("Param value " + param_values[param] + " with wrong param")

                base_uuids.append([param_values[str(param.uuid)][0]] + param_values[str(param.uuid)][1:])

        task_config = self.configuration.add_task(base_uuids, config)
        return self._create_task_from_config(task_config, total_iterations, is_test)

    def _create_task_from_config(self, task_config, total_iterations, is_test=False):
        if is_test:
            tasks_dir = self.test_dir
        else:
            tasks_dir = self.tasks_dir

        removed_tasks = []
        if is_test:
            for task in self.tasks:
                if task.is_test:
                    if task.state in [State.RUNNING, State.QUEUED]:
                        raise Exception("A test is already running")
                    self.remove_task(task)
                    removed_tasks.append(task)
                    break

        task = TaskWrapper(self.task_dir, self.task_class_name, task_config, self, total_iterations, self.current_code_version, tasks_dir=tasks_dir, is_test=is_test)
        task.save_metadata()
        self.tasks.append(task)
        self.configuration.register_task(task)

        if not is_test:
            self.view.add_task(task)
        return task, removed_tasks

    def find_task_by_uuid(self, uuid):
        for task in self.tasks:
            if str(task.uuid) == uuid:
                return task
        return None

    def find_test_task_by_config(self, config_uuid):
        for task in self.tasks:
            if task.is_test and task.original_config_uuid == config_uuid:
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
            process = subprocess.Popen(["tensorboard", "--logdir", str(self.view_dir), "--port", str(self.tensorboard_port)], stdout=subprocess.PIPE)
            output, error = process.communicate()

            if output.startswith(b'TensorBoard attempted to bind to port'):
                self.tensorboard_port += 1
            else:
                self.tensorboard_port = -1
                break

    def remove_task(self, task):
        if task in self.tasks:
            if not task.is_test:
                self.view.remove_task(task)
            self.tasks.remove(task)
            self.configuration.deregister_task(task)
            task.remove_data()

    def remove_param(self, param_uuid):
        return self.configuration.remove_param(param_uuid)

    def remove_param_value(self, param_value_uuid):
        return self.configuration.remove_param_value(param_value_uuid)

    def add_code_version(self, name):
        code_version_uuid = str(uuid.uuid4())
        self.code_versions.append({
            "name": name,
            "uuid": code_version_uuid,
            "base": self.current_code_version,
            "time": time.mktime(datetime.now().timetuple())
        })
        if self.current_code_version is None:
            self.current_code_version = code_version_uuid

        self.view.update_code_versions(self.code_versions)

        return self.code_versions[-1]

    def select_code_version(self, code_version_uuid):
        for code_version in self.code_versions:
            if code_version["uuid"] == code_version_uuid:
                self.current_code_version = code_version_uuid
                break

    def clone_task(self, task):
        if task in self.tasks and not task.is_test:
            task_config = self.configuration.add_task([], {})

            cloned_task, _ = self._create_task_from_config(task_config, task.total_iterations)
            new_uuid = cloned_task.uuid

            shutil.rmtree(str(cloned_task.build_save_dir()))
            shutil.copytree(str(task.build_save_dir()), str(cloned_task.build_save_dir()))

            cloned_task.load_metadata(cloned_task.build_save_dir())

            cloned_task.state = State.STOPPED
            cloned_task.uuid = new_uuid
            cloned_task.creation_time = datetime.now()
            cloned_task.save_metadata()
            self.view.add_task(cloned_task)

            return cloned_task

    def extract_checkpoint(self, task, checkpoint_id):
        if task in self.tasks and not task.is_test:
            checkpoint_dir = task.build_checkpoint_dir(checkpoint_id)
            task_config = self.configuration.add_task([], {})

            new_task, _ = self._create_task_from_config(task_config, task.total_iterations)
            new_uuid = new_task.uuid

            new_task_dir = new_task.build_save_dir()
            shutil.rmtree(str(new_task_dir))
            shutil.copytree(str(checkpoint_dir), str(new_task_dir))
            for file in new_task_dir.glob("events.out.checkpoint.*"):
                file.rename(str(file).replace("events.out.checkpoint", "events.out.tfevents"))

            new_task.load_metadata(new_task.build_save_dir())

            new_task.state = State.STOPPED
            new_task.uuid = new_uuid
            new_task.creation_time = datetime.now()
            new_task.checkpoints = []
            new_task.save_metadata()
            self.view.add_task(new_task)

            return new_task

    def change_sorting(self, param_uuid, new_sorting):
        param = self.configuration.get_config(param_uuid)
        self.view.remove_param(param)

        changed_params = self.configuration.change_sorting(param_uuid, new_sorting)

        self.view.add_param(param)
        return changed_params