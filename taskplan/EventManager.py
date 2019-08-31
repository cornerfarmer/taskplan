import json
import logging
from enum import Enum
try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path
try:
    from Queue import Queue
except ImportError:
    from queue import Queue

from taskconf.util.Logger import Logger
import time

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
                data_client['config_name'] = ""
                data_client['start_time'] = 0 if data.start_time is None else time.mktime(data.start_time.timetuple())
                data_client['creation_time'] = 0 if data.creation_time is None else time.mktime(data.creation_time.timetuple())
                data_client['saved_time'] = 0 if data.saved_time is None else time.mktime(data.saved_time.timetuple())
                data_client['total_iterations'] = data.total_iterations
                data_client['finished_iterations'], data_client['iteration_update_time'] = data.finished_iterations_and_update_time()
                data_client['config_dynamic'] = data.config.dynamic
                data_client['queue_index'] = data.queue_index
                data_client['had_error'] = data.had_error
                data_client['version'] = data.code_version
                data_client['is_pausing'] = data.pausing
                data_client['is_saving'] = data.saving
                data_client['paramValues'] = [[str(param_value[0].uuid)] + param_value[1:] for param_value in data.config.base_configs]
                data_client['checkpoints'] = data.checkpoints
                data_client['notes'] = data.notes
                data_client['is_test'] = data.is_test
                data_client['device'] = None if data.device is None else str(data.device.uuid)
        elif event_type in [EventType.PARAM_CHANGED, EventType.PARAM_REMOVED]:
            data_client['uuid'] = str(data.uuid)
            data_client['project_name'] = parent_data.name
            if event_type is not EventType.PARAM_REMOVED:
                data_client['name'] = data.get_metadata("name")
                data_client['deprecated_param_value'] = data.get_metadata("deprecated_param_value")
                data_client['default_param_value'] = data.get_metadata("default_param_value")
                data_client['sorting'] = data.get_metadata("sorting")
                data_client['group'] = parent_data.configuration.get_param_group(data)
        elif event_type in [EventType.PARAM_VALUE_CHANGED, EventType.PARAM_VALUE_REMOVED]:
            data_client['uuid'] = str(data.uuid)
            data_client['param'] = data.get_metadata("param")
            data_client['project_name'] = parent_data.name
            if event_type is not EventType.PARAM_VALUE_REMOVED:
                data_client['name'] = data.get_metadata("name")
                data_client['base_uuid'] = data.base_configs[0].uuid if len(data.base_configs) > 0 else ""
                data_client['abstract'] = data.abstract
                data_client['dynamic'] = data.dynamic
                data_client['isTemplate'] = data.get_metadata("isTemplate") if data.has_metadata("isTemplate") else False
                data_client['template_defaults'] = data.get_metadata("template_defaults") if data.has_metadata("template_defaults") else []
                data_client['creation_time'] = time.mktime(data.creation_time.timetuple())
        elif event_type is EventType.PROJECT_CHANGED:
            data_client['name'] = data.name
            data_client['current_code_version'] = data.current_code_version
            data_client['tensorboard_port'] = -1 if data.tensorboard_port is None else data.tensorboard_port
        elif event_type is EventType.CODE_VERSION_CHANGED:
            data_client = data.copy()
            data_client['project_name'] = parent_data.name
        elif event_type is EventType.SCHEDULER_OPTIONS:
            data_client['max_running'] = data.max_running()
            data_client['devices'] = [{"uuid": str(device.uuid), "name": device.get_name(), "is_connected": device.is_connected()} for device in data.devices]
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
        #print( str(self.event.value))
        lines += "event: " + str(self.event.value) + "\n"
        lines += "data: " + json.dumps(self.data) + "\n"
        return lines + "\n\n"


class EventType(Enum):
    TASK_CHANGED = "TASK_CHANGED"
    TASK_REMOVED = "TASK_REMOVED"
    PARAM_CHANGED = "PARAM_CHANGED"
    PARAM_REMOVED = "PARAM_REMOVED"
    PARAM_VALUE_CHANGED = "PARAM_VALUE_CHANGED"
    PARAM_VALUE_REMOVED = "PARAM_VALUE_REMOVED"
    PROJECT_CHANGED = "PROJECT_CHANGED"
    SCHEDULER_OPTIONS = "SCHEDULER_OPTIONS"
    FLASH_MESSAGE = "FLASH_MESSAGE"
    CODE_VERSION_CHANGED = "CODE_VERSION_CHANGED"

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