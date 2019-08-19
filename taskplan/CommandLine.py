import sys

from taskplan.ConsoleUI import ConsoleUI
from taskplan.Controller import Controller
from taskplan.EventManager import EventManager
import click

from taskplan.Remote import RemoteAgent
from taskplan.app import run
from werkzeug.serving import run_simple

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
    app, controller = run()

    run_simple("0.0.0.0", 9998, app, threaded=True)
    controller.stop()


@cli.command()
@click.argument('project_name')
@click.argument('total_iterations', type=int)
@click.argument('choices', nargs=-1)
@click.option('--save', type=int, default=0)
@click.option('--checkpoint', type=int, default=0)
def start(project_name, total_iterations, choices, save, checkpoint):
    event_manager, controller = _start_controller()

    try:
        controller.start()
        config = {
            "save_interval": save,
            "checkpoint_interval": checkpoint
        }
        choices_per_preset = {}
        for i in range(0, len(choices), 2):
            choices_per_preset[choices[i]] = choices[i + 1].split(":")

        task = controller.start_new_task(project_name, choices_per_preset, config, total_iterations)
        print("Starting task \"" + str(task.uuid))

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
            print("Continuing task" + str(task.uuid))

            console_ui = ConsoleUI(controller, event_manager, str(task.uuid))
            console_ui.run()
        else:
            print("Task not found or already finished.")
    finally:
        controller.stop()


@cli.command(name="test")
@click.argument('project_name')
@click.argument('total_iterations', type=int)
@click.argument('choices', nargs=-1)
@click.option('--save', type=int, default=0)
@click.option('--checkpoint', type=int, default=0)
@click.option('--load', is_flag=True)
def test_task(project_name, total_iterations, choices, save, checkpoint, load):
    event_manager, controller = _start_controller()

    try:
        controller.start()
        config = {
            "save_interval": save,
            "checkpoint_interval": checkpoint
        }
        choices_per_preset = {}
        for i in range(0, len(choices), 2):
            choices_per_preset[choices[i]] = choices[i + 1].split(":")

        if not load:
            task = controller.start_new_task(project_name, choices_per_preset, config, total_iterations, is_test=True)
        else:
            task = controller.continue_test_task(project_name, choices_per_preset, config, total_iterations)

        if task is not None:
            print("Testing task \"" + str(task.uuid))
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

@cli.command(name="agent")
@click.argument('host', default="127.0.0.1")
@click.argument('port', type=int, default="33333")
def agent(host, port):
    agent = RemoteAgent(host, port)
    agent.listen()

if __name__ == '__main__':
    cli()
