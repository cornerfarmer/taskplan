from taskplan.EventManager import EventType


class ProjectManager:

    def __init__(self, projects, event_manager):
        self.projects = projects
        self.event_manager = event_manager

    def create_task(self, project_name, choices, config, total_iterations, is_test=False):
        project = self.project_by_name(project_name)
        task = project.create_task(choices, config, total_iterations, is_test)
        return task

    def project_by_name(self, project_name):
        for project in self.projects:
            if project.name == project_name:
                return project

        raise LookupError("No project with name " + project_name)

    def update_new_client(self, client):
        for project in self.projects:
            self.event_manager.throw_for_client(client, EventType.PROJECT_CHANGED, project)

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