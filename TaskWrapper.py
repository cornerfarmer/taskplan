import pickle
from multiprocessing import Process, Value
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
    def __init__(self, task_dir, class_name, preset, project, total_iterations, try_number):
        self.task_dir = task_dir
        self.class_name = class_name
        self.preset = preset
        self.process = None
        self.state = State.INIT
        self.uuid = uuid.uuid4()
        self.project = project
        self._finished_iterations = Value('i', 0)
        self._pause_computation = Value('b', False)
        self._iteration_update_time = Value('d', 0.0)
        self.start_time = None
        self.creation_time = datetime.datetime.now()
        self.saved_time = None
        self._total_iterations = Value('i', total_iterations)
        self.try_number = try_number
        self._is_running = Value('b', False)
        self._had_error = Value('b', False)
        self.queue_index = 0

    def start(self, wakeup_sem):
        sys.stdout.flush()
        self._pause_computation.value = False
        self._is_running.value = True
        self._had_error.value = False
        self.process = Process(target=TaskWrapper._run, args=(self.task_dir, self.class_name, self.preset.clone(), wakeup_sem, self._finished_iterations, self._iteration_update_time, self._total_iterations, self._pause_computation, self.build_save_dir(), self._is_running, self._had_error))
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

    def finished_iterations_and_update_time(self):
        with self._finished_iterations.get_lock():
            with self._iteration_update_time.get_lock():
                return self._finished_iterations.value, self._iteration_update_time.value

    @staticmethod
    def _run(task_dir, class_name, preset, wakeup_sem, finished_iterations, iteration_update_time, total_iterations, pause_computation, save_dir, is_running, had_error):
        logger = Logger(save_dir, "main")
        preset.set_logger(logger.get_with_module('config'))

        try:
            sys.path.append(str(task_dir))
            os.chdir(str(task_dir))
            task_class = getattr(importlib.import_module(class_name), class_name)
            task = task_class(preset, logger.get_with_module('task'))

            def save_func():
                task.save(save_dir)
                with open(str(save_dir / Path("metadata.pk")), 'rb') as handle:
                    data = pickle.load(handle)

                with open(str(save_dir / Path("metadata.pk")), 'wb') as handle:
                    data['saved_time'] = datetime.datetime.now()
                    data['finished_iterations'] = finished_iterations.value
                    pickle.dump(data, handle)

            if finished_iterations.value > 0:
                task.load(save_dir)
            task.run(finished_iterations, iteration_update_time, total_iterations, pause_computation, save_dir, save_func)
            save_func()
        except:
            logger.log(traceback.format_exc(), logging.ERROR)
            had_error.value = True

        is_running.value = False
        wakeup_sem.release()

    def build_save_dir(self):
        return self.project.result_dir / Path(self.preset.name + " (try " + str(self.try_number) + ")")

    def save_metadata(self):
        data = {}
        data['uuid'] = str(self.uuid)
        data['preset_uuid'] = str(self.preset.uuid)
        data['finished_iterations'] = self._finished_iterations.value
        data['total_iterations'] = self._total_iterations.value
        data['try_number'] = self.try_number
        data['creation_time'] = self.creation_time
        data['saved_time'] = self.saved_time
        data['had_error'] = self._had_error.value
        path = self.build_save_dir()
        path.mkdir(parents=True, exist_ok=True)
        with open(str(path / Path("metadata.pk")), 'wb') as handle:
            pickle.dump(data, handle)

    def load_metadata(self, path):
        with open(str(path / Path("metadata.pk")), 'rb') as handle   :
            data = pickle.load(handle)
            self.uuid = uuid.UUID(data['uuid'])
            self.preset = self.project.configuration.presets_by_uuid[data['preset_uuid']]
            self._finished_iterations.value = data['finished_iterations']
            self._total_iterations.value = data['total_iterations']
            self.try_number = data['try_number']
            self.creation_time = data['creation_time']
            self.saved_time = data['saved_time']
            self._had_error.value = data['had_error']

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

    def __str__(self):
        return self.project.name + ": " + self.preset.name + " (try " + str(self.try_number) + ")"