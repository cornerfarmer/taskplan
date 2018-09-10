import taskplan

import tensorflow as tf
from tensorflow import keras
try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path
# Helper libraries
import numpy as np
import matplotlib.pyplot as plt

class MnistFashionTask(taskplan.Task):

    def __init__(self, preset, preset_pipe, logger):
        super(MnistFashionTask, self).__init__(preset, preset_pipe, logger)
        self.sum = 0
        self.fashion_mnist = keras.datasets.fashion_mnist
        (self.train_images, self.train_labels), (self.test_images, self.test_labels) = keras.datasets.fashion_mnist.load_data()

        self.train_images = self.train_images / 255.0

        self.test_images = self.test_images / 255.0

        layers = [keras.layers.Flatten(input_shape=(28, 28))]
        for units in self.preset.get_list("hidden_layers"):
            layers.append(keras.layers.Dense(units, activation=tf.nn.relu))
        layers.append(keras.layers.Dense(10, activation=tf.nn.softmax))
        self.model = keras.Sequential(layers)

        self.model.compile(optimizer=tf.train.AdamOptimizer(),
                      loss='sparse_categorical_crossentropy',
                      metrics=['accuracy'])

    def save(self, path):
        self.model.save_weights(str(path / Path("model.h5py")))

    def step(self, tensorboard_writer, current_iteration):
        history = self.model.fit(self.train_images, self.train_labels, epochs=1, verbose=False)
        tensorboard_writer.add_summary(tf.Summary(value=[
            tf.Summary.Value(tag="train/loss", simple_value=history.history['loss'][-1]),
            tf.Summary.Value(tag="train/acc", simple_value=history.history['acc'][-1])]),
        current_iteration)

        if current_iteration % self.preset.get_int("val_interval") == 0:
            test_loss, test_acc = self.model.evaluate(self.test_images, self.test_labels)

            tensorboard_writer.add_summary(tf.Summary(value=[tf.Summary.Value(tag="val/loss", simple_value=test_loss), tf.Summary.Value(tag="val/acc", simple_value=test_acc)]), current_iteration)

    def load(self, path):
        self.model.load_weights(str(path / Path("model.h5py")))

