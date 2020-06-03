import pickle
try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path

try:
    import tensorflow as tf

    gpus = tf.config.experimental.list_physical_devices('GPU')

    # Currently, memory growth needs to be the same across GPUs
    for gpu in gpus:
        tf.config.experimental.set_memory_growth(gpu, True)
except ImportError:
    tf = None

import time
import taskplan

class Task(taskplan.Task):

    def __init__(self, config, logger, metadata):
        super(Task, self).__init__(config, logger, metadata)
        self.sum = self.config.get_int('offset')

    def save(self, path):
        with open(str(path / Path("model.pk")), 'wb') as handle:
            pickle.dump(self.sum, handle)

    def step(self, tensorboard_writer, current_iteration):
        time.sleep(1)
        self.sum += self.config.get_int('step')
        self.logger.log("Current sum: " + str(self.sum) + " (Iteration " + str(current_iteration) + ")")
        #self.logger.log("Test: " + str(self.config.get_list("test_list")[0]))

        if tensorboard_writer is not None:
            with tensorboard_writer.as_default():
                tf.summary.scalar("sum", self.sum, step=current_iteration)
            #tensorboard_writer.add_scalar('sum', self.sum, current_iteration)

    def load(self, path):
        with open(str(path / Path("model.pk")), 'rb') as handle:
            self.sum = pickle.load(handle)

    def start(self):
        self.logger.log("Starting task")

    def stop(self):
        self.logger.log("Stopping task")
