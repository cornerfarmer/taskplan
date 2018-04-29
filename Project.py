from TaskWrapper import TaskWrapper
from config.Configuration import Configuration

class Project:

    def __init__(self, task_dir, task_class_name, result_dir = "results", config_dir = "config"):
        self.task_dir = task_dir
        self.task_class_name = task_class_name
        self.configuration = Configuration(config_dir)
        self.name = task_class_name

    def create_task(self, preset_name):
        if preset_name in self.configuration.presets_by_name:
            preset = self.configuration.presets_by_name[preset_name]
        else:
            raise LookupError("No preset with name " + preset_name)

        task = TaskWrapper(self.task_dir, self.task_class_name, preset, self)

        return task

    def possible_presets(self):
        return [preset for preset in self.configuration.presets if not preset.abstract]