import taskplan

from src.Trainer import Trainer
from src.Model import Model
from src.Data import Data
import tensorflow as tf
import pickle

class Task(taskplan.Task):

    def __init__(self, config, logger, metadata):
        super(Task, self).__init__(config, logger, metadata)
        self.sum = 0

        self.model = Model(config.get_with_prefix("model"))
        self.data = Data(config.get_with_prefix("data"))
        self.trainer = Trainer(config.get_with_prefix("trainer"), self.model, self.data)
        self.best_val_acc = 0

    def save(self, path):
        self.model.save_weights(str(path / "model.h5py"))
        pickle.dump(self.best_val_acc, open(str(path / "best_model.pkl"), "wb"))

    def step(self, tensorboard_writer, current_iteration):
        with tensorboard_writer.as_default():
            val_acc = self.trainer.step(current_iteration)
            if val_acc > self.best_val_acc:
                self.best_val_acc = val_acc
                self.model.save_weights(str(self.task_dir / "model.h5py"))
            tf.summary.scalar('val/best_acc', self.best_val_acc, step=current_iteration)

    def load(self, path):
        self.model.load_weights(str(path / "model.h5py"))
        self.best_val_acc = pickle.load(open(str(path / "best_model.pkl"), "rb"))


