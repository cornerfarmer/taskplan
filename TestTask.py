from TaskInterface import TaskInterface
import tensorflow

class TestTask(TaskInterface):

    def __init__(self):
        pass

    def run(self, preset, logger):
        print("TestTask", preset.get_int("test"))
