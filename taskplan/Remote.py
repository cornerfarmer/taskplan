import datetime
import os
import pickle
import socket
from enum import Enum

from Crypto.Cipher import AES
from taskconf.config.Configuration import Configuration

from taskplan.Device import Device, LocalDevice

try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path

class RemoteMsg(Enum):
    RUN_TASK = 0
    TERMINATE = 1
    JOIN = 2
    IS_RUNNING = 3
    SEND = 4
    RECV = 5
    CURRENT_TASK = 6
    PING = 7

class Connection:
    def __init__(self):
        key_file = Path("taskplan_remote_key")
        if key_file.exists():
            with open(key_file, "rb") as f:
                self.key = f.read()
        else:
            self.key = os.urandom(32)
            with open(key_file, "wb+") as f:
                f.write(self.key)

    def encrypt(self, message, counter):
        aes = AES.new(self.key, AES.MODE_CTR, counter=lambda: counter)
        return aes.encrypt(message)

    def decrypt(self, message, counter):
        aes = AES.new(self.key, AES.MODE_CTR, counter=lambda: counter)
        return aes.decrypt(message)

    def send(self, socket, message):
        message = pickle.dumps(message)
        counter = os.urandom(16)
        message = self.encrypt(message, counter)
        socket.sendall(counter + message)

    def recv(self, socket):
        message = socket.recv(1024)
        if not message:
            return False

        counter, message = message[:16], message[16:]
        message = self.decrypt(message, counter)
        message = pickle.loads(message)
        return message

class RemoteDevice(Device):
    def __init__(self, host, port):
        super().__init__()
        self.host = host
        self.port = port
        self.socket = None
        self.connection = Connection()

    def __del__(self):
        if self.socket is not None:
            self.socket.close()

    def connect(self):
        if not self.is_connected():
            try:
                self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                self.socket.connect((self.host, self.port))
            except:
                self.socket = None
            return self.is_connected()
        else:
            return False

    def disconnect(self):
        if self.socket is not None:
            self.socket.close()
            self.socket = None

    def current_task(self):
        return self._send_msg(RemoteMsg.CURRENT_TASK)

    def _send_msg(self, msg, args=[]):
        try:
            self.connection.send(self.socket, [msg] + args)
            data = self.connection.recv(self.socket)
        except:
            raise Exception("Error with remote agent")

        if data[0] != 0:
            raise Exception("Error with remote agent")

        return data[1:]

    def run_task(self, task_dir, class_name, config, metadata):
        self._send_msg(RemoteMsg.RUN_TASK, [task_dir, class_name, config.get_merged_data(), metadata])

    def terminate(self):
        self._send_msg(RemoteMsg.TERMINATE)

    def join(self):
        self._send_msg(RemoteMsg.JOIN)

    def is_running(self):
        return self._send_msg(RemoteMsg.IS_RUNNING)[0]

    def send(self, msg_type, arg=None):
        self._send_msg(RemoteMsg.SEND, [msg_type, arg])

    def recv(self):
        return self._send_msg(RemoteMsg.RECV)

    def get_name(self):
        return self.host + ":" + str(self.port)

    def check_connection(self):
        try:
            self._send_msg(RemoteMsg.PING)
        except:
            self.socket = None
            return True
        return False

    def is_connected(self):
        return 1 if self.socket is not None else 0

class RemoteAgent:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.local_device = LocalDevice()
        self.current_task = None
        self.start_time = None
        self.connection = Connection()

    def listen(self):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind((self.host, self.port))
            s.listen(0)

            while True:
                print("Waiting for connection...")
                conn, addr = s.accept()
                with conn:
                    print('Connected by', addr)
                    while True:
                        data = self.connection.recv(conn)
                        if not data:
                            break

                        send_data = self._process_msg(data)
                        self.connection.send(conn, send_data)
                print("Lost connection")

    def _process_msg(self, msg):
        msq_type = msg[0]
        args = msg[1:]

        if self.current_task is not None and not self.local_device.is_running():
            self.current_task = None

        try:
            return_args = [0]
            if msq_type == RemoteMsg.RUN_TASK:
                if self.current_task is None:
                    print("Starting task " + args[3]["task_uuid"])
                    config = Configuration(args[2])
                    self.local_device.run_task(args[0], args[1], config, args[3])
                    self.current_task = args[3]["task_uuid"]
                    self.start_time = datetime.datetime.now()
                else:
                    return_args = [1]
            elif msq_type == RemoteMsg.TERMINATE:
                self.local_device.terminate()
                print("Terminated task")
            elif msq_type == RemoteMsg.JOIN:
                self.local_device.join()
                print("Joined task")
            elif msq_type == RemoteMsg.IS_RUNNING:
                return_args.append(self.local_device.is_running())
            elif msq_type == RemoteMsg.SEND:
                self.local_device.send(args[0], args[1])
            elif msq_type == RemoteMsg.RECV:
                return_args.extend(self.local_device.recv())
            elif msq_type == RemoteMsg.CURRENT_TASK:
                return_args.append(self.current_task)
                return_args.append(self.start_time)
        except:
            return_args = [1]

        return return_args

