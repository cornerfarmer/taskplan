import taskplan

def create_app():
    return taskplan.run([taskplan.Project(".", "TestTask")], 1)