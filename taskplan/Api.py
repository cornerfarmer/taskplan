from taskconf.util.Logger import Logger

from taskplan.Controller import Controller
from taskplan.EventManager import EventManager
from taskplan.ProjectManager import ProjectManager

try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path
import json
from taskconf.config.Configuration import Configuration

class Api:
    def __init__(self):
        self.global_config = Controller.load_global_config()
        self.project_manager = ProjectManager(EventManager())
        self.project_manager.load_projects(self.global_config, load_saved_tasks=False)

    def load_task(self, project_name, task_path):
        project = self.project_manager.project_by_name(project_name)
        task = project._load_saved_task(Path(task_path))
        project.configuration.renew_task_config(task.config)
        return task.build_save_dir(), task.config

    @staticmethod
    def load_task_from_folder(path):
        with open(str(path / Path("metadata.json")), "r") as handle:
            data = json.load(handle)
            config = Configuration(data["config"])
        return path, config

    def load_config(self, project_name, config_uuid):
        project = self.project_manager.project_by_name(project_name)
        return project.configuration.configs_by_uuid[config_uuid]

    def logger_for_task(self, task_uuid):
        task = self.project_manager.find_task_by_uuid(task_uuid)
        return Logger(task.build_save_dir(), "main")

    def build_config(self, project_name, data, data_has_metadata=False):
        if not data_has_metadata:
            data = {"config": data}

        base_configs = []
        project = self.project_manager.project_by_name(project_name)
        for param in project.configuration.get_params():
            if param.has_metadata("deprecated_param_value"):
                for param_value in project.configuration.get_param_values():
                    if param.get_metadata("deprecated_param_value") == str(param_value.uuid):
                        base_configs.append([param_value])
                        if param_value.has_metadata("template_deprecated"):
                            base_configs[-1] += param_value.get_metadata("template_deprecated")

        config = Configuration(data, base_configs)
        return config