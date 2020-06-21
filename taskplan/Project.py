import threading
from datetime import datetime

from taskplan.View import *

try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path

from taskplan.EventManager import EventType
from taskplan.TaskWrapper import TaskWrapper, State
from taskplan.ProjectConfiguration import ProjectConfiguration
import subprocess
import time
import shutil
import uuid
import json
import tensorflow as tf

class Project:

    def __init__(self, event_manager, metadata, task_dir=".", task_class_name="Task", tasks_dir="tasks", config_dir="config", test_dir="tests", view_dir="results", load_saved_tasks=True):
        self.task_dir = Path(task_dir).resolve()
        self.task_class_name = task_class_name
        self.event_manager = event_manager

        self.config_dir = self.task_dir / Path(config_dir)
        if not self.config_dir.exists() or len(list(self.config_dir.iterdir())) == 0:
            self.config_dir.mkdir(exist_ok=True, parents=True)

        self.configuration = ProjectConfiguration(self.config_dir, self.event_manager)
        self.tasks_dir = self.task_dir / Path(tasks_dir)
        self.tasks_dir.mkdir(exist_ok=True, parents=True)
        self.test_dir = self.task_dir / Path(test_dir)
        self.test_dir.mkdir(exist_ok=True, parents=True)
        self.view_dir = self.task_dir / view_dir
        self.view_dir.mkdir(exist_ok=True, parents=True)
        self.tasks = []
        self.tensorboard_port = None

        self.code_versions = []
        self.saved_filters = {}
        self.current_code_version = None

        branch_options = []
        branch_options.append(CodeVersionBranch(self.code_versions))
        for param in self.configuration.sorted_params():
            branch_options.append(ParamBranch(param, self.configuration))
        self.view = View(self.configuration, self.view_dir, branch_options)

        self.add_code_version("initial")
        self._load_metadata(metadata)

        if load_saved_tasks:
            self._load_saved_tasks()

    @staticmethod
    def create_from_config_file(event_manager, metadata, path, load_saved_tasks=True):
        if Path(path).exists():
            with open(path) as f:
                data = json.load(f)
        else:
            data = {}
        return Project(event_manager, metadata, load_saved_tasks=load_saved_tasks, **data)

    def save_metadata(self):
        return {
            'code_versions': self.code_versions,
            "current_code_version": self.current_code_version,
            "saved_filters": self.saved_filters
        }

    def _load_metadata(self, metadata):
        if 'code_versions' in metadata:
            self.code_versions = metadata['code_versions']
        if 'current_code_version' in metadata:
            self.current_code_version = metadata['current_code_version']
        if 'saved_filters' in metadata:
            self.saved_filters = metadata['saved_filters']
        self.view.branch_options[0].code_versions = self.code_versions

    def _load_saved_tasks(self):
        for task in self.tasks_dir.iterdir():
            if task.is_dir():
                self._load_saved_task(task)

        self.view.initialize(self.tasks)
        if self.test_dir.exists() and len(list(self.test_dir.iterdir())) > 0:
            self._load_saved_task(self.test_dir, is_test=True)

    def _load_saved_task(self, path, is_test=False):
        #try:
        task = TaskWrapper(self.task_dir, self.task_class_name, None, self, 0, None, is_test=is_test, tasks_dir=self.test_dir if is_test else self.tasks_dir)
        task.load_metadata(path)
        #except:
        #    print("Warning: Could not load task: " + str(path))
        #    return

        task.state = State.STOPPED
        self.tasks.append(task)
        self.configuration.register_task(task)
        return task

    def create_task(self, param_values, config, total_iterations, is_test=False):
        params = self.configuration.get_params()

        base_uuids = []
        for param in params:
            if self.configuration.has_param_values(str(param.uuid)):
                if str(param.uuid) not in param_values:
                    raise LookupError("No param value for the param with uuid " + str(param.uuid))
                param_value = self.configuration.get_config(param_values[str(param.uuid)][0])
                if param_value.get_metadata("param") != str(param.uuid):
                    raise LookupError("Param value " + param_values[param] + " with wrong param")

                base_uuids.append([param_values[str(param.uuid)][0]] + param_values[str(param.uuid)][1:])

        task_config = self.configuration.add_task(base_uuids, config)
        return self._create_task_from_config(task_config, total_iterations, is_test)

    def _create_task_from_config(self, task_config, total_iterations, is_test=False):
        if is_test:
            tasks_dir = self.test_dir
        else:
            tasks_dir = self.tasks_dir

        if is_test:
            for task in self.tasks:
                if task.is_test:
                    if task.state in [State.RUNNING, State.QUEUED]:
                        raise Exception("A test is already running")
                    self.remove_task(task)
                    self.event_manager.throw(EventType.TASK_REMOVED, task)
                    break

        task = TaskWrapper(self.task_dir, self.task_class_name, task_config, self, total_iterations, self.current_code_version, tasks_dir=tasks_dir, is_test=is_test)
        task.save_metadata()
        self.tasks.append(task)
        self.configuration.register_task(task)

        if not is_test:
            self.view.add_task(task)
        return task

    def find_task_by_uuid(self, uuid):
        for task in self.tasks:
            if str(task.uuid) == uuid:
                return task
        return None

    def find_test_task_by_config(self, config_uuid):
        for task in self.tasks:
            if task.is_test and task.original_config_uuid == config_uuid:
                return task
        return None

    def start_tensorboard(self, event_manager):
        if self.tensorboard_port is None:
            port = self.tensorboard_port
            t = threading.Thread(target=self._run_tensorboard)
            t.start()

            while port != self.tensorboard_port:
                port = self.tensorboard_port
                time.sleep(5)

            event_manager.throw(EventType.PROJECT_CHANGED, self)

    def _run_tensorboard(self):
        self.tensorboard_port = 6006
        while True:
            process = subprocess.Popen(["tensorboard", "--logdir", str(self.view_dir), "--port", str(self.tensorboard_port)], stdout=subprocess.PIPE)
            output, error = process.communicate()

            if output.startswith(b'TensorBoard attempted to bind to port'):
                self.tensorboard_port += 1
            else:
                self.tensorboard_port = -1
                break

    def remove_task(self, task):
        if task in self.tasks:
            if not task.is_test:
                self.view.remove_task(task)
            self.tasks.remove(task)
            self.configuration.deregister_task(task)
            task.remove_data()

            self.event_manager.throw(EventType.TASK_REMOVED, task)

    def remove_param(self, param_uuid):
        param = self.configuration.remove_param(param_uuid)
        if param is not None:
            self.event_manager.throw(EventType.PARAM_REMOVED, param, project)

    def remove_param_value(self, param_value_uuid):
        param_value, param = self.configuration.remove_param_value(param_value_uuid)
        if param_value is not None:
            self.event_manager.throw(EventType.PARAM_VALUE_REMOVED, param_value, project)
            self.event_manager.throw(EventType.PARAM_CHANGED, param, project)

    def add_code_version(self, name):
        code_version_uuid = str(uuid.uuid4())
        self.code_versions.append({
            "name": name,
            "uuid": code_version_uuid,
            "base": self.current_code_version,
            "time": time.mktime(datetime.now().timetuple())
        })
        if self.current_code_version is None:
            self.current_code_version = code_version_uuid

        self.view.branch_options[0].code_versions = self.code_versions

        return self.code_versions[-1]

    def select_code_version(self, code_version_uuid):
        for code_version in self.code_versions:
            if code_version["uuid"] == code_version_uuid:
                self.current_code_version = code_version_uuid
                break

    def clone_task(self, task):
        if task in self.tasks and not task.is_test:
            task_config = self.configuration.add_task([], {})

            cloned_task = self._create_task_from_config(task_config, task.total_iterations)
            new_uuid = cloned_task.uuid

            shutil.rmtree(str(cloned_task.build_save_dir()))
            shutil.copytree(str(task.build_save_dir()), str(cloned_task.build_save_dir()))

            cloned_task.load_metadata(cloned_task.build_save_dir())

            cloned_task.state = State.STOPPED
            cloned_task.uuid = new_uuid
            cloned_task.creation_time = datetime.now()
            cloned_task.save_metadata()
            self.view.add_task(cloned_task)

            return cloned_task

    def extract_checkpoint(self, task, checkpoint_id):
        if task in self.tasks and not task.is_test:
            checkpoint_dir = task.build_checkpoint_dir(checkpoint_id)
            task_config = self.configuration.add_task([], {})

            new_task = self._create_task_from_config(task_config, task.total_iterations)
            new_uuid = new_task.uuid

            new_task_dir = new_task.build_save_dir()
            shutil.rmtree(str(new_task_dir))
            shutil.copytree(str(checkpoint_dir), str(new_task_dir))
            for file in new_task_dir.glob("events.out.checkpoint.*"):
                file.rename(str(file).replace("events.out.checkpoint", "events.out.tfevents"))

            new_task.load_metadata(new_task.build_save_dir())

            new_task.state = State.STOPPED
            new_task.uuid = new_uuid
            new_task.creation_time = datetime.now()
            new_task.checkpoints = []
            new_task.save_metadata()
            self.view.add_task(new_task)

            return new_task

    def change_sorting(self, param_uuid, new_sorting):
        param = self.configuration.get_config(param_uuid)
        self.view.remove_param(param)

        changed_params = self.configuration.change_sorting(param_uuid, new_sorting)

        self.view.add_param(param)
        return changed_params

    def reload(self):
        self.configuration.reload()

        task_uuids = []
        for task in self.tasks:
            success = task.reload()
            if success:
                task_uuids.append(str(task.uuid))
                self.event_manager.throw(EventType.TASK_CHANGED, task)
            else:
                self.event_manager.throw(EventType.TASK_REMOVED, task)
                self.tasks.remove(task)

        for task in self.tasks_dir.iterdir():
            if task.is_dir() and task.name not in task_uuids:
                task = self._load_saved_task(task)
                self.event_manager.throw(EventType.TASK_CHANGED, task)

        self.view.initialize(self.tasks)


    def update_new_client(self, client):
        self.event_manager.throw_for_client(client, EventType.PROJECT_CHANGED, self)

        for code_version in self.code_versions:
            self.event_manager.throw_for_client(client, EventType.CODE_VERSION_CHANGED, code_version)

        for param in self.configuration.get_params():
            self.event_manager.throw_for_client(client, EventType.PARAM_CHANGED, param, self.configuration)

        for param_value in self.configuration.get_param_values():
            self.event_manager.throw_for_client(client, EventType.PARAM_VALUE_CHANGED, param_value, self.configuration)

        #for task in self.tasks:
        #    self.event_manager.throw_for_client(client, EventType.TASK_CHANGED, task)

    def update_clients(self):
        pass

    def col_from_task(self, task, col_name, task_name, metrics):
        if col_name == "saved":
            return task.saved_time
        elif col_name == "name":
            return " / ".join(task_name)
        elif col_name == "created":
            return task.creation_time
        elif col_name == "iterations":
            return task.finished_iterations
        elif col_name == "started":
            return task.start_time if task.start_time is not None else datetime.utcfromtimestamp(0)
        elif col_name in metrics:
            return metrics[col_name][2]
        else:
            return 0

    def metrics_json(self, task, metric_superset):
        metrics = {}
        for path in task.build_save_dir().glob("events.out.tfevents.*"):
            for e in tf.compat.v1.train.summary_iterator(str(path)):
                for v in e.summary.value:
                    if v.tag not in metrics or metrics[v.tag][0] < e.step or (metrics[v.tag][0] == e.step and metrics[v.tag][1] < e.step):
                        metrics[v.tag] = (e.step, e.wall_time, float(tf.make_ndarray(v.tensor)))
        for tag in metrics.keys():
            metric_superset.add(tag)
        return metrics

    def view_to_json(self, root, name_prefix, sort_col, metric_superset):
        if isinstance(root, RootNode):
            if len(root.children) > 0:
                result = self.view_to_json(root.children["default"], name_prefix, sort_col, metric_superset)
                if isinstance(result, list) and not isinstance(result[0], list):
                    result = [result]
                return result
            else:
                return []
        elif isinstance(root, TaskWrapper):
            metrics = self.metrics_json(root, metric_superset)
            return [{"uuid": str(root.uuid), "name": name_prefix, "sort_col": self.col_from_task(root, sort_col, name_prefix, metrics), "metrics": metrics}]
        elif isinstance(root, GroupNode):
            output = {}
            for group_key in root.children:
                result = self.view_to_json(root.children[group_key], name_prefix, sort_col, metric_superset)
                if not isinstance(result, list) or isinstance(result[0], list):
                    output[group_key] = result
                else:
                    output[group_key] = [result]
            return output
        elif isinstance(root, CollapseNode):
            flatten = lambda l: [item for sublist in l for item in sublist]
            output = []
            for child_key in root.children:
                output.extend(flatten(self.view_to_json(root.children[child_key], name_prefix + [child_key], sort_col, metric_superset)))
            return output
        else:
            output = []
            for child_key in root.children:
                result = self.view_to_json(root.children[child_key], name_prefix + [child_key], sort_col, metric_superset)
                if isinstance(result[0], list):
                    output.extend(result)
                else:
                    output.append(result)
            return output

    def filter_tasks(self, filters, collapse, groups, offset, limit, sort_col, sort_dir):

        branch_options = []
        branch_options.append(CodeVersionBranch(self.code_versions))
        for group in groups:
            branch_options.append(GroupBranch([self.configuration.get_config(param) for param in group], self.configuration))
        for param in self.configuration.sorted_params():
            if param.uuid not in collapse:
                branch_options.append(ParamBranch(param, self.configuration))
        for param_uuid in collapse:
            branch_options.append(CollapseBranch(self.configuration.get_config(param_uuid), self.configuration))

        view = View(self.configuration, None, branch_options)

        for task in self.tasks:
            select = True
            for param_uuid in filters.keys():
                key, args, param_value = task.get_param_value_to_param(self.configuration.get_config(param_uuid), self.configuration)

                found = False
                for possible_value in filters[param_uuid]:
                    if str(param_value.uuid) == possible_value[0] and args == possible_value[1:]:
                        found = True
                        break

                if not found:
                    select = False
                    break

            if not select:
                continue

            view.add_task(task)

        metric_superset = set()
        result = self.view_to_json(view.root_node, [], sort_col, metric_superset)

        result = sorted(result, key=lambda x: x[0]["sort_col"], reverse=sort_dir == "DESC")

        return result, list(metric_superset)
        selected_tasks_level = selected_tasks
        for group in groups:
            group_name = []
            for param_uuid in group:
                key = task.get_param_value_key_to_param(self.configuration.get_config(param_uuid), self.configuration)
                group_name.append(key)
            group_name = " / ".join(group_name)
            if group_name not in selected_tasks_level:
                selected_tasks_level[group_name] = {}
            selected_tasks_level = selected_tasks_level[group_name]

        if len(collapse) > 0:
            collapse_props = []
            for param in self.configuration.get_params():
                if str(param.uuid) not in collapse:
                    key = task.get_param_value_key_to_param(param, self.configuration)
                    collapse_props.append(key)

            collapse_props = " / ".join(collapse_props)
            if collapse_props not in selected_tasks_level:
                selected_tasks_level[collapse_props] = []
            selected_tasks_level[collapse_props].append(str(task.uuid))
        else:
            selected_tasks_level[str(task.uuid)] = [str(task.uuid)]

        return selected_tasks

    def save_filter(self, name, data):
        self.saved_filters[name] = data

    def delete_saved_filter(self, name):
        del self.saved_filters[name]
