import json
import logging
from enum import Enum
from pathlib import Path
from queue import Queue

from taskconf.util.Logger import Logger


class FlashMessage:
    def __init__(self, message, short, level):
        self.message = message
        self.short = short
        self.level = level

class ServerSentEvent(object):
    def __init__(self, event_type, data, parent_data=None):
        self.data = self._pack_data_for_client(event_type, data, parent_data)
        self.event = event_type

    def _pack_data_for_client(self, event_type, data, parent_data=None):
        data_client = {}
        if event_type in [EventType.TASK_CHANGED, EventType.TASK_REMOVED]:
            data_client['uuid'] = str(data.uuid)
            data_client['project_name'] = data.project.name
            if event_type is not EventType.TASK_REMOVED:
                data_client['state'] = data.state.value
                data_client['preset_name'] = data.preset.name
                data_client['start_time'] = 0 if data.start_time is None else data.start_time.timestamp()
                data_client['creation_time'] = 0 if data.creation_time is None else data.creation_time.timestamp()
                data_client['saved_time'] = 0 if data.saved_time is None else data.saved_time.timestamp()
                data_client['total_iterations'] = data.total_iterations()
                data_client['finished_iterations'], data_client['iteration_update_time'] = data.finished_iterations_and_update_time()
                data_client['preset_dynamic'] = data.preset.dynamic
                data_client['try'] = data.try_number
                data_client['queue_index'] = data.queue_index
                data_client['had_error'] = data.had_error()
                data_client['total_subtasks'] = data.total_subtasks()
                data_client['finished_subtasks'] = data.finished_subtasks()
        elif event_type is EventType.PRESET_CHANGED:
            data_client['uuid'] = str(data.uuid)
            data_client['name'] = data.name
            data_client['project_name'] = parent_data.name
            data_client['base'] = data.base_preset.name if data.base_preset is not None else ""
            data_client['base_uuid'] = data.base_preset.uuid if data.base_preset is not None else ""
            data_client['abstract'] = data.abstract
            data_client['dynamic'] = data.dynamic
            data_client['started_tries'] = parent_data.maximal_try_of_preset(data) + 1
            data_client['creation_time'] = data.creation_time.timestamp()
        elif event_type is EventType.PROJECT_CHANGED:
            data_client['name'] = data.name
            data_client['default_preset'] = data.configuration.default_preset_uuid
            data_client['version'] = data.versions[-1]
            data_client['tensorboard_port'] = -1 if data.tensorboard_port is None else data.tensorboard_port
        elif event_type is EventType.SCHEDULER_OPTIONS:
            data_client['max_running'] = data.max_running()
        elif event_type is EventType.FLASH_MESSAGE:
            data_client['message'] = data.message
            data_client['short'] = data.short
            data_client['level'] = data.level
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
    TASK_REMOVED = "TASK_REMOVED"
    PRESET_CHANGED = "PRESET_CHANGED"
    PROJECT_CHANGED = "PROJECT_CHANGED"
    SCHEDULER_OPTIONS = "SCHEDULER_OPTIONS"
    FLASH_MESSAGE = "FLASH_MESSAGE"

class EventManager:
    def __init__(self):
        self.subscriptions = []
        self.logger = Logger(Path('.'), 'global')

    def subscribe(self):
        self.subscriptions.append(Queue())
        return self.subscriptions[-1]

    def throw(self, event_type, data, parent_data=None):
        event = ServerSentEvent(event_type, data, parent_data)
        for subscription in self.subscriptions:
            subscription.put(event)

    def throw_for_client(self, subscription, event_type, data, parent_data=None):
        event = ServerSentEvent(event_type, data, parent_data)
        subscription.put(event)

    def unsubscribe(self, subscription):
        self.subscriptions.remove(subscription)

    def log(self, message, short="", level=logging.INFO):
        self.logger.log(message, level)
        if short is "":
            short = message
        self.throw(EventType.FLASH_MESSAGE, FlashMessage(message, short, level))