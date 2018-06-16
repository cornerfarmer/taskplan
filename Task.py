import datetime
import tensorflow as tf

class Task:

    def __init__(self, preset, logger, subtask):
        self.preset = preset
        self.logger = logger
        self.subtask = subtask
        self.preset.iteration_cursor = 0

        if 'iterate' in preset.config.configBlocks:
            number_of_subtasks = 1

            data = preset.data
            flattened_data = preset.config.configBlocks['iterate'].flatten()
            for key in flattened_data:
                if type(flattened_data[key]) is list:
                    item = int((self.subtask % (len(flattened_data[key]) * number_of_subtasks)) / number_of_subtasks)
                    number_of_subtasks *= len(flattened_data[key])
                    data.update()

                    data_block = data['config']
                    key_list = key.split('/')
                    for single_key in key_list[:-1]:
                        if single_key in data_block:
                            data_block = data_block[single_key]
                        else:
                            data_block[single_key] = {}
                    data_block[key_list[-1]] = flattened_data[key][item]

            preset.set_data(data)


    def load(self, path):
        raise NotImplementedError()

    @staticmethod
    def number_of_subtasks(preset):
        if 'iterate' in preset.config.configBlocks:
            number_of_subtasks = 1
            flattened_data = preset.config.configBlocks['iterate'].flatten()
            for key in flattened_data:
                if type(flattened_data[key]) is list:
                    number_of_subtasks *= len(flattened_data[key])

            return number_of_subtasks
        else:
            return 1

    @staticmethod
    def subtask_name(subtask, preset):
        number_of_subtasks = 1
        flattened_data = preset.config.configBlocks['iterate'].flatten()
        name = ""

        for key in flattened_data:
            if type(flattened_data[key]) is list:
                item = int((subtask % (len(flattened_data[key]) * number_of_subtasks)) / number_of_subtasks)
                number_of_subtasks *= len(flattened_data[key])
                name += key + ": " + str(flattened_data[key][item]) + " - "

        if name.endswith(" - "):
            name = name[:-3]

        return name

    def run(self, finished_iterations, iteration_update_time, total_iterations, pause_computation, result_dir, save_func):
        tensorboard_writer = tf.summary.FileWriter(str(result_dir))
        try:
            save_interval = self.preset.get_int('save_interval')
        except:
            save_interval = 0

        while finished_iterations.value < total_iterations.value:
            self.preset.iteration_cursor = finished_iterations.value
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


