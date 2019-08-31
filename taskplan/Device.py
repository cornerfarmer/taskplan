import uuid
from multiprocessing import Process, Pipe, Lock

from taskplan.TaskWrapper import TaskWrapper


class PipeEnd:
    def __init__(self, pipe):
        self.lock = Lock()
        self.pipe = pipe

    def send(self, msg_type, arg=None):
        self.lock.acquire()
        self.pipe.send({"name": msg_type, "arg": arg})
        self.lock.release()

    def recv(self):
        self.lock.acquire()
        data = self.pipe.recv()
        self.lock.release()
        return data["name"], data["arg"]

    def poll(self, arg):
        return self.pipe.poll(arg)

class Device:
    def __init__(self):
        self.uuid = uuid.uuid4()
        self.runnings = []
        self.queue = []

    def run_task(self, task_dir, class_name, config, metadata):
        raise NotImplemented

    def terminate(self):
        raise NotImplemented

    def join(self):
        raise NotImplemented

    def is_running(self):
        raise NotImplemented
    
    def send(self, msg_type, arg=None):
        raise NotImplemented

    def recv(self):
        raise NotImplemented

    def get_name(self):
        raise NotImplemented

    def is_connected(self):
        raise NotImplemented

class LocalDevice(Device):
    def __init__(self):
        super().__init__()
        self.process = None

        pipe_recv, pipe_send = Pipe(duplex=True)
        self.wrapper_pipe = PipeEnd(pipe_recv)
        self.task_pipe = PipeEnd(pipe_send)

    def run_task(self, task_dir, class_name, config, metadata):
        metadata["pipe"] = self.task_pipe
        self.process = Process(target=TaskWrapper._run, args=(task_dir, class_name, config, metadata))
        self.process.start()

    def terminate(self):
        self.process.terminate()

    def join(self):
        self.process.join(timeout=10)

    def is_running(self):
        return self.process is not None and self.process.is_alive()

    def send(self, msg_type, arg=None):
        self.wrapper_pipe.send(msg_type, arg)

    def recv(self):
        update_available = self.wrapper_pipe.poll(0)
        if update_available:
            return self.wrapper_pipe.recv()
        else:
            return None, None

    def get_name(self):
        return "Local machine"

    def is_connected(self):
        return -1
