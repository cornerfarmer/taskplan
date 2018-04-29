class ProjectManager:

    def __init__(self, projects):
        self.projects = projects

    def create_task(self, project_name, preset_name):
        return self.project_by_name(project_name).create_task(preset_name)

    def project_by_name(self, project_name):
        for project in self.projects:
            if project.name == project_name:
                return project

        raise LookupError("No project with name " + project_name)

