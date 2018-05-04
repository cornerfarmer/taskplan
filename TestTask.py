import pickle
from pathlib import Path

from Task import Task
import tensorflow
import time

class TestTask(Task):

    def __init__(self, preset, logger):
        super().__init__(preset, logger)
        self.sum = 0

    def save(self, path):
        with open(path / Path("model.pk"), 'wb') as handle:
            pickle.dump(self.sum, handle)

    def step(self):
        time.sleep(0.2)
        self.sum += 1

    def load(self, path):
        with open(path / Path("model.pk"), 'rb') as handle:
            self.sum = pickle.load(handle)

