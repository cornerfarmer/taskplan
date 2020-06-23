import datetime
import importlib
import sys
import uuid
from enum import Enum

try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path
from taskconf.util.Logger import Logger
import shutil
import traceback
import logging
import json
import os
import time
from filelock import SoftFileLock

class State(Enum):
    INIT = 0
    QUEUED = 1
    RUNNING = 2
    STOPPED = 3

class PipeMsg(Enum):
    HAD_ERROR = 0
    CONFIG_CHANGED = 1
    TOTAL_ITERATIONS = 2
    PAUSING = 3
    SAVING = 4
    FINISHED_ITERATIONS = 5
    IS_RUNNING = 6
    NEW_CHECKPOINT = 7
    SAVED_FINISHED_ITERATIONS = 8
    CREATE_CHECKPOINT = 9


class TaskWrapper:
    def __init__(self, task_dir, class_name, config, project, total_iterations, code_version, tasks_dir, is_test=False, tags=[]):
        self._reset_state(task_dir, class_name, config, project, total_iterations, code_version, tasks_dir, is_test, tags)

        self._create_metadata_lock()

    def _reset_state(self, task_dir, class_name, config, project, total_iterations, code_version, tasks_dir, is_test, tags):
        self.task_dir = task_dir
        self.class_name = class_name
        self.config = config
        self.device = None
        self.state = State.INIT
        self.uuid = uuid.uuid4()
        self.project = project
        self.start_time = None
        self.creation_time = datetime.datetime.now()
        self.saved_time = datetime.datetime.now()
        self.queue_index = 0
        self.code_version = code_version
        self.tasks_dir = tasks_dir
        self.is_test = is_test
        self.checkpoints = []
        self.total_iterations = total_iterations
        self.finished_iterations = 0
        self.saved_finished_iterations = 0
        self.had_error = False
        self._is_running = False
        self.iteration_update_time = 0.0
        self.pausing = False
        self.saving = False
        self.creating_checkpoint = False
        self.notes = ""
        self.tags = tags

    def _create_metadata_lock(self):
        path = self.build_save_dir()
        path = path / "metadata.json.lock"
        self.metadata_lock = SoftFileLock(path)

    def start(self):
        sys.stdout.flush()
        self.pausing = False
        self._is_running = True
        self.had_error = False
        metadata = {
            "task_dir": self.build_save_dir(),
            "finished_iterations": self.finished_iterations,
            "total_iterations": self.total_iterations,
            "task_uuid": str(self.uuid)
        }
        did_update = self.project.configuration.renew_task_config(self.config)
        if did_update:
            self.save_metadata(["config"])

        self.device.run_task(self.task_dir, self.class_name, self.config.clone(), metadata)
        self.start_time = datetime.datetime.now()
        self.state = State.RUNNING

    def set_as_running(self, device, start_time):
        self.pausing = False
        self._is_running = True
        self.had_error = False
        self.device = device
        self.state = State.RUNNING
        self.start_time = start_time

    def set_as_stopped(self):
        self.pausing = False
        self._is_running = False
        self.had_error = False
        self.device = None
        self.state = State.STOPPED
        self.finished_iterations = self.saved_finished_iterations

    def pause(self):
        if self.state == State.RUNNING:
            self.device.send(PipeMsg.PAUSING, True)

    def terminate(self):
        if self.state == State.RUNNING:
            self.device.terminate()

    def finish(self):
        if self.state == State.STOPPED:
            self.total_iterations = self.finished_iterations
            self.save_metadata(["total_iterations"])

    def stop(self):
        self.receive_updates()
        self.finished_iterations = self.saved_finished_iterations

        self.state = State.STOPPED
        if self.device is not None:
            self.device.join()
            self.device = None

    def is_running(self):
        return self.device.is_running() and self._is_running

    def finished_iterations_and_update_time(self):
        return self.finished_iterations, self.iteration_update_time

    @staticmethod
    def _run(task_dir, class_name, config, metadata):

        logger = Logger(metadata["task_dir"], "main")
        try:
            sys.path = [str(task_dir)] + sys.path
            os.chdir(str(task_dir))
            task_class = getattr(importlib.import_module(class_name, "."), class_name)

            TaskWrapper._run_task(task_class, config, logger, metadata)

        except:
            logger.log(traceback.format_exc(), logging.ERROR)
            metadata["pipe"].send(PipeMsg.HAD_ERROR, True)

        metadata["pipe"].send(PipeMsg.IS_RUNNING, False)


    @staticmethod
    def _create_checkpoint(metadata_lock, task_dir, finished_iterations):
        with metadata_lock:
            checkpoint_dir = task_dir / Path("checkpoints")
            checkpoint_dir.mkdir(exist_ok=True)
            checkpoint_dir /= Path(str(finished_iterations))

            shutil.copytree(str(task_dir), str(checkpoint_dir), ignore=lambda directory, contents: ['checkpoints', 'metadata.json.lock'] if directory == str(task_dir) else [])
            for file in checkpoint_dir.glob("events.out.tfevents.*"):
                file.rename(str(file).replace("events.out.tfevents", "events.out.checkpoint"))

            checkpoint = {
                "finished_iterations": finished_iterations,
                "time": time.mktime(datetime.datetime.now().timetuple())
            }

            with open(str(task_dir / Path("metadata.json")), 'r') as handle:
                data = json.load(handle)
            with open(str(task_dir / Path("metadata.json")), 'w') as handle:
                data['checkpoints'].append(checkpoint)
                data['finished_iterations'] = finished_iterations
                json.dump(data, handle)
            return checkpoint

    @staticmethod
    def _run_task(task_class, config, logger, metadata):
        config.set_logger(logger.get_with_module('config'))
        config.iteration_cursor = metadata["finished_iterations"]

        task = task_class(config, logger.get_with_module('task'), metadata)
        metadata_lock = SoftFileLock(metadata["task_dir"] / "metadata.json.lock")

        def save_func(finished_iterations):
            with metadata_lock:
                task.save(metadata["task_dir"])
                with open(str(metadata["task_dir"] / Path("metadata.json")), 'r') as handle:
                    data = json.load(handle)

                with open(str(metadata["task_dir"] / Path("metadata.json")), 'w') as handle:
                    data['saved_time'] = time.mktime(datetime.datetime.now().timetuple())
                    data['finished_iterations'] = finished_iterations
                    json.dump(data, handle)

            metadata["pipe"].send(PipeMsg.SAVED_FINISHED_ITERATIONS, {"saved_finished_iterations": finished_iterations, "saved_time": data['saved_time']})

        def checkpoint_func(finished_iterations):
            save_func(finished_iterations)
            checkpoint = TaskWrapper._create_checkpoint(metadata_lock, metadata["task_dir"], finished_iterations)
            return checkpoint

        if metadata["finished_iterations"] > 0:
            task.load(metadata["task_dir"])
        task.run(save_func, checkpoint_func)

        save_func(task.finished_iterations)

    def build_save_dir(self):
        return self.tasks_dir / ("" if self.is_test else str(self.uuid))

    def build_checkpoint_dir(self, checkpoint_id):
        return self.build_save_dir() / "checkpoints" / str(self.checkpoints[checkpoint_id]["finished_iterations"])

    def save_metadata(self, keys_only=None):
        path = self.build_save_dir()
        path.mkdir(parents=True, exist_ok=True)
        path = path / "metadata.json"

        with self.metadata_lock:
            new_data = {}
            new_data['uuid'] = str(self.uuid)
            new_data['finished_iterations'] = self.finished_iterations
            new_data['total_iterations'] = self.total_iterations
            new_data['creation_time'] = time.mktime(self.creation_time.timetuple())
            new_data['saved_time'] = time.mktime(self.saved_time.timetuple()) if self.saved_time is not None else ""
            new_data['had_error'] = self.had_error
            new_data['config'] = self.config.data
            new_data['code_version'] = self.code_version
            new_data['checkpoints'] = self.checkpoints
            new_data['notes'] = self.notes
            new_data['tags'] = self.tags

            if path.exists():
                with open(str(path), "r") as handle:
                    old_data = json.load(handle)
            else:
                old_data = {}

            for key in new_data.keys():
                if keys_only is None or key in keys_only:
                    old_data[key] = new_data[key]

            with open(str(path), 'w') as handle:
                json.dump(old_data, handle, indent=2, separators=(',', ': '))

    def load_metadata(self, path, ignore_total_iterations=False):
        with open(str(path / "metadata.json"), "r") as handle:
            data = json.load(handle)
            self.uuid = uuid.UUID(data['uuid'])
            self.config = self.project.configuration.load_task(data['config'])
            self.finished_iterations = data['finished_iterations']
            self.saved_finished_iterations = self.finished_iterations
            if not ignore_total_iterations:
                self.total_iterations = data['total_iterations']
            self.creation_time = datetime.datetime.fromtimestamp(data['creation_time'])
            self.saved_time = datetime.datetime.fromtimestamp(data['saved_time']) if data['saved_time'] != "" else None
            self.had_error = data['had_error']
            self.code_version = data['code_version']
            self.checkpoints = data['checkpoints']
            self.notes = data['notes']
            self.tags = data['tags'] if "tags" in data else []
            self._create_metadata_lock()

    def set_total_iterations(self, total_iterations):
        if self.state == State.RUNNING:
            self.device.send(PipeMsg.TOTAL_ITERATIONS, total_iterations)
        elif total_iterations > self.finished_iterations:
            self.total_iterations = total_iterations
            self.save_metadata(["total_iterations"])

    def remove_data(self):
        save_dir = self.build_save_dir()
        try:
            shutil.rmtree(save_dir)
        except OSError:
            time.sleep(1)
            shutil.rmtree(save_dir)

    def receive_updates(self):
        msg_type, arg = self.device.recv()
        while msg_type is not None:
            if msg_type == PipeMsg.PAUSING:
                self.pausing = arg
            elif msg_type == PipeMsg.SAVING:
                self.saving = arg
            elif msg_type == PipeMsg.HAD_ERROR:
                self.had_error = arg
                self.save_metadata(["had_error"])
            elif msg_type == PipeMsg.IS_RUNNING:
                self._is_running = arg
            elif msg_type == PipeMsg.FINISHED_ITERATIONS:
                self.finished_iterations, self.iteration_update_time = arg["finished_iterations"], arg["iteration_update_time"]
            elif msg_type == PipeMsg.SAVED_FINISHED_ITERATIONS:
                self.saved_finished_iterations = arg["saved_finished_iterations"]
                self.saved_time = datetime.datetime.fromtimestamp(arg["saved_time"])
            elif msg_type == PipeMsg.NEW_CHECKPOINT:
                self.checkpoints.append(arg)
            elif msg_type == PipeMsg.TOTAL_ITERATIONS:
                self.total_iterations = arg
                self.save_metadata(["total_iterations"])
            elif msg_type == PipeMsg.CREATE_CHECKPOINT:
                self.creating_checkpoint = arg

            msg_type, arg = self.device.recv()

    def save_now(self):
        if self.state == State.RUNNING:
            self.device.send(PipeMsg.SAVING, True)

    def create_checkpoint_now(self):
        if self.state == State.RUNNING:
            self.device.send(PipeMsg.CREATE_CHECKPOINT, True)

    def set_notes(self, notes):
        self.notes = notes
        self.save_metadata(["notes"])

    def set_tags(self, tags):
        self.tags = tags
        self.save_metadata(["tags"])

    def create_checkpoint(self):
        if self.state != State.RUNNING:
            checkpoint = TaskWrapper._create_checkpoint(self.metadata_lock, self.build_save_dir(), self.finished_iterations)
            self.checkpoints.append(checkpoint)

    def reload(self):
        path = self.build_save_dir()
        if not path.exists():
            return False

        self._reset_state(self.task_dir, self.class_name, self.config, self.project, self.total_iterations, self.code_version, self.tasks_dir, self.is_test, self.tags)
        self.load_metadata(path)
        return True

    def get_param_value_to_param(self, param, project_config):
        suitable_param_value = None
        args = []
        for param_value in self.config.base_configs:
            if param_value[0].get_metadata("param") == str(param.uuid):
                suitable_param_value = param_value[0]
                args = param_value[1:]
                break

        if suitable_param_value is None:
            deprecated_param_value = project_config.get_config(param.get_metadata("deprecated_param_value"))
            key = deprecated_param_value.get_metadata("name")
            if deprecated_param_value.has_metadata("template_deprecated"):
                args = deprecated_param_value.get_metadata("template_deprecated")
            suitable_param_value = deprecated_param_value
        else:
            key = suitable_param_value.get_metadata("name")
        return key, args, suitable_param_value

    def get_param_value_key_to_param(self, param, project_config):
        key, args, _ = self.get_param_value_to_param(param, project_config)
        key = self.fill_param_value_template(key, args)
        return key

    def fill_param_value_template(self, key, args):
        for i in range(len(args)):
            key = key.replace("$T" + str(i) + "$", str(args[i]))
        return key