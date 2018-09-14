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
        if 'iterate' in preset.config.configBlocks:
            total_number_of_subtasks = 1
            flattened_data = preset.config.configBlocks['iterate'].flatten()
            for key in flattened_data:
                if type(flattened_data[key]) is list:
                    total_number_of_subtasks *= len(flattened_data[key])

            def preset_generator():
                for i in range(total_number_of_subtasks):
                    new_preset = preset.clone()
                    data = new_preset.data
                    flattened_data = new_preset.config.configBlocks['iterate'].flatten()

                    number_of_subtasks = 1
                    name = ""
                    for key in flattened_data:
                        if type(flattened_data[key]) is list:
                            item = int((i % (len(flattened_data[key]) * number_of_subtasks)) / number_of_subtasks)
                            number_of_subtasks *= len(flattened_data[key])
                            name += key + ": " + str(flattened_data[key][item]) + " - "
                            data.update()

                            data_block = data['config']
                            key_list = key.split('/')
                            for single_key in key_list[:-1]:
                                if single_key in data_block:
                                    data_block = data_block[single_key]
                                else:
                                    data_block[single_key] = {}
                            data_block[key_list[-1]] = flattened_data[key][item]

                    if name.endswith(" - "):
                        name = name[:-3]

                    del(data['config']["iterate"])
                    new_preset.set_data(data)
                    yield name, new_preset
            return preset_generator(), total_number_of_subtasks
        else:
            return None, 0

    def run(self, finished_iterations, iteration_update_time, total_iterations, pause_computation, save_now, result_dir, save_func):
        tensorboard_writer = tf.summary.FileWriter(str(result_dir))
        save_interval = self.preset.get_int('save_interval')

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

            if save_now.value or (save_interval > 0 and finished_iterations.value % save_interval == 0):
                if save_now.value:
                    self.logger.log("Doing a manual save after " + str(finished_iterations.value) + " iterations")
                else:
                    self.logger.log("Auto-Saving after " + str(finished_iterations.value) + " iterations")
                save_now.value = False
                save_func()
                tensorboard_writer.flush()

        tensorboard_writer.flush()

    def step(self, tensorboard_writer, current_iteration):
        raise NotImplementedError()

    def save(self, path):
        raise NotImplementedError()


