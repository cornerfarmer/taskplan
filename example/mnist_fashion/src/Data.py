import tensorflow as tf

class Data:

    def __init__(self, config):
        self.config = config
        self.fashion_mnist = tf.keras.datasets.fashion_mnist
        (self.train_images, self.train_labels), (self.test_images, self.test_labels) = tf.keras.datasets.fashion_mnist.load_data()
        self.val_images = self.train_images[50000:]
        self.val_labels = self.train_labels[50000:]

        self.train_images = self.train_images[:50000]
        self.train_labels = self.train_labels[:50000]

        self.train_images = self.train_images / 255.0
        self.val_images = self.val_images / 255.0
        self.test_images = self.test_images / 255.0

    def _build_basic_dataset(self, images, labels):
        dataset = tf.data.Dataset.from_tensor_slices((images, labels))
        dataset = dataset.shuffle(10000)
        dataset = dataset.batch(self.config.get_int("batch_size"))
        return dataset

    def build_train_dataset(self):
        return self._build_basic_dataset(self.train_images, self.train_labels)

    def build_val_dataset(self):
        return self._build_basic_dataset(self.val_images, self.val_labels)

    def build_test_dataset(self):
        return self._build_basic_dataset(self.test_images, self.test_labels)