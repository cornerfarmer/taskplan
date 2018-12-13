import sys

from taskplan.ConsoleUI import ConsoleUI
from taskplan.Controller import Controller
from taskplan.EventManager import EventManager
import click

@click.group()
@click.pass_context
def cli(ctx):
    ctx.obj = {}
    ctx.obj['event_manager'] = EventManager()
    ctx.obj['controller'] = Controller(ctx.obj['event_manager'])


@cli.command()
@click.pass_obj
def init(obj):
    pass


@cli.command()
@click.argument('project_name')
@click.argument('preset_uuid')
@click.argument('total_iterations', type=int)
@click.pass_obj
def start(obj, project_name, preset_uuid, total_iterations):
    controller = obj['controller']
    event_manager = obj['event_manager']

    try:
        controller.start()
        task = controller.start_new_task(project_name, preset_uuid, total_iterations)
        print("Starting preset \"" + task.preset.name + "\" (try " + str(task.try_number) + ") - " + str(task.uuid))

        console_ui = ConsoleUI(controller, event_manager, str(task.uuid))
        console_ui.run()
    finally:
        controller.stop()


@cli.command(name="continue")
@click.argument('task_uuid')
@click.argument('total_iterations', type=int, required=False)
@click.pass_obj
def continue_task(obj, task_uuid, total_iterations=0):
    controller = obj['controller']
    event_manager = obj['event_manager']

    try:
        controller.start()
        task = controller.continue_task(task_uuid, total_iterations)
        if task is not None:
            print("Continuing preset \"" + task.preset.name + "\" (try " + str(task.try_number) + ") - " + str(task.uuid))

            console_ui = ConsoleUI(controller, event_manager, str(task.uuid))
            console_ui.run()
        else:
            print("Task not found or already finished.")
    finally:
        controller.stop()

@cli.command(name="test")
@click.argument('project_name')
@click.argument('preset_uuid')
@click.argument('total_iterations', type=int)
@click.option('--load', is_flag=True)
@click.pass_obj
def test_task(obj, project_name, preset_uuid, total_iterations, load):
    controller = obj['controller']
    event_manager = obj['event_manager']

    try:
        controller.start()

        if not load:
            task = controller.start_new_task(project_name, preset_uuid, total_iterations, is_test=True)
        else:
            task = controller.continue_test_task(project_name, preset_uuid, total_iterations)

        if task is not None:
            print("Testing preset \"" + task.preset.name + "\" - " + str(task.uuid))
            console_ui = ConsoleUI(controller, event_manager, str(task.uuid))
            console_ui.run()
        else:
            print("Task not found or already finished.")
    finally:
        controller.stop()

@cli.command(name="add_version")
@click.argument('project_name')
@click.argument('version_name')
@click.pass_obj
def add_version(obj, project_name, version_name):
    controller = obj['controller']

    controller.add_version(project_name, version_name)
    controller.stop()

if __name__ == '__main__':
    cli()
