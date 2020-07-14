import click
from werkzeug.serving import run_simple

from taskplan.ConsoleUI import ConsoleUI
from taskplan.Controller import Controller
from taskplan.EventManager import EventManager
from taskplan.Remote import RemoteAgent
from taskplan.app import run


@click.group()
def cli():
    pass


def _start_controller():
    event_manager = EventManager()
    controller = Controller(event_manager, None, slim_mode=True)
    return event_manager, controller


@cli.command()
def init():
    _start_controller()


@cli.command()
@click.option('--refresh_interval', type=int, default=30000)
def web(refresh_interval):
    app, controller = run(refresh_interval)

    run_simple("0.0.0.0", 9998, app, threaded=True)
    controller.stop()


@cli.command()
@click.argument('total_iterations', type=int)
@click.argument('params', nargs=-1)
@click.option('--save', type=int, default=0)
@click.option('--checkpoint', type=int, default=0)
def start(total_iterations, params, save, checkpoint):
    event_manager, controller = _start_controller()

    try:
        controller.start()
        config = {
            "save_interval": save,
            "checkpoint_interval": checkpoint
        }
        values_per_param = {}
        for i in range(0, len(params), 2):
            values_per_param[params[i]] = params[i + 1].split(":")

        task = controller.start_new_task(values_per_param, config, total_iterations)
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
@click.argument('total_iterations', type=int)
@click.argument('params', nargs=-1)
@click.option('--save', type=int, default=0)
@click.option('--checkpoint', type=int, default=0)
@click.option('--load', is_flag=True)
def test_task(total_iterations, params, save, checkpoint, load):
    event_manager, controller = _start_controller()

    try:
        controller.start()
        config = {
            "save_interval": save,
            "checkpoint_interval": checkpoint
        }
        values_per_param = {}
        for i in range(0, len(params), 2):
            values_per_param[params[i]] = params[i + 1].split(":")

        if not load:
            task = controller.start_new_task(values_per_param, config, total_iterations, is_test=True)
        else:
            task = controller.continue_test_task(values_per_param, config, total_iterations)

        if task is not None:
            print("Testing task \"" + str(task.uuid))
            console_ui = ConsoleUI(controller, event_manager, str(task.uuid))
            console_ui.run()
        else:
            print("Task not found or already finished.")
    finally:
        controller.stop()


@cli.command(name="add_version")
@click.argument('version_name')
def add_version(version_name):
    event_manager, controller = _start_controller()

    controller.add_code_version(version_name)
    controller.stop()

@cli.command(name="agent")
@click.argument('host', default="0.0.0.0")
@click.option('--port', type=int, default="33333")
def agent(host, port):
    agent = RemoteAgent(host, port)
    agent.listen()

if __name__ == '__main__':
    cli()
