import datetime

from taskplan.TaskWrapper import PipeMsg

try:
    import tensorflow as tf
except ImportError:
    tf = None

try:
    import tensorboardX as tbX
except ImportError:
    tbX = None

from datetime import datetime
import time

class Task(object):

    def __init__(self, config, logger, metadata, use_tensorboardX=False):
        self.config = config
        self.logger = logger
        self.finished_iterations = metadata["finished_iterations"]
        self.total_iterations = metadata["total_iterations"]
        self.pipe = metadata["pipe"]
        self.task_dir = metadata["task_dir"]
        self.iteration_rate = None
        self.pause_computation = False
        self.save_now = False
        self.creating_checkpoint = False
        self.use_tensorboardX = use_tensorboardX

    def load(self, path):
        raise NotImplementedError()

    def _create_tensorboard_writer(self, task_dir):
        if self.use_tensorboardX:
            if tbX is not None:
                return tbX.SummaryWriter(task_dir)
            else:
                return None
        else:
            if tf is not None:
                if hasattr(tf.summary, "FileWriter"):
                    return tf.summary.FileWriter(task_dir)
                else:
                    return tf.summary.create_file_writer(task_dir)
            else:
                return None

    def _flush_tensorboard_writer(self, tensorboard_writer):
        if tensorboard_writer is not None:
            tensorboard_writer.flush()

    def receive_updates(self):
        update_available = self.pipe.poll(0)
        while update_available:
            msg_type, arg = self.pipe.recv()

            if msg_type == PipeMsg.CONFIG_CHANGED:
                printed_settings = self.config.config.printed_settings
                self.config = arg
                self.pipe.send(PipeMsg.CONFIG_CHANGED, self.config)
                self.config.set_logger(self.logger.get_with_module('config'), printed_settings)
            elif msg_type == PipeMsg.TOTAL_ITERATIONS:
                if self.finished_iterations + 1 <= arg:
                    self.total_iterations = arg
                    self.pipe.send(PipeMsg.TOTAL_ITERATIONS, self.total_iterations)
            elif msg_type == PipeMsg.PAUSING:
                self.pause_computation = arg
                self.pipe.send(PipeMsg.PAUSING, arg)
            elif msg_type == PipeMsg.SAVING:
                self.save_now = arg
                self.pipe.send(PipeMsg.SAVING, arg)
            elif msg_type == PipeMsg.CREATE_CHECKPOINT:
                self.creating_checkpoint = arg
                self.pipe.send(PipeMsg.CREATE_CHECKPOINT, arg)

            update_available = self.pipe.poll(0)

    def exp_moving_average(self, x, avg=None, alpha=0.3):
        return x if avg is None else (alpha * x) + (1 - alpha) * avg
  
    def run(self, save_func, checkpoint_func):
        tensorboard_writer = self._create_tensorboard_writer(str(self.task_dir))

        last_t = time.time()
        self.start()
        while self.finished_iterations < self.total_iterations:
            self.receive_updates()
            save_interval = self.config.get_int('save_interval')
            checkpoint_interval = self.config.get_int('checkpoint_interval')

            self.config.iteration_cursor = self.finished_iterations

            if self.finished_iterations == 0:
                self.before_first_iteration()

            self.step(tensorboard_writer, self.finished_iterations)

            self.finished_iterations = self.finished_iterations + 1
            self.iteration_rate = self.exp_moving_average((time.time() - last_t) / 1, self.iteration_rate)
            last_t = time.time()
            self.iteration_update_time = time.time()
            self.pipe.send(PipeMsg.FINISHED_ITERATIONS, {"finished_iterations": self.finished_iterations, "iteration_rate": self.iteration_rate, "iteration_update_time": self.iteration_update_time})

            if self.pause_computation:
                break

            if self.save_now or (save_interval > 0 and self.finished_iterations % save_interval == 0):
                if self.save_now:
                    self.logger.log("Doing a manual save after " + str(self.finished_iterations) + " iterations")
                else:
                    self.logger.log("Auto-Saving after " + str(self.finished_iterations) + " iterations")

                save_func(self.finished_iterations)
                self._flush_tensorboard_writer(tensorboard_writer)

                if self.save_now:
                    self.save_now = False
                    self.pipe.send(PipeMsg.SAVING, False)

            if self.creating_checkpoint or (checkpoint_interval > 0 and self.finished_iterations % checkpoint_interval == 0):
                self.logger.log("Creating checkpoint after " + str(self.finished_iterations) + " iterations")

                self._flush_tensorboard_writer(tensorboard_writer)
                checkpoint = checkpoint_func(self.finished_iterations)
                self.pipe.send(PipeMsg.NEW_CHECKPOINT, checkpoint)

                if self.creating_checkpoint:
                    self.creating_checkpoint = False
                    self.pipe.send(PipeMsg.CREATE_CHECKPOINT, False)

        self.stop()
        self._flush_tensorboard_writer(tensorboard_writer)

    def step(self, tensorboard_writer, current_iteration):
        raise NotImplementedError()

    def save(self, path):
        raise NotImplementedError()

    def start(self):
        pass

    def stop(self):
        pass

    def before_first_iteration(self):
        pass
