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

    controller.start()
    task = controller.start_new_task(project_name, preset_uuid, total_iterations)
    print("Starting preset \"" + task.preset.name + "\" (try " + str(task.try_number) + ")")

    console_ui = ConsoleUI(controller, event_manager, str(task.uuid))
    console_ui.run()
    controller.stop()


@cli.command(name="continue")
@click.argument('task_uuid')
@click.argument('total_iterations', type=int, required=False)
@click.pass_obj
def continue_task(obj, task_uuid, total_iterations=0):
    controller = obj['controller']
    event_manager = obj['event_manager']

    controller.start()
    task = controller.continue_task(task_uuid, total_iterations)
    if task is not None:
        print("Continuing preset \"" + task.preset.name + "\"")

        console_ui = ConsoleUI(controller, event_manager, str(task.uuid))
        console_ui.run()
    else:
        print("Task not found or already finished.")
    controller.stop()

if __name__ == '__main__':
    cli()
