from queue import Queue
from enum import Enum
import json
from TaskWrapper import TaskWrapper
from datetime import timezone

class ServerSentEvent(object):
    def __init__(self, event_type, data):
        self.data = self._pack_data_for_client(data)
        self.event = event_type

    def _pack_data_for_client(self, data):
        data_client = {}
        if isinstance(data, TaskWrapper):
            data_client['uuid'] = str(data.uuid)
            data_client['state'] = data.state.value
            data_client['project_name'] = data.project.name
            data_client['preset_name'] = data.preset.name
            data_client['start_time'] = 0 if data.start_time is None else data.start_time.timestamp()
            data_client['mean_iteration_time'] = data.mean_iteration_time()
            data_client['total_iterations'] = data.total_iterations
        else:
            raise LookupError("Given data type not supported: " + str(data))

        return data_client

    def encode(self):
        if not self.data:
            return ""
        lines = ""
        print( str(self.event.value))
        lines += "event: " + str(self.event.value) + "\n"
        lines += "data: " + json.dumps(self.data) + "\n"
        return lines + "\n\n"

class EventType(Enum):
    TASK_CHANGED = "TASK_CHANGED"

class EventManager:
    def __init__(self):
        self.subscriptions = []

    def subscribe(self):
        self.subscriptions.append(Queue())
        return self.subscriptions[-1]

    def throw(self, event_type, data):
        event = ServerSentEvent(event_type, data)
        for subscription in self.subscriptions:
            subscription.put(event)

    def unsubscribe(self, subscription):
        self.subscriptions.remove(subscription)

