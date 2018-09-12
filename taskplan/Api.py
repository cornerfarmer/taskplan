from taskplan.EventManager import EventManager
from taskplan.Project import Project
from taskplan.Controller import Controller
from taskplan.ProjectManager import ProjectManager


class Api:
    def __init__(self):
        self.global_config = Controller.load_global_config()
        projects = Project.load_projects(self.global_config)
        self.project_manager = ProjectManager(projects, EventManager())

    def load_task(self, task_uuid):
        task = self.project_manager.find_task_by_uuid(task_uuid)

        return task.build_save_dir(), task.preset