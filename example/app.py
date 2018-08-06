import taskplan

def create_app():
    return taskplan.run([
        taskplan.Project(".", "TestTask", use_project_subfolder=True),
        taskplan.Project(".", "MnistFashionTask", use_project_subfolder=True)
    ], 1)