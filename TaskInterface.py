class TaskInterface:

    def run(self, preset, logger, iteration, total_iterations):
        raise NotImplementedError()


