import threading

from tqdm import tqdm

from taskplan.EventManager import EventType
from taskplan.TaskWrapper import State
import sys
import select
import tty
import termios
import click

class ConsoleUI:
    def __init__(self, controller, event_manager, task_uuid):
        self.controller = controller

        event_queue = event_manager.subscribe()
        controller.update_new_client(event_queue)
        self.event_queue = event_queue
        self.task_uuid = task_uuid

    def run(self):
        self.run_ui_thread = True
        self.hide_pbar = False
        self.ui_thread = threading.Thread(target=self._process_input)
        self.ui_thread.start()

        with tqdm() as pbar:
            pbar.write("Commands: (P)ause, (E)xtend")
            while True:
                event = self.event_queue.get()
                if event.event == EventType.TASK_CHANGED and event.data['uuid'] == self.task_uuid:
                    if not self.hide_pbar:
                        pbar.update(event.data['finished_iterations'] - pbar.n)
                        pbar.total = event.data['total_iterations']

                    if event.data['state'] == State.STOPPED.value:
                        print("")
                        if event.data['had_error']:
                            print("Stopped task due to an error after " + str(event.data['finished_iterations']) + " iterations")
                        else:
                            print(("Finished" if event.data['total_iterations'] == event.data['finished_iterations'] else "Paused") + " task after " + str(event.data['finished_iterations']) + " iterations")
                        break

        self.run_ui_thread = False
        self.ui_thread.join()

    def _process_input(self):
        old_settings = termios.tcgetattr(sys.stdin)
        try:
            tty.setcbreak(sys.stdin.fileno())

            while self.run_ui_thread:
                if select.select([sys.stdin], [], [], 0) == ([sys.stdin], [], []):
                    c = sys.stdin.read(1)
                    if c == "p":
                        self.controller.pause_task(self.task_uuid)
                    elif c == "e":
                        self.hide_pbar = True

                        termios.tcsetattr(sys.stdin, termios.TCSADRAIN, old_settings)
                        new_total_iterations = click.prompt("\rSpecify the new number of iterations", default="", show_default=False)
                        tty.setcbreak(sys.stdin.fileno())
                        sys.stdout.write('\x1b[A')
                        sys.stdout.flush()

                        try:
                            self.controller.change_total_iterations(self.task_uuid, int(new_total_iterations))
                        except:
                            pass
                        finally:
                            self.hide_pbar = False
        finally:
            termios.tcsetattr(sys.stdin, termios.TCSADRAIN, old_settings)