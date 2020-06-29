from pathlib import Path

import taskplan

from src.Model import Model
from src.Data import Data
import tensorflow as tf
import argparse

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('task_path')
args = parser.parse_args()

api = taskplan.Api()
task = api.load_task(args.task_path)

config = task.config
path = task.build_save_dir()

model = Model(config.get_with_prefix("model"))
model.load_weights(str(path / Path("model.h5py")))

data = Data(config.get_with_prefix("data"))

acc = tf.keras.metrics.SparseCategoricalAccuracy()
for data in data.build_test_dataset():
    images, labels = data

    pred = model(images)

    acc(labels, pred)

print("Acc: " + str(acc.result()))

tensorboard_writer = tf.summary.create_file_writer(str(path))
with tensorboard_writer.as_default():
    tf.summary.scalar('test/acc', acc.result(), step=task.finished_iterations)