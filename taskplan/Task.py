import datetime
import tensorflow as tf
from datetime import datetime
import time

class Task(object):

    def __init__(self, preset, preset_pipe, logger):
        self.preset = preset
        self.preset_pipe = preset_pipe
        self.logger = logger

    def load(self, path):
        raise NotImplementedError()

    @staticmethod
    def subtasks(preset):
        return None, 0

    def _create_tensorboard_writer(self, result_dir):
        return tf.summary.FileWriter(result_dir)

    def _flush_tensorboard_writer(self, tensorboard_writer):
        tensorboard_writer.flush()

    def run(self, finished_iterations, iteration_update_time, total_iterations, pause_computation, save_now, result_dir, save_func, checkpoint_func):
        self.result_dir = result_dir
        tensorboard_writer = self._create_tensorboard_writer(str(result_dir))
        save_interval = self.preset.get_int('save_interval')
        checkpoint_interval = self.preset.get_int('checkpoint_interval')

        while finished_iterations.value < total_iterations.value:
            preset_available = self.preset_pipe.poll(0)
            while preset_available:
                new_preset = self.preset_pipe.recv()
                new_preset.set_logger(self.preset.logger, self.preset.printed_settings)
                self.preset = new_preset
                preset_available = self.preset_pipe.poll(0)

            self.preset.iteration_cursor = finished_iterations.value
            self.step(tensorboard_writer, finished_iterations.value)

            with finished_iterations.get_lock():
                with iteration_update_time.get_lock():
                    finished_iterations.value = finished_iterations.value + 1
                    iteration_update_time.value = time.mktime(datetime.now().timetuple())

            if pause_computation.value:
                break

            if save_now.value or (save_interval > 0 and finished_iterations.value % save_interval == 0) or (checkpoint_interval > 0 and finished_iterations.value % checkpoint_interval == 0):
                if save_now.value:
                    self.logger.log("Doing a manual save after " + str(finished_iterations.value) + " iterations")
                else:
                    self.logger.log("Auto-Saving after " + str(finished_iterations.value) + " iterations")
                save_now.value = False
                save_func()
                self._flush_tensorboard_writer(tensorboard_writer)

                if checkpoint_interval > 0 and finished_iterations.value % checkpoint_interval == 0:
                    checkpoint_func()

        self._flush_tensorboard_writer(tensorboard_writer)

    def step(self, tensorboard_writer, current_iteration):
        raise NotImplementedError()

    def save(self, path):
        raise NotImplementedError()


