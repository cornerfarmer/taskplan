import threading
import traceback
from collections import Counter
from datetime import datetime

from taskplan.Utility import Utility
from taskplan.VersionControl import VersionControl
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
import uuid
import json
import shutil
import tensorflow as tf
import math
import ast

class Project:

    def __init__(self, event_manager, metadata, task_dir=".", task_class_name="Task", tasks_dir="tasks", config_dir="config", test_dir="tests", views_dir="views", tasks_to_load=None, git_white_list=[], slim_mode=False, taskconfig_path=""):
        self.task_dir = Path(task_dir).resolve()
        self.task_class_name = task_class_name
        self.event_manager = event_manager
        self.slim_mode = slim_mode
        self.taskconfig_path = taskconfig_path

        self.config_dir = self.task_dir / Path(config_dir)
        if not self.config_dir.exists() or len(list(self.config_dir.iterdir())) == 0:
            self.config_dir.mkdir(exist_ok=True, parents=True)

        self.configuration = ProjectConfiguration(self.config_dir, self.event_manager)
        self.tasks_dir = self.task_dir / Path(tasks_dir)
        self.tasks_dir.mkdir(exist_ok=True, parents=True)
        self.test_dir = self.task_dir / Path(test_dir)
        self.test_dir.mkdir(exist_ok=True, parents=True)
        self.views_dir = self.task_dir / Path(views_dir)
        self.views_dir.mkdir(exist_ok=True, parents=True)
        self.tasks = []
        self.tensorboard_ports = {}
        self.tensorboard_threads = {}
        self.next_tensorboard_port = 7000
        self.version_control = VersionControl(task_dir, git_white_list)

        self.views = {}
        self.views_data = {}
        self._refresh_default_view()

        self._load_metadata(metadata)

        self.all_tags = Counter()

        self._load_saved_tasks(tasks_to_load)

    def _refresh_default_view(self):
        if not self.slim_mode:
            branch_options = []

            branch_options.append(CodeVersionBranch("label", self.version_control))
            for param in self.configuration.default_sorted_params():
                branch_options.append(ParamBranch(param, self.configuration, param.get_metadata("force") if param.has_metadata("force") else False))
            self.default_view = View(self.configuration, None, branch_options, {}, version_control=self.version_control, collapse_multiple_tries=False)

    def _default_view_refresh_names(self, throw_events=True):
        if not self.slim_mode:
            for task in self.tasks:
                if not task.is_test:
                    task.name = self.default_view.path_of_task(task)
            if throw_events:
                self.event_manager.throw(EventType.TASK_NAMES_CHANGED, None)

    @staticmethod
    def create_from_config_file(event_manager, metadata, path, tasks_to_load=None, slim_mode=False):
        if Path(path).exists():
            with open(path) as f:
                data = json.load(f)
        else:
            raise Exception("No such file: " + str(path))
        return Project(event_manager, metadata, taskconfig_path=path, tasks_to_load=tasks_to_load, slim_mode=slim_mode, **data)

    def save_metadata(self):
        return {**{
            "views": self.views_data
        }, **self.version_control.save_metadata()}

    def _load_metadata(self, metadata):
        self.version_control.load_metadata(metadata)
        if not self.slim_mode:
            if 'views' in metadata:
                self.views_data = metadata['views']
                self.views = {}
                for key, view in self.views_data.items():
                    self.add_view(key, view, True)
            #else:
            #    self.add_view("results", {"filter": {}, "collapse": [], "group": [], "collapse_sorting": ["saved", True], "sorting_tasks": ["saved", True], "param_sorting": {}, "version_in_name": "label", "force_param_in_name": [], "collapse_enabled": False, "path": null}, True)

    def _load_saved_tasks(self, tasks_to_load):
        if tasks_to_load is None or len(tasks_to_load) > 0:
            for task in self.tasks_dir.iterdir():
                if task.is_dir() and (tasks_to_load is None or task.name in tasks_to_load):
                    self._load_saved_task(task)

            if not self.slim_mode:
                self.refresh_all_views(False)

            if self.test_dir.exists() and len(list(self.test_dir.iterdir())) > 0:
                self._load_saved_task(self.test_dir, is_test=True)
        print("Loaded " + str(len(self.tasks)) + " tasks.")

    def _load_saved_task(self, path, is_test=False):
        if not any(path.iterdir()):
            try:
                shutil.rmtree(path)
                print("Removed empty directory " + str(path))
            except OSError:
                print(str(path) + " is empty but could not be removed.")
            return None

        if not (path / "metadata.json").exists():
            print(str(path) + " does not contain a metadata.json, so probably not a task.")
            return None

        try:
            task = TaskWrapper(self.task_dir, self.task_class_name, None, self, 0, is_test=is_test, tasks_dir=self.test_dir if is_test else self.tasks_dir)
            task.load_metadata(path)
            task.load_metric_cache(path)
        except:
            print("Warning: Could not load task: " + str(path))
            print(traceback.format_exc())
            return None

        if self.find_task_by_uuid(task.uuid) is not None:
            print("A task with uuid " + str(task.uuid) + " already exists. I am therefore not loading " + str(path))
            return None

        task.state = State.STOPPED

        self._register_tags_from_task(task)
        self.tasks.append(task)
        self.configuration.register_task(task)
        return task

    def _register_tags_from_task(self, task):
        for tag in task.tags:
            self.all_tags[tag] += 1

    def _deregister_tags_from_task(self, task):
        for tag in task.tags:
            self.all_tags[tag] -= 1
            if tag in self.all_tags:
                del self.all_tags[tag]

    def create_task(self, param_values, config, total_iterations, is_test=False, tags=[]):
        params = self.configuration.get_params()

        base_uuids = {}
        for iteration in param_values.keys():
            base_uuids[iteration] = []
            for param in params:
                if self.configuration.has_param_values(str(param.uuid)):
                    if str(param.uuid) not in param_values[iteration]:
                        continue
                    param_value = self.configuration.get_config(param_values[iteration][str(param.uuid)][0])
                    if param_value.get_metadata("param") != str(param.uuid):
                        raise LookupError("Param value " + param_values[iteration][param] + " with wrong param")

                    base_uuids[iteration].append([param_values[iteration][str(param.uuid)][0]] + param_values[iteration][str(param.uuid)][1:])

        task_config = self.configuration.add_task(base_uuids, config)
        task = self._create_task_from_config(task_config, total_iterations, is_test, tags)

        self.event_manager.throw(EventType.PROJECT_CHANGED, self)
        return task


    def edit_task(self, task_uuid, param_values, config, total_iterations):
        task = self.find_task_by_uuid(task_uuid)

        params = self.configuration.get_params()

        base_uuids = {}
        for iteration in param_values.keys():
            base_uuids[iteration] = []
            for param in params:
                if self.configuration.has_param_values(str(param.uuid)):
                    if str(param.uuid) not in param_values[iteration]:
                        continue
                    param_value = self.configuration.get_config(param_values[iteration][str(param.uuid)][0])
                    if param_value.get_metadata("param") != str(param.uuid):
                        raise LookupError("Param value " + param_values[iteration][param] + " with wrong param")

                    base_uuids[iteration].append([param_values[iteration][str(param.uuid)][0]] + param_values[iteration][str(param.uuid)][1:])

        task_config = self.configuration.add_task(base_uuids, config)
        task.set_config(task_config)
        task.set_total_iterations(total_iterations)

        self.refresh_views()
        self.event_manager.throw(EventType.TASK_CHANGED, task)
        return task

    def build_task_config(self, param_values):
        params = self.configuration.get_params()

        base_uuids = {}
        param_uuids = {}
        for iteration in param_values.keys():
            base_uuids[iteration] = []
            param_uuids[iteration] = []
            for param in params:
                if self.configuration.has_param_values(str(param.uuid)):
                    if str(param.uuid) not in param_values[iteration]:
                        raise LookupError("No param value for the param with uuid " + str(param.uuid))
                    param_value = self.configuration.get_config(param_values[iteration][str(param.uuid)][0])
                    if param_value.get_metadata("param") != str(param.uuid):
                        raise LookupError("Param value " + param_values[iteration][param] + " with wrong param")

                    base_uuids[iteration].append([param_values[iteration][str(param.uuid)][0]] + param_values[iteration][str(param.uuid)][1:])
                    param_uuids[iteration].append(str(param.uuid))

        selected_base_uuids, param_visibility = self.configuration.collect_visible_bases(base_uuids, param_uuids)

        return self.configuration.add_task(selected_base_uuids, {}), param_visibility

    def _create_task_from_config(self, task_config, total_iterations, is_test=False, tags=[]):
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

        task = TaskWrapper(self.task_dir, self.task_class_name, task_config, self, total_iterations, tasks_dir=tasks_dir, is_test=is_test, tags=tags)
        task.save_metadata()
        self.tasks.append(task)
        self.configuration.register_task(task)
        self._register_tags_from_task(task)

        if not is_test and not self.slim_mode:
            self.add_task_to_views(task)

        return task

    def find_task_by_uuid(self, uuid):
        if not isinstance(uuid, str):
            uuid = str(uuid)

        for task in self.tasks:
            if str(task.uuid) == uuid:
                return task
        return None

    def find_test_task_by_config(self, config_uuid):
        for task in self.tasks:
            if task.is_test and task.original_config_uuid == config_uuid:
                return task
        return None

    def start_tensorboard(self, name):
        if name in self.views:
            self.event_manager.log("Opening Tensorboard", "Starting tensorboard...")
            path = str(self.views[name].root_path)

            if path is not None and name not in self.tensorboard_ports:
                self.tensorboard_threads[name] = subprocess.Popen(["tensorboard", "--logdir", path, "--port", str(self.next_tensorboard_port)], stdout=subprocess.PIPE)
                time.sleep(5)

                self.tensorboard_ports[name] = self.next_tensorboard_port
                self.next_tensorboard_port += 1

                self.event_manager.throw(EventType.PROJECT_CHANGED, self)

            return self.tensorboard_ports[name]

    def close_tensorboard(self, name):
        if name in self.views:
            if name in self.tensorboard_threads:
                self.tensorboard_threads[name].kill()
                del self.tensorboard_threads[name]
                del self.tensorboard_ports[name]
                self.event_manager.throw(EventType.PROJECT_CHANGED, self)

    def remove_task(self, task):
        if task in self.tasks:
            self.tasks.remove(task)
            self.configuration.deregister_task(task)
            if not self.slim_mode:
                self.refresh_all_views()
            task.remove_data()

            self.event_manager.throw(EventType.TASK_REMOVED, task)


    def make_test_persistent(self, task):
        if task.is_test:
            task.move_data(self.tasks_dir / str(task.uuid))
            task.is_test = False

            self.event_manager.throw(EventType.TASK_CHANGED, task)

    def remove_param(self, param_uuid):
        param = self.configuration.remove_param(param_uuid)
        if param is not None:
            self.event_manager.throw(EventType.PARAM_REMOVED, param, self.configuration)

    def remove_param_value(self, param_value_uuid):
        param_value, param = self.configuration.remove_param_value(param_value_uuid)
        if param_value is not None:
            self.event_manager.throw(EventType.PARAM_VALUE_REMOVED, param_value, self.configuration)
            self.event_manager.throw(EventType.PARAM_CHANGED, param, self.configuration)

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

        return self.code_versions[-1]

    def select_code_version(self, code_version_uuid):
        for code_version in self.code_versions:
            if code_version["uuid"] == code_version_uuid:
                self.current_code_version = code_version_uuid
                break

    def clone_task(self, task):
        if task in self.tasks and not task.is_test:
            task_config = self.configuration.add_task({"0": []}, {})

            cloned_task = self._create_task_from_config(task_config, task.total_iterations)
            new_uuid = cloned_task.uuid

            shutil.rmtree(str(cloned_task.build_save_dir()))
            shutil.copytree(str(task.build_save_dir()), str(cloned_task.build_save_dir()))

            cloned_task.load_metadata(cloned_task.build_save_dir())

            cloned_task.state = State.STOPPED
            cloned_task.uuid = new_uuid
            cloned_task.creation_time = datetime.now()
            cloned_task.save_metadata()
            cloned_task.metrics = task.metrics
            cloned_task.last_metrics_update = task.last_metrics_update

            if not self.slim_mode:
                self.add_task_to_views(cloned_task)

            return cloned_task

    def extract_checkpoint(self, task, checkpoint_id):
        if task in self.tasks and not task.is_test:
            checkpoint_dir = task.build_checkpoint_dir(checkpoint_id)
            task_config = self.configuration.add_task({"0": []}, {})

            new_task = self._create_task_from_config(task_config, task.total_iterations)
            new_uuid = new_task.uuid

            new_task_dir = new_task.build_save_dir()
            shutil.rmtree(str(new_task_dir))
            shutil.copytree(str(checkpoint_dir), str(new_task_dir))
            for file in new_task_dir.glob("events.out.checkpoint.*"):
                file.rename(str(file).replace("events.out.checkpoint", "events.out.tfevents"))

            new_task.load_metadata(new_task.build_save_dir())
            new_task.load_metric_cache(new_task.build_save_dir())

            new_task.state = State.STOPPED
            new_task.uuid = new_uuid
            new_task.creation_time = datetime.now()
            new_task.checkpoints = []
            new_task.save_metadata()

            if not self.slim_mode:
                self.add_task_to_views(new_task)

            return new_task

    def add_task_to_views(self, new_task):
        for view in self.views.values():
            view.add_task(new_task)
        self.default_view.add_task(new_task)
        self._default_view_refresh_names()

    def refresh_all_views(self, throw_events=True):
        for view in self.views.values():
            view.refresh(self.tasks)
        self.default_view.refresh(self.tasks)
        self._default_view_refresh_names(throw_events)

    def change_sorting(self, param_uuid, new_sorting):
        changed_params = self.configuration.change_sorting(param_uuid, new_sorting)

        if not self.slim_mode:
            self._refresh_default_view()
            self.default_view.refresh(self.tasks)
            self._default_view_refresh_names()

        return changed_params

    def force_param(self, param_uuid, enabled):
        param = self.configuration.force_param(param_uuid, enabled)
        self.event_manager.throw(EventType.PARAM_CHANGED, param, self.configuration)

        if not self.slim_mode:
            self._refresh_default_view()
            self.default_view.refresh(self.tasks)
            self._default_view_refresh_names()

    def reload(self):
        task_uuids = []
        for task in self.tasks[:]:
            success = task.reload()
            if success:
                task_uuids.append(str(task.uuid))
                #self.event_manager.throw(EventType.TASK_CHANGED, task)
            else:
                self.remove_task(task)

        added_tasks = []
        for task in self.tasks_dir.iterdir():
            if task.is_dir() and task.name not in task_uuids:
                task = self._load_saved_task(task)
                if task is None:
                    continue

                for view in self.views.values():
                    view.add_task(task)
                    self.default_view.add_task(task)

                added_tasks.append(task)

        self._default_view_refresh_names()
        for task in added_tasks:
            self.event_manager.throw(EventType.TASK_CHANGED, task)

    def add_param(self, new_data):
        param = self.configuration.add_param(new_data)
        self.add_param_to_views(param)
        return param

    def add_param_to_views(self, param):
        for view in self.views.values():
            if len(view.branch_options) > 1:
                for i, branch_option in reversed(list(enumerate(view.branch_options))):
                    if type(branch_option) in [ParamBranch, CodeVersionBranch, GroupBranch]:
                        view.branch_options.insert(i + 1, ParamBranch(param, self.configuration, False))
                        break
            else:
                view.branch_options.append(ParamBranch(param, self.configuration, False))
        return param

    def add_param_batch(self, config):
        added_params, added_param_values = self.configuration.add_param_batch(config)
        for param in added_params:
            self.add_param_to_views(param)
        return added_params, added_param_values

    def update_new_client(self, client):
        self.event_manager.throw_for_client(client, EventType.PROJECT_CHANGED, self)

        for param in self.configuration.get_params():
            self.event_manager.throw_for_client(client, EventType.PARAM_CHANGED, param, self.configuration)

        for param_value in self.configuration.get_param_values():
            self.event_manager.throw_for_client(client, EventType.PARAM_VALUE_CHANGED, param_value, self.configuration)

        #for task in self.tasks:
        #    self.event_manager.throw_for_client(client, EventType.TASK_CHANGED, task)

    def update_clients(self):
        pass

    def view_to_json(self, root, name_prefix, sort_col, metric_superset, collapse_sorting):
        flatten = lambda l: [item for sublist in l for item in sublist]
        if isinstance(root, RootNode):
            if len(root.children) > 0:
                result = self.view_to_json(root.children["default"], name_prefix, sort_col, metric_superset, collapse_sorting)
                if isinstance(result, list) and len(result) > 0 and not isinstance(result[0], list):
                    result = [result]
                return result
            else:
                return []
        elif isinstance(root, TaskWrapper):
            #root.update_metrics(metric_superset)
            return [{"uuid": str(root.uuid), "name": name_prefix, "collapse_sort_col": root.col_from_task(collapse_sorting[0], name_prefix), "sort_col": root.col_from_task(sort_col, name_prefix), "metrics": root.metrics}]
        elif isinstance(root, GroupNode):
            output = {}
            for group_key in root.children:
                result = self.view_to_json(root.children[group_key], name_prefix, sort_col, metric_superset, collapse_sorting)
                if not isinstance(result, list) or isinstance(result[0], list):
                    output[group_key] = result
                else:
                    output[group_key] = [result]
            return output
        elif isinstance(root, CollapseNode):
            output = []
            for child_key in root.children:
                output.extend(flatten(self.view_to_json(root.children[child_key], name_prefix + [child_key], sort_col, metric_superset, collapse_sorting)))
            for entry in output:
                entry["collapsed_name"] = entry["name"][len(name_prefix):-1]
                entry["name"] = name_prefix + entry["name"][-1:]
            output = sorted(output, key=lambda x: x["collapse_sort_col"], reverse=collapse_sorting[1] == "DESC")
            return output
        else:
            output = []
            for child_key in root.children:
                result = self.view_to_json(root.children[child_key], name_prefix + [child_key], sort_col, metric_superset, collapse_sorting)
                if isinstance(result[0], list):
                    output.extend(result)
                else:
                    output.append(result)
            if isinstance(root, TasksNode) and root.collapse and len(output) > 0:
                output = [sorted(flatten(output), key=lambda x: x["collapse_sort_col"], reverse=collapse_sorting[1] == "DESC")]
            return output

    def _build_view(self, filters, collapse, groups, param_sorting, collapse_sorting, version_in_name, force_param_in_name, collapse_enabled, path=None, enabled=True):
        branch_options = []
        for group in groups:
            branch_options.append(GroupBranch([self.configuration.get_config(param) for param in group], self.configuration))
        if version_in_name != "none":
            branch_options.append(CodeVersionBranch(version_in_name, self.version_control))
        for param in self.configuration.sorted_params(param_sorting):
            if param.uuid not in collapse or not collapse_enabled:
                branch_options.append(ParamBranch(param, self.configuration, str(param.uuid) in force_param_in_name and force_param_in_name[str(param.uuid)]))
        if collapse_enabled:
            for param_uuid in collapse:
                branch_options.append(CollapseBranch(self.configuration.get_config(param_uuid), self.configuration, collapse_sorting))

        return View(self.configuration, path, branch_options, filters, version_control=self.version_control, collapse_multiple_tries=collapse_enabled, enabled=enabled)

    def _sort_tasks(self, tasks, sort_col, sort_dir):
        if type(tasks) == dict:
            for key in tasks:
                tasks[key] = self._sort_tasks(tasks[key], sort_col, sort_dir)
            return tasks
        else:
            return sorted(tasks, key=lambda x: -math.inf if x[0]["sort_col"] == "nan" else x[0]["sort_col"], reverse=sort_dir == "DESC")

    def filter_tasks(self, filters, collapse, collapse_sorting, collapse_enabled, groups, param_sorting, offset, limit, sort_col, sort_dir, version_in_name, force_param_in_name):
        view = self._build_view(filters, collapse, groups, param_sorting, collapse_sorting, version_in_name, force_param_in_name, collapse_enabled)

        for task in self.tasks:
            view.add_task(task)

        metric_superset = set()
        result = self.view_to_json(view.root_node, [], sort_col, metric_superset, collapse_sorting)

        result = self._sort_tasks(result, sort_col, sort_dir)

        return result, list(metric_superset)

    def add_view(self, name, data, ignore_path_check=False):
        if data["path"] is not None:
            actual_path = self.views_dir / data["path"]
            if actual_path.exists() and len(list(actual_path.iterdir())) > 0 and not ignore_path_check:
                raise Exception("Not empty")
        else:
            actual_path = None
        view = self._build_view(data['filter'], data['collapse'], data['group'], data['param_sorting'], data['collapse_sorting'], data['version_in_name'], data['force_param_in_name'], data['collapse_enabled'], actual_path, enabled=data["path"] is not None)
        view.refresh(self.tasks)
        self.views[name] = view
        self.views_data[name] = data

    def delete_view(self, name, close_tb=True):
        self.delete_view_path(name, close_tb)

        del self.views[name]
        del self.views_data[name]

    def delete_view_path(self, name, close_tb=True):
        path = self.views[name].root_path
        if path is not None:
            if close_tb:
                self.close_tensorboard(name)
            actual_path = (self.task_dir / path).resolve()
            shutil.rmtree(actual_path)

    def set_view_path(self, name, path):
        if name in self.views:
            self.views_data[name]["path"] = path
            path = self.views_dir / path
            self.views[name].set_path(path)
            self.views[name].enable(self.tasks)

    def remove_view_path(self, name):
        if name in self.views:
            self.delete_view_path(name)

            self.views[name].set_path(None)
            self.views[name].disable()
            self.views_data[name]["path"] = None

    def set_tags(self, task_uuid, tags):
        task = self.find_task_by_uuid(task_uuid)
        self._deregister_tags_from_task(task)
        task.set_tags(tags)
        self._register_tags_from_task(task)
        self.event_manager.throw(EventType.TASK_CHANGED, task)
        self.event_manager.throw(EventType.PROJECT_CHANGED, self)

    def refresh_views(self):
        print("refresh views")
        for view in self.views.values():
            view.refresh(self.tasks)

    def set_version_label(self, commit_id, label):
        self.version_control.set_label(commit_id, label)
        self.refresh_views()
        self.event_manager.throw(EventType.PROJECT_CHANGED, self)

    def all_code_version_labels(self):
        return self.version_control.all_code_version_labels()