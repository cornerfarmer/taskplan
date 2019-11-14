import json

from taskplan.EventManager import EventType
from taskplan.Project import Project

try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path

class ProjectManager:

    def __init__(self, event_manager):
        self.projects = []
        self.event_manager = event_manager

    def load_projects(self, global_config, load_saved_tasks=True):
        if Path("taskplan_metadata.json").exists():
            with open('taskplan_metadata.json') as f:
                metadata = json.load(f)
        else:
            metadata = {}

        project_keys = global_config.get_keys('projects')
        for key in project_keys:
            if key != "default":
                config_prefix = "projects/" + key + "/"
                fallback_prefix = "projects/default/"

                if key in metadata:
                    project_metadata = metadata[key]
                else:
                    project_metadata = None

                self.projects.append(Project(
                    project_metadata,
                    key,
                    global_config.get_string(config_prefix + "task_dir", fallback_prefix + "task_dir"),
                    global_config.get_string(config_prefix + "task_class_name", fallback_prefix + "task_class_name"),
                    global_config.get_string(config_prefix + "name", fallback_prefix + "name"),
                    global_config.get_string(config_prefix + "tasks_dir", fallback_prefix + "tasks_dir"),
                    global_config.get_string(config_prefix + "config_dir", fallback_prefix + "config_dir"),
                    global_config.get_string(config_prefix + "config_file_name", fallback_prefix + "config_file_name"),
                    global_config.get_bool(config_prefix + "use_project_subfolder", fallback_prefix + "use_project_subfolder"),
                    load_saved_tasks=load_saved_tasks
                ))

        self.save_metadata()

    def save_metadata(self):
        metadata = {}
        for project in self.projects:
            metadata[project.key] = project.save_metadata()
        with open('taskplan_metadata.json', "w") as f:
            json.dump(metadata, f)

    def create_task(self, project_name, params, config, total_iterations, is_test=False):
        project = self.project_by_name(project_name)
        task, removed_tasks = project.create_task(params, config, total_iterations, is_test)
        for removed_task in removed_tasks:
            self.event_manager.throw(EventType.TASK_REMOVED, removed_task)
        return task

    def project_by_name(self, project_name):
        for project in self.projects:
            if project.name == project_name:
                return project

        raise LookupError("No project with name " + project_name)

    def update_new_client(self, client):
        for project in self.projects:
            self.event_manager.throw_for_client(client, EventType.PROJECT_CHANGED, project)

            for code_version in project.code_versions:
                self.event_manager.throw_for_client(client, EventType.CODE_VERSION_CHANGED, code_version, project)

            for param in project.configuration.get_params():
                self.event_manager.throw_for_client(client, EventType.PARAM_CHANGED, param, project)

            for param_value in project.configuration.get_param_values():
                self.event_manager.throw_for_client(client, EventType.PARAM_VALUE_CHANGED, param_value, project)

            for task in project.tasks:
                self.event_manager.throw_for_client(client, EventType.TASK_CHANGED, task, project)

    def update_clients(self):
        pass

    def find_task_by_uuid(self, uuid):
        for project in self.projects:
            task = project.find_task_by_uuid(uuid)
            if task is not None:
                return task
        return None

    def remove_task(self, task_uuid):
        task = self.find_task_by_uuid(task_uuid)
        task.project.remove_task(task)
        self.event_manager.throw(EventType.TASK_REMOVED, task)

    def remove_param(self, project_name, param_uuid):
        project = self.project_by_name(project_name)
        param = project.remove_param(param_uuid)
        if param is not None:
            self.event_manager.throw(EventType.PARAM_REMOVED, param, project)

    def remove_param_value(self, project_name, param_value_uuid):
        project = self.project_by_name(project_name)
        param_value, param = project.remove_param_value(param_value_uuid)
        if param_value is not None:
            self.event_manager.throw(EventType.PARAM_VALUE_REMOVED, param_value, project)
            self.event_manager.throw(EventType.PARAM_CHANGED, param, project)