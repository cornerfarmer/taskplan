import pickle
from multiprocessing import Process, Value, Pipe, Lock
import sys
import importlib
from enum import Enum
import uuid
import datetime
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

class State(Enum):
    INIT = 0
    QUEUED = 1
    RUNNING = 2
    STOPPED = 3

class PipeMsg(Enum):
    HAD_ERROR = 0
    PRESET_CHANGED = 1
    TOTAL_ITERATIONS = 2
    PAUSING = 3
    SAVING = 4
    FINISHED_ITERATIONS = 5
    IS_RUNNING = 6
    NEW_CHECKPOINT = 7


class SharedMetaData:

    def __init__(self, total_iterations, parent_data=None):
        if parent_data is None:
            self.total_iterations = Value('i', total_iterations)
            self.finished_iterations = Value('i', 0)
            self.pausing = Value('b', False)
            self.iteration_update_time = Value('d', 0.0)
            self.saving = Value('b', False)
        else:
            self.total_iterations = parent_data.total_iterations
            self.finished_iterations = parent_data.finished_iterations
            self.pausing = parent_data.pausing
            self.iteration_update_time = parent_data.iteration_update_time
            self.saving = parent_data.saving

        self.is_running = Value('b', False)
        self.had_error = Value('b', False)

class PipeEnd:
    def __init__(self, pipe):
        self.lock = Lock()
        self.pipe = pipe

    def send(self, msg_type, arg=None):
        self.lock.acquire()
        self.pipe.send({"name": msg_type, "arg": arg})
        self.lock.release()

    def recv(self):
        self.lock.acquire()
        data = self.pipe.recv()
        self.lock.release()
        return data["name"], data["arg"]

    def poll(self, arg):
        return self.pipe.poll(arg)

class TaskWrapper:
    def __init__(self, task_dir, class_name, preset, project, total_iterations, code_version, tasks_dir, is_test=False):
        self.task_dir = task_dir
        self.class_name = class_name
        self.preset = preset
        self.process = None
        self.state = State.INIT
        self.uuid = uuid.uuid4()
        self.project = project
        self.start_time = None
        self.creation_time = datetime.datetime.now()
        self.saved_time = None
        self.queue_index = 0
        self.code_version = code_version
        self.tasks_dir = tasks_dir
        self.is_test = is_test
        self.checkpoints = []
        self.total_iterations = total_iterations
        self.finished_iterations = 0
        self.had_error = False
        self._is_running = False
        self.iteration_update_time = 0.0
        self.pausing = False
        self.saving = False

        pipe_recv, pipe_send = Pipe(duplex=True)
        self.wrapper_pipe = PipeEnd(pipe_recv)
        self.task_pipe = PipeEnd(pipe_send)

        #self._shared = SharedMetaData(total_iterations, parent_shared_data)

    def start(self):
        sys.stdout.flush()
        self.pausing = False
        self._is_running = True
        self.had_error = False
        metadata = {
            "task_dir": self.build_save_dir(),
            "pipe": self.task_pipe,
            "finished_iterations": self.finished_iterations,
            "total_iterations": self.total_iterations
        }
        self.process = Process(target=TaskWrapper._run, args=(self.task_dir, self.class_name, self.preset.clone(), metadata))
        self.start_time = datetime.datetime.now()
        self.process.start()
        self.state = State.RUNNING

    def pause(self):
        if self.state == State.RUNNING:
            self.wrapper_pipe.send(PipeMsg.PAUSING, True)

    def finish(self):
        if self.state == State.STOPPED:
            self.total_iterations = self.finished_iterations
            self.save_metadata()

    def stop(self):
        self.state = State.STOPPED
        if self.process is not None:
            self.process.join(timeout=10)
        self.saved_time = datetime.datetime.now()
        self.save_metadata()

    def is_running(self):
        return self.process.is_alive() and self._is_running

    def finished_iterations_and_update_time(self):
        return self.finished_iterations, self.iteration_update_time

    @staticmethod
    def _run(task_dir, class_name, preset, metadata):

        logger = Logger(metadata["task_dir"], "main")
        try:
            sys.path.append(str(task_dir))
            os.chdir(str(task_dir))
            task_class = getattr(importlib.import_module(class_name), class_name)

            TaskWrapper._run_task(task_class, preset, logger, metadata)

        except:
            logger.log(traceback.format_exc(), logging.ERROR)
            metadata["pipe"].send(PipeMsg.HAD_ERROR, True)

        metadata["pipe"].send(PipeMsg.IS_RUNNING, False)

    @staticmethod
    def _run_task(task_class, preset, logger, metadata):
        preset.set_logger(logger.get_with_module('config'))
        preset.iteration_cursor = metadata["finished_iterations"]

        task = task_class(preset, logger.get_with_module('task'), metadata)

        def save_func(finished_iterations):
            task.save(metadata["task_dir"])
            with open(str(metadata["task_dir"] / Path("metadata.json")), 'r') as handle:
                data = json.load(handle)

            with open(str(metadata["task_dir"] / Path("metadata.json")), 'w') as handle:
                data['saved_time'] = time.mktime(datetime.datetime.now().timetuple())
                data['finished_iterations'] = finished_iterations
                json.dump(data, handle)

        def checkpoint_func(finished_iterations):
            save_func(finished_iterations)

            checkpoint_dir = metadata["task_dir"] / Path("checkpoints")
            checkpoint_dir.mkdir(exist_ok=True)
            checkpoint_dir /= Path(str(finished_iterations))

            shutil.copytree(str(metadata["task_dir"]), str(checkpoint_dir), ignore=lambda directory, contents: ['checkpoints'] if directory == str(metadata["task_dir"]) else [])
            for file in checkpoint_dir.glob("events.out.tfevents.*"):
                file.rename(str(file).replace("events.out.tfevents", "events.out.checkpoint"))

            checkpoint = {
                "finished_iterations": finished_iterations,
                "time": time.mktime(datetime.datetime.now().timetuple())
            }

            with open(str(metadata["task_dir"] / Path("metadata.json")), 'r') as handle:
                data = json.load(handle)
            with open(str(metadata["task_dir"] / Path("metadata.json")), 'w') as handle:
                data['checkpoints'].append(checkpoint)
                data['finished_iterations'] = finished_iterations
                json.dump(data, handle)

            return checkpoint

        if metadata["finished_iterations"] > 0:
            task.load(metadata["task_dir"])
        task.run(save_func, checkpoint_func)

        save_func(task.finished_iterations)

    def build_save_dir(self):
        return self.tasks_dir / str(self.uuid)

    def build_checkpoint_dir(self, checkpoint_id):
        return self.build_save_dir() / "checkpoints" / str(self.checkpoints[checkpoint_id]["finished_iterations"])

    def save_metadata(self):
        data = {}
        data['uuid'] = str(self.uuid)
        data['finished_iterations'] = self.finished_iterations
        data['total_iterations'] = self.total_iterations
        data['creation_time'] = time.mktime(self.creation_time.timetuple())
        data['saved_time'] = time.mktime(self.saved_time.timetuple()) if self.saved_time is not None else ""
        data['had_error'] = self.had_error
        data['preset'] = self.preset.data
        data['code_version'] = self.code_version
        data['checkpoints'] = self.checkpoints
        path = self.build_save_dir()
        path.mkdir(parents=True, exist_ok=True)
        with open(str(path / Path("metadata.json")), 'w') as handle:
            json.dump(data, handle, indent=2, separators=(',', ': '))

    def load_metadata(self, path, ignore_total_iterations=False):
        use_pickle = not (path / Path("metadata.json")).exists()
        with open(str(path / Path("metadata.pk" if use_pickle else "metadata.json")), 'rb' if use_pickle else "r") as handle:
            if use_pickle:
                data = pickle.load(handle)
            else:
                data = json.load(handle)
            self.uuid = uuid.UUID(data['uuid'])
            self.preset = self.project.configuration.load_task(data['preset'])
            self.finished_iterations = data['finished_iterations']
            if not ignore_total_iterations:
                self.total_iterations = data['total_iterations']
            if use_pickle:
                self.creation_time = data['creation_time']
                self.saved_time = data['saved_time']
            else:
                self.creation_time = datetime.datetime.fromtimestamp(data['creation_time'])
                self.saved_time = datetime.datetime.fromtimestamp(data['saved_time']) if data['saved_time'] != "" else None
            self.had_error = data['had_error']
            self.code_version = data['code_version']
            self.checkpoints = data['checkpoints']

    def set_total_iterations(self, total_iterations):
        if self.state == State.RUNNING:
            self.wrapper_pipe.send(PipeMsg.TOTAL_ITERATIONS, total_iterations)
        elif total_iterations > self.finished_iterations:
            self.total_iterations = total_iterations

    def remove_data(self):
        save_dir = self.build_save_dir()
        shutil.rmtree(save_dir)

    def receive_updates(self):
        update_available = self.wrapper_pipe.poll(0)
        while update_available:
            msg_type, arg = self.wrapper_pipe.recv()

            if msg_type == PipeMsg.PAUSING:
                self.pausing = arg
            elif msg_type == PipeMsg.SAVING:
                self.saving = arg
            elif msg_type == PipeMsg.HAD_ERROR:
                self.had_error = arg
            elif msg_type == PipeMsg.IS_RUNNING:
                self._is_running = arg
            elif msg_type == PipeMsg.FINISHED_ITERATIONS:
                self.finished_iterations, self.iteration_update_time = arg["finished_iterations"], arg["iteration_update_time"]
            elif msg_type == PipeMsg.NEW_CHECKPOINT:
                self.checkpoints.append(arg)
            elif msg_type == PipeMsg.TOTAL_ITERATIONS:
                self.total_iterations = arg

            update_available = self.wrapper_pipe.poll(0)

    def adjust_config(self, new_config):
        self.preset.set_config_at_timestep(new_config, self.finished_iterations + 1)
        self.wrapper_pipe.send(self.preset.clone())
        self.save_metadata()

    def save_now(self):
        if self.state == State.RUNNING:
            self.wrapper_pipe.send(PipeMsg.SAVING, True)
