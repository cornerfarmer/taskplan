from taskplan.EventManager import EventManager
from taskplan.Project import Project
from taskplan.Controller import Controller
from taskplan.ProjectManager import ProjectManager
from taskconf.util.Logger import Logger
try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path
import json
from taskconf.config.Preset import Preset

class Api:
    def __init__(self):
        self.global_config = Controller.load_global_config()
        self.project_manager = ProjectManager(EventManager())
        self.project_manager.load_projects(self.global_config)

    def load_task(self, task_uuid):
        task = self.project_manager.find_task_by_uuid(task_uuid)
        return task.build_save_dir(), task.preset

    @staticmethod
    def load_task_from_folder(path):
        with open(str(path / Path("metadata.json")), "r") as handle:
            data = json.load(handle)
            preset = Preset(data["preset"])
        return path, preset

    def load_preset(self, project_name, preset_uuid):
        project = self.project_manager.project_by_name(project_name)
        return project.configuration.presets_by_uuid[preset_uuid]

    def logger_for_task(self, task_uuid):
        task = self.project_manager.find_task_by_uuid(task_uuid)
        return Logger(task.build_save_dir(), "main")
