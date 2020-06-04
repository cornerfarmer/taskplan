import tensorflow as tf

class Metric:
    def __init__(self, prefix):
        self.prefix = prefix
        self.loss = tf.keras.metrics.Mean()
        self.acc = tf.keras.metrics.SparseCategoricalAccuracy()

    def update(self, loss, pred, label):
        self.loss(loss)
        self.acc(label, pred)

    def reset(self):
        self.loss.reset_states()
        self.acc.reset_states()

    def plot(self, current_iteration):
        tf.summary.scalar(self.prefix + 'loss', self.loss.result(), step=current_iteration)
        tf.summary.scalar(self.prefix + 'acc', self.acc.result(), step=current_iteration)