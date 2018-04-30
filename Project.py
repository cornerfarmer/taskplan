from TaskWrapper import TaskWrapper
from config.Configuration import Configuration

class Project:

    def __init__(self, task_dir, task_class_name, result_dir = "results", config_dir = "config"):
        self.task_dir = task_dir
        self.task_class_name = task_class_name
        self.configuration = Configuration(config_dir)
        self.name = task_class_name

    def create_task(self, preset_uuid):
        if preset_uuid in self.configuration.presets_by_uuid:
            preset = self.configuration.presets_by_uuid[preset_uuid]
        else:
            raise LookupError("No preset with uuid " + preset_uuid)

        task = TaskWrapper(self.task_dir, self.task_class_name, preset, self)

        return task

    def possible_presets(self):
        return [preset for preset in self.configuration.presets if not preset.abstract]

