import pickle
from pathlib import Path

from Task import Task
import tensorflow as tf
import time

class TestTask(Task):

    def __init__(self, preset, logger):
        super().__init__(preset, logger)
        self.sum = 0

    def save(self, path):
        with open(path / Path("model.pk"), 'wb') as handle:
            pickle.dump(self.sum, handle)

    def step(self, tensorboard_writer, current_iteration):
        time.sleep(1)
        self.sum += 1
        tensorboard_writer.add_summary(tf.Summary(value=[tf.Summary.Value(tag="sum", simple_value=self.sum)]), current_iteration)

    def load(self, path):
        with open(path / Path("model.pk"), 'rb') as handle:
            self.sum = pickle.load(handle)

