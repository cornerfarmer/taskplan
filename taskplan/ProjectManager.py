from taskplan.EventManager import EventType


class ProjectManager:

    def __init__(self, projects, event_manager):
        self.projects = projects
        self.event_manager = event_manager

    def create_task(self, project_name, preset_uuid, total_iterations):
        project = self.project_by_name(project_name)
        task = project.create_task(preset_uuid, total_iterations)
        self.event_manager.throw(EventType.PRESET_CHANGED, project.configuration.presets_by_uuid[preset_uuid], project)
        return task

    def project_by_name(self, project_name):
        for project in self.projects:
            if project.name == project_name:
                return project

        raise LookupError("No project with name " + project_name)

    def update_new_client(self, client):
        for project in self.projects:
            self.event_manager.throw_for_client(client, EventType.PROJECT_CHANGED, project)

            for preset in project.configuration.presets:
                self.event_manager.throw_for_client(client, EventType.PRESET_CHANGED, preset, project)

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

    def remove_task(self, task):
        task.project.remove_task(task)
        self.event_manager.throw(EventType.TASK_REMOVED, task)