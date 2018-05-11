import datetime


class Task:

    def __init__(self, preset, logger):
        self.preset = preset
        self.logger = logger

    def load(self, path):
        raise NotImplementedError()

    def run(self, finished_iterations, iteration_update_time, total_iterations, pause_computation):
        while finished_iterations.value < total_iterations.value:
            self.step()

            with finished_iterations.get_lock():
                with iteration_update_time.get_lock():
                    finished_iterations.value = finished_iterations.value + 1
                    iteration_update_time.value = datetime.datetime.now().timestamp()

            if pause_computation.value:
                break

    def step(self):
        raise NotImplementedError()

    def save(self, path):
        raise NotImplementedError()


