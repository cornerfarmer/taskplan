
from taskplan.Project import Project

from taskplan.EventManager import EventManager

try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path
import json
from taskconf.config.Configuration import Configuration

class Api:
    def __init__(self, taskplan_config="taskplan.json"):
        if Path("taskplan_metadata.json").exists():
            with open('taskplan_metadata.json') as f:
                metadata = json.load(f)
        else:
            metadata = {"project": {}, "scheduler": {}}

        self.project = Project.create_from_config_file(EventManager(), metadata["project"], taskplan_config, tasks_to_load=[], slim_mode=True)

    def load_task(self, task_path):
        task = self.project._load_saved_task(Path(task_path), task_path.startswith("tests"))
        self.project.configuration.renew_task_config(task)
        return task

    def load_config(self, project_name, config_uuid):
        project = self.project.project_by_name(project_name)
        return project.configuration.configs_by_uuid[config_uuid]

    def build_config(self, data, data_has_metadata=False):
        if not data_has_metadata:
            data = {"config": data}

        base_configs = []
        for param in self.project.configuration.get_params():
            if param.has_metadata("deprecated_param_value"):
                for param_value in self.project.configuration.get_param_values():
                    if param.get_metadata("deprecated_param_value") == str(param_value.uuid):
                        base_configs.append([param_value])
                        if param_value.has_metadata("template_deprecated"):
                            base_configs[-1] += param_value.get_metadata("template_deprecated")

        config = Configuration(data, base_configs)
        return config
