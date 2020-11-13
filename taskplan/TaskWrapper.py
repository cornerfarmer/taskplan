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
import tensorflow as tf
import sys
import math

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

class StdOut(object):
    def __init__(self, logger):
        self.logger = logger
        self.buffer = ""

    def write(self, message):
        self.buffer += message
        while '\n' in self.buffer:
            i = self.buffer.find('\n')
            self.logger.log(self.buffer[:i + 1])
            self.buffer = self.buffer[i + 1:]


    def flush(self):
        self.logger.log(self.buffer)
        self.buffer = ""

class TaskWrapper:
    def __init__(self, task_dir, class_name, config, project, total_iterations, tasks_dir, is_test=False, tags=[]):
        self._reset_state(task_dir, class_name, config, project, total_iterations, tasks_dir, is_test, tags)

        self._create_metadata_lock()

    def _reset_state(self, task_dir, class_name, config, project, total_iterations, tasks_dir, is_test, tags):
        self.task_dir = task_dir
        self.class_name = class_name
        self.config = config
        self.device = None
        self.state = State.INIT
        self.uuid = uuid.uuid4()
        self.project = project
        self.iteration_rate = None
        self.start_time = None
        self.creation_time = datetime.datetime.now()
        self.saved_time = datetime.datetime.now()
        self.queue_index = 0
        self.code_versions = {}
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
        self.name = []
        self.metrics = {}
        self.last_metrics_update = 0

    def _create_metadata_lock(self):
        path = self.build_save_dir()
        path = path / "metadata.json.lock"
        self.metadata_lock = SoftFileLock(path)

    def start(self, print_log):
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
        did_update = self.project.configuration.renew_task_config(self)
        if did_update:
            self.save_metadata(["config"])

        if not self.is_test:
            commit_id = self.project.version_control.take_snapshot("Task: " + str(self.uuid))
            recent_id = self.most_recent_code_version()
            if recent_id != commit_id:
                self.code_versions[str(self.finished_iterations)] = commit_id
                self.save_metadata(["code_versions"])

        self.device.run_task(self.task_dir, self.class_name, self.config.clone(), metadata, print_log)
        self.start_time = time.time()
        self.state = State.RUNNING

    def most_recent_code_version(self):
        return max(self.code_versions.items(), key=lambda x: int(x[0]))[1] if len(self.code_versions) > 0 else None

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
    def _run(task_dir, class_name, config, metadata, print_log):

        logger = Logger(metadata["task_dir"], "main", terminal=sys.stdout if print_log else None)
        sys.stdout = StdOut(logger)
        sys.stderr = sys.stdout
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
            new_data['code_versions'] = self.code_versions
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
            self.code_versions = data['code_versions']
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
            print("Could not remove directory: " + str(save_dir) + ". Probably the fault of TB, gonna try again in a bit.")

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
                self.iteration_rate = arg["iteration_rate"]
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

    def update_metrics(self, metric_superset=None):
        current_time = time.time()

        for path in self.build_save_dir().glob("events.out.tfevents.*"):
            if path.stat().st_mtime >= self.last_metrics_update:
                for e in tf.compat.v1.train.summary_iterator(str(path)):
                    for v in e.summary.value:
                        if v.tag not in self.metrics or self.metrics[v.tag][0] < e.step or (self.metrics[v.tag][0] == e.step and self.metrics[v.tag][1] < e.wall_time):
                            value = float(tf.make_ndarray(v.tensor))
                            if math.isnan(value):
                                value = "nan"
                            self.metrics[v.tag] = (e.step, e.wall_time, value)

        if metric_superset is not None:
            for tag in self.metrics.keys():
               metric_superset.add(tag)
        self.last_metrics_update = current_time

    def col_from_task(self, col_name, task_name):
        if col_name == "saved":
            return self.saved_time
        elif col_name == "name":
            return " / ".join(task_name)
        elif col_name == "created":
            return self.creation_time
        elif col_name == "iterations":
            return self.finished_iterations
        elif col_name in self.metrics:
            self.update_metrics()
            return self.metrics[col_name][2]
        elif col_name == "uuid":
            return str(self.uuid)
        else:
            return 0

    def run_time(self):
        if self.state == State.RUNNING:
            return time.time() - self.start_time
        else:
            None

    def time_left(self):
        if self.state == State.RUNNING and self.iteration_rate is not None:
            return (self.total_iterations - self.finished_iterations) * self.iteration_rate - (time.time() - self.iteration_update_time)
        else:
            return None
