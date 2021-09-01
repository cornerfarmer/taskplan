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


def _start_controller(tasks_to_load, taskplan_config="taskplan.json"):
    event_manager = EventManager()
    controller = Controller(event_manager, None, taskplan_config, slim_mode=True, tasks_to_load=tasks_to_load)
    return event_manager, controller

@cli.command()
@click.option('--refresh_interval', type=int, default=30000)
@click.option('--config', type=str, default="taskplan.json")
def web(refresh_interval, config):
    app, controller = run(refresh_interval, config)

    run_simple("0.0.0.0", 9998, app, threaded=True)
    controller.stop()


@cli.command()
@click.argument('total_iterations', type=int)
@click.argument('params', nargs=-1)
@click.option('--save', type=int, default=0)
@click.option('--checkpoint', type=int, default=0)
def start(total_iterations, params, save, checkpoint):
    event_manager, controller = _start_controller([])

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
        print("Starting task " + str(task.uuid))

        console_ui = ConsoleUI(controller, event_manager, str(task.uuid))
        console_ui.run()
    finally:
        controller.stop()


@cli.command(name="continue")
@click.argument('task_uuid')
@click.argument('total_iterations', type=int, required=False)
def continue_task(task_uuid, total_iterations=0):
    event_manager, controller = _start_controller(task_uuid)

    try:
        controller.start()
        task = controller.continue_task(task_uuid, total_iterations)
        if task is not None:
            print("Continuing task " + str(task.uuid))

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
def test_task(total_iterations, params, save, checkpoint):
    event_manager, controller = _start_controller([])


    try:
        controller.start()
        config = {
            "save_interval": save,
            "checkpoint_interval": checkpoint
        }
        values_per_param = {}
        for i in range(0, len(params), 2):
            values_per_param[params[i]] = params[i + 1].split(":")

        task = controller.start_new_task(values_per_param, config, total_iterations, is_test=True)

        if task is not None:
            print("Testing task " + str(task.uuid))
            console_ui = ConsoleUI(controller, event_manager, str(task.uuid))
            console_ui.run()
        else:
            print("Task not found or already finished.")
    finally:
        controller.stop()


@cli.command(name="agent")
@click.argument('host', default="0.0.0.0")
@click.option('--port', type=int, default="33333")
def agent(host, port):
    agent = RemoteAgent(host, port)
    agent.listen()


@cli.command(name="diff")
@click.argument('first_task')
@click.argument('second_task')
def diff(first_task, second_task):
    event_manager, controller = _start_controller([first_task, second_task])
    controller.diff_config(first_task, second_task)


if __name__ == '__main__':
    cli()
