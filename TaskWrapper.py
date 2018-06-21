import pickle
from multiprocessing import Process, Value, Pipe
import sys
import importlib
from enum import Enum
import uuid
import datetime
from pathlib import Path
from TaskConf.util.Logger import Logger
import shutil
import traceback
import logging

import os
class State(Enum):
    INIT = 0
    QUEUED = 1
    RUNNING = 2
    STOPPED = 3


class TaskWrapper:
    def __init__(self, task_dir, class_name, preset, original_preset_uuid, project, total_iterations, try_number, code_version):
        self.task_dir = task_dir
        self.class_name = class_name
        self.preset = preset
        self.preset_pipe_recv, self.preset_pipe_send = Pipe(duplex=False)
        self.process = None
        self.state = State.INIT
        self.uuid = uuid.uuid4()
        self.project = project
        self.original_preset_uuid = original_preset_uuid
        self._finished_iterations = Value('i', 0)
        self._total_subtasks = Value('i', 0)
        self._finished_subtasks = Value('i', 0)
        self._pause_computation = Value('b', False)
        self._iteration_update_time = Value('d', 0.0)
        self.start_time = None
        self.creation_time = datetime.datetime.now()
        self.saved_time = None
        self._total_iterations = Value('i', total_iterations)
        self.try_number = try_number
        self._is_running = Value('b', False)
        self._had_error = Value('b', False)
        self._save_now = Value('b', False)
        self.queue_index = 0
        self.code_version = code_version

    def start(self, wakeup_sem):
        sys.stdout.flush()
        self._pause_computation.value = False
        self._is_running.value = True
        self._had_error.value = False
        self.process = Process(target=TaskWrapper._run, args=(self.task_dir, self.class_name, self.preset.clone(), self.preset_pipe_recv, wakeup_sem, self._finished_subtasks, self._total_subtasks, self._finished_iterations, self._iteration_update_time, self._total_iterations, self._pause_computation, self._save_now, self.build_save_dir(), self._is_running, self._had_error))
        self.start_time = datetime.datetime.now()
        self.process.start()
        self.state = State.RUNNING

    def pause(self):
        if self.state == State.RUNNING:
            self._pause_computation.value = True

    def finish(self):
        if self.state == State.STOPPED:
            self._total_iterations.value = self._finished_iterations.value
            self.save_metadata()

    def stop(self):
        self.state = State.STOPPED
        if self.process is not None:
            self.process.join()
        self.saved_time = datetime.datetime.now()
        self.save_metadata()

    def had_error(self):
        return self._had_error.value

    def is_running(self):
        return self._is_running.value

    def finished_subtasks(self):
        return self._finished_subtasks.value

    def total_subtasks(self):
        return self._total_subtasks.value

    def finished_iterations_and_update_time(self):
        with self._finished_iterations.get_lock():
            with self._iteration_update_time.get_lock():
                return self._finished_iterations.value, self._iteration_update_time.value

    @staticmethod
    def _run(task_dir, class_name, preset, preset_pipe, wakeup_sem, finished_subtasks, total_subtasks, finished_iterations, iteration_update_time, total_iterations, pause_computation, save_now, save_dir, is_running, had_error):

        logger = Logger(save_dir, "main")
        try:
            sys.path.append(str(task_dir))
            os.chdir(str(task_dir))
            task_class = getattr(importlib.import_module(class_name), class_name)

            total_subtasks.value = task_class.number_of_subtasks(preset)
            original_save_dir = save_dir

            for subtask in range(finished_subtasks.value, total_subtasks.value):
                if total_subtasks.value > 1:
                    save_dir = original_save_dir / Path(str(task_class.subtask_name(subtask, preset)))

                logger = Logger(save_dir, "main")
                preset.set_logger(logger.get_with_module('config'))
                preset.iteration_cursor = finished_iterations.value

                task = task_class(preset, preset_pipe, logger.get_with_module('task'), subtask)

                def save_func():
                    task.save(save_dir)
                    with open(str(original_save_dir / Path("metadata.pk")), 'rb') as handle:
                        data = pickle.load(handle)

                    with open(str(original_save_dir / Path("metadata.pk")), 'wb') as handle:
                        data['saved_time'] = datetime.datetime.now()
                        data['finished_iterations'] = finished_iterations.value
                        data['finished_subtasks'] = finished_subtasks.value
                        pickle.dump(data, handle)

                if finished_iterations.value > 0:
                    task.load(save_dir)
                task.run(finished_iterations, iteration_update_time, total_iterations, pause_computation, save_now, save_dir, save_func)

                if total_subtasks.value > 1 and finished_iterations.value >= total_iterations.value:
                    finished_subtasks.value += 1
                    if finished_subtasks.value < total_subtasks.value:
                        finished_iterations.value = 0

                save_func()

                if pause_computation.value:
                    break

        except:
            logger.log(traceback.format_exc(), logging.ERROR)
            had_error.value = True

        is_running.value = False
        wakeup_sem.release()

    def build_save_dir(self):
        return self.project.result_dir / Path(self.code_version) / Path(self.preset.name) / Path(str(self.try_number))

    def save_metadata(self):
        data = {}
        data['uuid'] = str(self.uuid)
        data['finished_iterations'] = self._finished_iterations.value
        data['finished_subtasks'] = self._finished_subtasks.value
        data['total_iterations'] = self._total_iterations.value
        data['try_number'] = self.try_number
        data['creation_time'] = self.creation_time
        data['saved_time'] = self.saved_time
        data['had_error'] = self._had_error.value
        data['preset'] = self.preset.data
        data['original_preset_uuid'] = self.original_preset_uuid
        data['code_version'] = self.code_version
        path = self.build_save_dir()
        path.mkdir(parents=True, exist_ok=True)
        with open(str(path / Path("metadata.pk")), 'wb') as handle:
            pickle.dump(data, handle)

    def load_metadata(self, path):
        with open(str(path / Path("metadata.pk")), 'rb') as handle   :
            data = pickle.load(handle)
            self.uuid = uuid.UUID(data['uuid'])
            self.preset = self.project.configuration.add_preset(data['preset'], None)
            self._finished_iterations.value = data['finished_iterations']
            self._finished_subtasks.value = data['finished_subtasks']
            self._total_iterations.value = data['total_iterations']
            self.try_number = data['try_number']
            self.creation_time = data['creation_time']
            self.saved_time = data['saved_time']
            self.original_preset_uuid = data['original_preset_uuid']
            self._had_error.value = data['had_error']
            self.code_version = data['code_version']

    def total_iterations(self):
        return self._total_iterations.value

    def set_total_iterations(self, total_iterations):
        with self._finished_iterations.get_lock():
            with self._total_iterations.get_lock():
                if total_iterations > self._finished_iterations.value + (1 if self.state == State.RUNNING else 0):
                    self._total_iterations.value = total_iterations

    def remove_data(self):
        save_dir = self.build_save_dir()
        shutil.rmtree(save_dir)

    def adjust_config(self, new_config):
        with self._finished_iterations.get_lock():
            new_config = self.preset.diff_config(new_config, False, self._finished_iterations.value + 1)
            self.preset.set_config_at_timestep(new_config, self._finished_iterations.value + 1)
            self.preset_pipe_send.send(self.preset.clone())

    def __str__(self):
        return self.project.name + ": " + self.preset.name + " (try " + str(self.try_number) + ")"

    def save_now(self):
        if self.state == State.RUNNING:
            self._save_now.value = True
