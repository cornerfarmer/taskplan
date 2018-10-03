import pickle
from multiprocessing import Process, Value, Pipe, Semaphore
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


class SharedMetaData:

    def __init__(self, total_iterations, parent_data=None):
        if parent_data is None:
            self.total_iterations = Value('i', total_iterations)
            self.finished_iterations = Value('i', 0)
            self.pause_computation = Value('b', False)
            self.iteration_update_time = Value('d', 0.0)
            self.save_now = Value('b', False)
        else:
            self.total_iterations = parent_data.total_iterations
            self.finished_iterations = parent_data.finished_iterations
            self.pause_computation = parent_data.pause_computation
            self.iteration_update_time = parent_data.iteration_update_time
            self.save_now = parent_data.save_now

        self.total_subtasks = Value('i', 0)
        self.finished_subtasks = Value('i', 0)
        self.is_running = Value('b', False)
        self.had_error = Value('b', False)
        self.preset_pipe_recv, self.preset_pipe_send = Pipe(duplex=False)

class TaskWrapper:
    def __init__(self, task_dir, class_name, preset, original_preset_uuid, project, total_iterations, try_number, code_version, force_save_dir=None, parent_shared_data=None):
        self.task_dir = task_dir
        self.class_name = class_name
        self.preset = preset
        self.process = None
        self.state = State.INIT
        self.uuid = uuid.uuid4()
        self.project = project
        self.original_preset_uuid = original_preset_uuid
        self.start_time = None
        self.creation_time = datetime.datetime.now()
        self.saved_time = None
        self.try_number = try_number
        self.queue_index = 0
        self.code_version = code_version
        self.force_save_dir = force_save_dir
        self.is_subtask = force_save_dir is not None

        self._shared = SharedMetaData(total_iterations, parent_shared_data)

    def start(self, wakeup_sem):
        sys.stdout.flush()
        self._shared.pause_computation.value = False
        self._shared.is_running.value = True
        self._shared.had_error.value = False
        self.process = Process(target=TaskWrapper._run, args=(self.task_dir, self.class_name, self.preset.clone(), wakeup_sem, self._shared, self.build_save_dir(), self.code_version, self.uuid))
        self.start_time = datetime.datetime.now()
        self.process.start()
        self.state = State.RUNNING

    def pause(self):
        if self.state == State.RUNNING:
            self._shared.pause_computation.value = True

    def finish(self):
        if self.state == State.STOPPED:
            self._shared.total_iterations.value = self._shared.finished_iterations.value
            self.save_metadata()

    def stop(self):
        self.state = State.STOPPED
        if self.process is not None:
            self.process.join(timeout=10)
        self.saved_time = datetime.datetime.now()
        self.save_metadata()

    def had_error(self):
        return self._shared.had_error.value

    def is_running(self):
        return self.process.is_alive() and self._shared.is_running.value

    def finished_subtasks(self):
        return self._shared.finished_subtasks.value

    def total_subtasks(self):
        return self._shared.total_subtasks.value

    def finished_iterations_and_update_time(self):
        with self._shared.finished_iterations.get_lock():
            with self._shared.iteration_update_time.get_lock():
                return self._shared.finished_iterations.value, self._shared.iteration_update_time.value

    @staticmethod
    def _run(task_dir, class_name, preset, wakeup_sem, shared, save_dir, code_version, task_uuid):

        logger = Logger(save_dir, "main")
        try:
            sys.path.append(str(task_dir))
            os.chdir(str(task_dir))
            task_class = getattr(importlib.import_module(class_name), class_name)

            subtask_presets, number_of_subtasks = task_class.subtasks(preset)

            if subtask_presets is not None:
                shared.total_subtasks.value = number_of_subtasks
                TaskWrapper._run_task_with_subtasks(task_dir, class_name, subtask_presets, shared, save_dir, code_version, preset, task_class, logger, task_uuid)
            else:
                shared.total_subtasks.value = 1
                TaskWrapper._run_subtask(task_class, preset, shared, save_dir)

        except:
            logger.log(traceback.format_exc(), logging.ERROR)
            shared.had_error.value = True

        shared.is_running.value = False
        wakeup_sem.release()

    @staticmethod
    def _run_task_with_subtasks(task_dir, class_name, presets, shared, save_dir, code_version, root_preset, task_class, logger, task_uuid):
        shared.finished_subtasks.value = 0
        original_save_dir = save_dir
        wakeup_sem = Semaphore(0)
        original_total_iterations = shared.total_iterations.value

        presets_iter = iter(presets)
        while True:
            try:
                preset_name, preset = next(presets_iter)
            except StopIteration:
                break

            save_dir = original_save_dir / Path(str(preset_name))

            subtask_wrapper = TaskWrapper(task_dir, class_name, preset, "", None, shared.total_iterations.value, 0, code_version, save_dir, shared)
            if save_dir.is_dir():
                subtask_wrapper.load_metadata(save_dir, True)
                logger.log("Continuing subtask '" + preset_name + "':" + str(task_uuid) + " (" + str(shared.finished_iterations.value) + " -> " + str(shared.total_iterations.value) + ")")
            else:
                shared.finished_iterations.value = 0
                subtask_wrapper.save_metadata()
                logger.log("Starting subtask '" + preset_name + "':" + str(task_uuid) + " (" + str(shared.finished_iterations.value) + " -> " + str(shared.total_iterations.value) + ")")

            subtask_wrapper.start(wakeup_sem)
            wakeup_sem.acquire()

            if shared.pause_computation.value or subtask_wrapper.had_error():
                break

            shared.finished_subtasks.value += 1

            if original_total_iterations != shared.total_iterations.value:
                presets, _ = task_class.subtasks(root_preset)
                presets_iter = iter(presets)
                shared.finished_subtasks.value = 0
                original_total_iterations = shared.total_iterations.value

    @staticmethod
    def _run_subtask(task_class, preset, shared, save_dir):
        logger = Logger(save_dir, "main")
        preset.set_logger(logger.get_with_module('config'))
        preset.iteration_cursor = shared.finished_iterations.value

        task = task_class(preset, shared.preset_pipe_recv, logger.get_with_module('task'))

        def save_func():
            task.save(save_dir)
            with open(str(save_dir / Path("metadata.json")), 'r') as handle:
                data = json.load(handle)

            with open(str(save_dir / Path("metadata.json")), 'w') as handle:
                data['saved_time'] = time.mktime(datetime.datetime.now().timetuple())
                data['finished_iterations'] = shared.finished_iterations.value
                data['finished_subtasks'] = shared.finished_subtasks.value
                json.dump(data, handle)

        if shared.finished_iterations.value > 0:
            task.load(save_dir)
        task.run(shared.finished_iterations, shared.iteration_update_time, shared.total_iterations, shared.pause_computation, shared.save_now, save_dir, save_func)

        save_func()

    def build_save_dir(self):
        if self.force_save_dir is None:
            return self.project.result_dir / Path(self.code_version) / Path(self.preset.name) / Path(str(self.try_number))
        else:
            return self.force_save_dir

    def save_metadata(self):
        data = {}
        data['uuid'] = str(self.uuid)
        data['finished_iterations'] = self._shared.finished_iterations.value
        data['finished_subtasks'] = self._shared.finished_subtasks.value
        data['total_iterations'] = self._shared.total_iterations.value
        data['try_number'] = self.try_number
        data['creation_time'] = time.mktime(self.creation_time.timetuple())
        data['saved_time'] = time.mktime(self.saved_time.timetuple()) if self.saved_time is not None else ""
        data['had_error'] = self._shared.had_error.value
        data['preset'] = self.preset.data
        data['original_preset_uuid'] = self.original_preset_uuid
        data['code_version'] = self.code_version
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
            if not self.is_subtask:
                self.preset = self.project.configuration.add_preset(data['preset'], None)
            self._shared.finished_iterations.value = data['finished_iterations']
            self._shared.finished_subtasks.value = data['finished_subtasks']
            if not ignore_total_iterations:
                self._shared.total_iterations.value = data['total_iterations']
            self.try_number = data['try_number']
            if use_pickle:
                self.creation_time = data['creation_time']
                self.saved_time = data['saved_time']
            else:
                self.creation_time = datetime.datetime.fromtimestamp(data['creation_time'])
                self.saved_time = datetime.datetime.fromtimestamp(data['saved_time']) if data['saved_time'] is not "" else None
            self.original_preset_uuid = data['original_preset_uuid']
            self._shared.had_error.value = data['had_error']
            self.code_version = data['code_version']

    def total_iterations(self):
        return self._shared.total_iterations.value

    def set_total_iterations(self, total_iterations):
        with self._shared.finished_iterations.get_lock():
            with self._shared.total_iterations.get_lock():
                if total_iterations > self._shared.finished_iterations.value + (1 if self.state == State.RUNNING else 0):
                    self._shared.total_iterations.value = total_iterations

    def remove_data(self):
        save_dir = self.build_save_dir()
        shutil.rmtree(save_dir)

    def adjust_config(self, new_config):
        with self._shared.finished_iterations.get_lock():
            new_config = self.preset.diff_config(new_config, False, self._shared.finished_iterations.value + 1)
            self.preset.set_config_at_timestep(new_config, self._shared.finished_iterations.value + 1)
            self._shared.preset_pipe_send.send(self.preset.clone())

    def __str__(self):
        return self.project.name + ": " + self.preset.name + " (try " + str(self.try_number) + ")"

    def save_now(self):
        if self.state == State.RUNNING:
            self._shared.save_now.value = True

    def is_saving(self):
        return self._shared.save_now.value

    def is_pausing(self):
        return self._shared.pause_computation.value