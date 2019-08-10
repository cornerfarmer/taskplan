from taskplan.Project import Project
from taskplan.EventManager import EventType
import json

try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path

class ProjectManager:

    def __init__(self, event_manager):
        self.projects = []
        self.event_manager = event_manager

    def load_projects(self, global_config):
        if Path("taskplan_metadata.json").exists():
            with open('taskplan_metadata.json') as f:
                metadata = json.load(f)

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
                    global_config.get_bool(config_prefix + "use_project_subfolder", fallback_prefix + "use_project_subfolder")
                ))

        self.save_metadata()

    def save_metadata(self):
        metadata = {}
        for project in self.projects:
            metadata[project.key] = project.save_metadata()
        with open('taskplan_metadata.json', "w") as f:
            json.dump(metadata, f)

    def create_task(self, project_name, choices, config, total_iterations, is_test=False):
        project = self.project_by_name(project_name)
        task, removed_tasks = project.create_task(choices, config, total_iterations, is_test)
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

            for preset in project.configuration.get_presets():
                self.event_manager.throw_for_client(client, EventType.PRESET_CHANGED, preset, project)

            for choice in project.configuration.get_choices():
                self.event_manager.throw_for_client(client, EventType.CHOICE_CHANGED, choice, project)

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

    def find_test_task_by_preset(self, project_name, preset_uuid):
        project = self.project_by_name(project_name)
        return project.find_test_task_by_preset(preset_uuid)

    def remove_task(self, task_uuid):
        task = self.find_task_by_uuid(task_uuid)
        task.project.remove_task(task)
        self.event_manager.throw(EventType.TASK_REMOVED, task)

    def remove_preset(self, project_name, preset_uuid):
        project = self.project_by_name(project_name)
        preset = project.remove_preset(preset_uuid)
        if preset is not None:
            self.event_manager.throw(EventType.PRESET_REMOVED, preset, project)

    def remove_choice(self, project_name, choice_uuid):
        project = self.project_by_name(project_name)
        choice, preset = project.remove_choice(choice_uuid)
        if choice is not None:
            self.event_manager.throw(EventType.CHOICE_REMOVED, choice, project)
            self.event_manager.throw(EventType.PRESET_CHANGED, preset, project)