import datetime
import tensorflow as tf

class Task:

    def __init__(self, preset, logger):
        self.preset = preset
        self.logger = logger

    def load(self, path):
        raise NotImplementedError()

    def run(self, finished_iterations, iteration_update_time, total_iterations, pause_computation, result_dir, save_func):
        tensorboard_writer = tf.summary.FileWriter(str(result_dir))
        try:
            save_interval = self.preset.get_int('save_interval')
        except:
            save_interval = 0

        while finished_iterations.value < total_iterations.value:
            self.step(tensorboard_writer, finished_iterations.value)

            with finished_iterations.get_lock():
                with iteration_update_time.get_lock():
                    finished_iterations.value = finished_iterations.value + 1
                    iteration_update_time.value = datetime.datetime.now().timestamp()

            if save_interval > 0 and finished_iterations.value % save_interval == 0:
                save_func()
                tensorboard_writer.flush()
                self.logger.log("Auto-Saving after " + str(finished_iterations.value) + " iterations")

            if pause_computation.value:
                break

        tensorboard_writer.flush()

    def step(self, tensorboard_writer, current_iteration):
        raise NotImplementedError()

    def save(self, path):
        raise NotImplementedError()


