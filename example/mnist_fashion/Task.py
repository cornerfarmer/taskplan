import taskplan

try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path

from src.Trainer import Trainer
from src.Model import Model
from src.Data import Data

class Task(taskplan.Task):

    def __init__(self, config, logger, metadata):
        super(Task, self).__init__(config, logger, metadata)
        self.sum = 0

        self.model = Model(config.get_with_prefix("model"))
        self.data = Data(config.get_with_prefix("data"))
        self.trainer = Trainer(config.get_with_prefix("trainer"), self.model, self.data)

    def save(self, path):
        self.model.save_weights(str(path / Path("model.h5py")))

    def step(self, tensorboard_writer, current_iteration):
        with tensorboard_writer.as_default():
            self.trainer.step(current_iteration)

    def load(self, path):
        self.model.load_weights(str(path / Path("model.h5py")))

