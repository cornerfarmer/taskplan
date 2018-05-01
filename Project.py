import os
from pathlib import Path
from TaskWrapper import TaskWrapper
from config.Configuration import Configuration

class Project:

    def __init__(self, task_dir, task_class_name, result_dir="results", config_dir="config"):
        self.task_dir = Path(task_dir)
        self.task_class_name = task_class_name
        self.configuration = Configuration(config_dir)
        self.name = task_class_name
        self.result_dir = Path(result_dir)
        self.tasks = []
        self._load_saved_tasks()

    def _load_saved_tasks(self):
        for path in self.result_dir.iterdir():
            if path.is_dir():
                self.tasks.append(TaskWrapper(self.task_dir, self.task_class_name, None, self, 0))
                self.tasks[-1].load_metadata(path)

    def create_task(self, preset_uuid):
        if preset_uuid in self.configuration.presets_by_uuid:
            preset = self.configuration.presets_by_uuid[preset_uuid]
        else:
            raise LookupError("No preset with uuid " + preset_uuid)

        task = TaskWrapper(self.task_dir, self.task_class_name, preset, self, 30)
        task.save_metadata()

        return task

    def possible_presets(self):
        return [preset for preset in self.configuration.presets if not preset.abstract]

