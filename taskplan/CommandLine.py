import sys

from taskplan.ConsoleUI import ConsoleUI
from taskplan.Controller import Controller
from taskplan.EventManager import EventManager
import click

from taskplan.app import run

@click.group()
def cli():
    pass


def _start_controller():
    event_manager = EventManager()
    controller = Controller(event_manager)
    return event_manager, controller


@cli.command()
def init():
    _start_controller()


@cli.command()
def web():
    app = run()

    app.run(host='0.0.0.0', port='9999')


@cli.command()
@click.argument('project_name')
@click.argument('preset_uuid')
@click.argument('total_iterations', type=int)
def start(project_name, preset_uuid, total_iterations):
    event_manager, controller = _start_controller()

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
def continue_task(task_uuid, total_iterations=0):
    event_manager, controller = _start_controller()

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
def test_task(project_name, preset_uuid, total_iterations, load):
    event_manager, controller = _start_controller()

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
def add_version(project_name, version_name):
    event_manager, controller = _start_controller()

    controller.add_version(project_name, version_name)
    controller.stop()

if __name__ == '__main__':
    cli()
