class Task:

    def __init__(self, preset, logger):
        self.preset = preset
        self.logger = logger

    def load(self, path):
        raise NotImplementedError()

    def run(self, finished_iterations, total_iterations, pause_computation):
        for i in range(finished_iterations.value, total_iterations):
            self.step()
            finished_iterations.value = i + 1
            if pause_computation.value:
                break

    def step(self):
        raise NotImplementedError()

    def save(self, path):
        raise NotImplementedError()


