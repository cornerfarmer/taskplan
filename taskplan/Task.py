import datetime

from taskplan.TaskWrapper import PipeMsg

try:
    import tensorflow as tf
except ImportError:
    tf = None

from datetime import datetime
import time

class Task(object):

    def __init__(self, preset, logger, metadata):
        self.preset = preset
        self.logger = logger
        self.finished_iterations = metadata["finished_iterations"]
        self.total_iterations = metadata["total_iterations"]
        self.pipe = metadata["pipe"]
        self.task_dir = metadata["task_dir"]
        self.iteration_update_time = 0
        self.pause_computation = False
        self.save_now = False

    def load(self, path):
        raise NotImplementedError()

    def _create_tensorboard_writer(self, task_dir):
        if tf is not None: 
            return tf.summary.FileWriter(task_dir)
        else:
            return None

    def _flush_tensorboard_writer(self, tensorboard_writer):
        if tensorboard_writer is not None:
            tensorboard_writer.flush()

    def receive_updates(self):
        update_available = self.pipe.poll(0)
        while update_available:
            msg_type, arg = self.pipe.recv()

            if msg_type == PipeMsg.PRESET_CHANGED:
                arg.set_logger(self.preset.logger, self.preset.printed_settings)
                self.preset = arg
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

            update_available = self.pipe.poll(0)
  
    def run(self, save_func, checkpoint_func):
        tensorboard_writer = self._create_tensorboard_writer(str(self.task_dir))
        save_interval = self.preset.get_int('save_interval')
        checkpoint_interval = self.preset.get_int('checkpoint_interval')

        while self.finished_iterations < self.total_iterations:
            self.receive_updates()

            self.preset.iteration_cursor = self.finished_iterations
            self.step(tensorboard_writer, self.finished_iterations)

            self.finished_iterations = self.finished_iterations + 1
            self.iteration_update_time = time.mktime(datetime.now().timetuple())
            self.pipe.send(PipeMsg.FINISHED_ITERATIONS, {"finished_iterations": self.finished_iterations, "iteration_update_time": self.iteration_update_time})

            if self.pause_computation:
                break

            if self.save_now or (save_interval > 0 and self.finished_iterations % save_interval == 0) or (checkpoint_interval > 0 and self.finished_iterations % checkpoint_interval == 0):
                if self.save_now:
                    self.logger.log("Doing a manual save after " + str(self.finished_iterations) + " iterations")
                else:
                    self.logger.log("Auto-Saving after " + str(self.finished_iterations) + " iterations")

                save_func(self.finished_iterations)
                self._flush_tensorboard_writer(tensorboard_writer)

                if checkpoint_interval > 0 and self.finished_iterations % checkpoint_interval == 0:
                    checkpoint_func(self.finished_iterations)

                self.save_now = False
                self.pipe.send(PipeMsg.SAVING, False)

        self._flush_tensorboard_writer(tensorboard_writer)

    def step(self, tensorboard_writer, current_iteration):
        raise NotImplementedError()

    def save(self, path):
        raise NotImplementedError()


