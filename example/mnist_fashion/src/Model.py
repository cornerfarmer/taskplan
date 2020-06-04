import tensorflow as tf
from tensorflow.keras import Model as KerasModel

class Model(KerasModel):
    def __init__(self, config):
        super(Model, self).__init__()

        self.config = config

        layers = [tf.keras.layers.Flatten(input_shape=(28, 28))]
        for units in self.config.get_list("hidden_layers"):
            layers.append(tf.keras.layers.Dense(units, activation='relu'))
        layers.append(tf.keras.layers.Dense(10, activation='softmax'))

        self.seq = tf.keras.Sequential(layers)

    def call(self, x):
        return self.seq(x)