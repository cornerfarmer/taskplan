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
from datetime import datetime
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
                data_client['preset_name'] = ""
                data_client['start_time'] = 0 if data.start_time is None else time.mktime(data.start_time.timetuple())
                data_client['creation_time'] = 0 if data.creation_time is None else time.mktime(data.creation_time.timetuple())
                data_client['saved_time'] = 0 if data.saved_time is None else time.mktime(data.saved_time.timetuple())
                data_client['total_iterations'] = data.total_iterations
                data_client['finished_iterations'], data_client['iteration_update_time'] = data.finished_iterations_and_update_time()
                data_client['preset_dynamic'] = data.preset.dynamic
                data_client['queue_index'] = data.queue_index
                data_client['had_error'] = data.had_error
                data_client['version'] = data.code_version
                data_client['is_pausing'] = data.pausing
                data_client['is_saving'] = data.saving
                data_client['choices'] = [[str(preset[0].uuid)] + preset[1:] for preset in data.preset.base_presets]
                data_client['checkpoints'] = data.checkpoints
                data_client['notes'] = data.notes
                data_client['is_test'] = data.is_test
        elif event_type in [EventType.PRESET_CHANGED, EventType.PRESET_REMOVED]:
            data_client['uuid'] = str(data.uuid)
            data_client['project_name'] = parent_data.name
            if event_type is not EventType.PRESET_REMOVED:
                data_client['name'] = data.get_metadata("name")
                data_client['deprecated_choice'] = data.get_metadata("deprecated_choice")
                data_client['default_choice'] = data.get_metadata("default_choice")
                data_client['sorting'] = data.get_metadata("sorting")
                data_client['group'] = parent_data.configuration.get_preset_group(data)
        elif event_type in [EventType.CHOICE_CHANGED, EventType.CHOICE_REMOVED]:
            data_client['uuid'] = str(data.uuid)
            data_client['preset'] = data.get_metadata("preset")
            data_client['project_name'] = parent_data.name
            if event_type is not EventType.CHOICE_REMOVED:
                data_client['name'] = data.get_metadata("name")
                data_client['base_uuid'] = data.base_presets[0].uuid if len(data.base_presets) > 0 else ""
                data_client['abstract'] = data.abstract
                data_client['dynamic'] = data.dynamic
                data_client['isTemplate'] = data.get_metadata("isTemplate") if data.has_metadata("isTemplate") else False
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
    PRESET_CHANGED = "PRESET_CHANGED"
    PRESET_REMOVED = "PRESET_REMOVED"
    CHOICE_CHANGED = "CHOICE_CHANGED"
    CHOICE_REMOVED = "CHOICE_REMOVED"
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