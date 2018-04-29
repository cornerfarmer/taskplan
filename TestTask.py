from TaskInterface import TaskInterface
import tensorflow
import time

class TestTask(TaskInterface):

    def __init__(self):
        pass

    def run(self, preset, logger, finished_iterations):
        for i in range(preset.get_int("iterations")):
            time.sleep(1)
            finished_iterations.value = i
