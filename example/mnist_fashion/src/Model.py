import tensorflow as tf
from tensorflow.keras import Model as KerasModel

class Model(KerasModel):
    def __init__(self, config):
        super(Model, self).__init__()

        self.config = config

        layers = [tf.keras.layers.Input((28, 28))]
        layers.append(tf.keras.layers.Lambda(lambda x: x[..., None]))
        conv_layers = self.config.get_list("conv_layers")
        for i, units in enumerate(conv_layers):
            layers.append(tf.keras.layers.Conv2D(units, self.config.get_int("kernel_size"), activation=self.config.get_string("activation_function")))
            if i != len(conv_layers) - 1:
                layers.append(tf.keras.layers.MaxPool2D())

        layers.append(tf.keras.layers.Flatten())
        for units in self.config.get_list("hidden_layers"):
            layers.append(tf.keras.layers.Dense(units, activation=self.config.get_string("activation_function")))
        layers.append(tf.keras.layers.Dense(10, activation='softmax'))

        self.seq = tf.keras.Sequential(layers)

    def call(self, x):
        return self.seq(x)