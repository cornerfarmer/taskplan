import tensorflow as tf
from src.Metric import Metric

class Trainer:

    def __init__(self, config, model, data):
        self.config = config
        self.data = data
        self.model = model

        self.optimizer = tf.keras.optimizers.Adam()

        self.train_metric = Metric("train/")
        self.val_metric = Metric("val/")

        self.loss = tf.keras.losses.SparseCategoricalCrossentropy()

        self.train_dataset = self.data.build_train_dataset()
        self.val_dataset = self.data.build_val_dataset()
        self.train_iter = iter(self.train_dataset)
        self.val_iter = iter(self.val_dataset)

    def _calc_loss(self, pred, label):
        return self.loss(label, pred)

    @tf.function
    def _train_step(self, data):
        images, labels = data

        with tf.GradientTape() as tape:
            pred = self.model(images)
            loss = self._calc_loss(pred, labels)

        gradients = tape.gradient(loss, self.model.trainable_variables)
        self.optimizer.apply_gradients(zip(gradients, self.model.trainable_variables))

        self.train_metric.update(loss, pred, labels)

    @tf.function
    def _val_step(self, data):
        images, labels = data

        pred = self.model(images)
        loss = self._calc_loss(pred, labels)

        self.val_metric.update(loss, pred, labels)

    def _train(self, steps):
        for i in range(steps):
            try:
                data = next(self.train_iter)
            except StopIteration:
                self.train_iter = iter(self.train_dataset)
                data = next(self.train_iter)

            self._train_step(data)

    def _val(self, steps):
        for i in range(steps):
            try:
                data = next(self.val_iter)
            except StopIteration:
                self.val_iter = iter(self.val_dataset)
                data = next(self.val_iter)

            self._val_step(data)


    def step(self, current_iteration):
        self.train_metric.reset()
        self.val_metric.reset()

        self._train(100)
        self._val(10)

        self.train_metric.plot(current_iteration)
        self.val_metric.plot(current_iteration)

        return self.val_metric.acc.result()
