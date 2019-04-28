from taskplan.TaskWrapper import TaskWrapper
import shutil
try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path

class Node:
    def __init__(self):
        self.children = {}
        self.parent = None
        self.parent_key = ""

    def set_child(self, key, child):
        self.children[key] = child
        child.parent = self
        child.parent_key = key

    def insert_as_parent(self, key, new_parent):
        self.parent.set_child(self.parent_key, new_parent)
        new_parent.set_child(key, self)

    def remove(self):
        assert (len(self.children) == 1)
        key = list(self.children.keys())[0]

        child = self.children[key]
        self.parent.children[self.parent_key] = child
        child.parent = self.parent
        child.parent_key = self.parent_key
        return key

    def get_first_task_in(self):
        if len(self.children.keys()) > 0:
            return self.children[list(self.children.keys())[0]].get_first_task_in()
        else:
            return None

class RootNode(Node):
    def __init__(self):
        Node.__init__(self)

class PresetNode(Node):
    def __init__(self, preset):
        Node.__init__(self)
        self.preset = preset

class TasksNode(Node):
    def __init__(self):
        Node.__init__(self)

    def get_first_task_in(self):
        if len(self.children.keys()) > 0:
            return self.children["0"]
        else:
            return None


class View:

    def __init__(self, configuration, root):
        self.configuration = configuration
        self.presets = self.configuration.get_presets()

        self.root_node = RootNode()
        self.root_node.set_child("default", TasksNode())
        self.root_path = root
        self.task_by_uuid = {}

    def initialize(self, tasks):
        for task in tasks:
            self.add_task(task, False)
        self._check_filesystem(self.root_node.children["default"], self.root_path)

    def add_task(self, task, change_dirs=True):
        path = self.root_path
        node = self.root_node.children["default"]
        for preset in self.presets:
            if preset.get_metadata("deprecated_choice") != "":
                suitable_choice = self._get_choice_to_preset(task, preset)

                name = suitable_choice.get_metadata("name")
                if type(node) == TasksNode or node.preset != preset:
                    first_task = node.get_first_task_in()
                    if first_task is None:
                        continue

                    former_choice = self._get_choice_to_preset(first_task, preset)
                    if former_choice == suitable_choice:
                        continue

                    node = self._add_preset_before_node(node, preset, former_choice, path, change_dirs)

                path = path / name
                if name not in node.children:
                    node.set_child(name, TasksNode())

                    if change_dirs:
                        path.mkdir()

                node = node.children[name]

        self._insert_task(node, path, task, change_dirs)

    def remove_task(self, task):
        node = self.task_by_uuid[str(task.uuid)]
        path = self._path_of_node(node)
        children = node.children
        key = int(self._key_in_dict(children, task))

        self._remove_path(path / str(key))
        del children[str(key)]
        for i in range(key, len(children)):
            children[str(i)] = children[str(i + 1)]
            (path / str(i + 1)).rename((path / str(i)))

        self._check_node_for_removal(node, path)

        del self.task_by_uuid[str(task.uuid)]

    def _check_node_for_removal(self, node, path):
        if len(node.children) == 0 and type(node.parent) != RootNode:
            del node.parent.children[node.parent_key]
            self._remove_path(path)
            self._check_node_for_removal(node.parent, path.parent)
        elif len(node.children) == 1 and type(node.parent) == PresetNode:
            self._remove_preset_at_node(node, path)

    def _remove_preset_at_node(self, node, path):
        key = node.remove()
        path = path / key

        for child_path in path.iterdir():
            assert(child_path.name != path.name)
            child_path.rename(path.parent / child_path.name)
        self._remove_path(path)

    def _path_of_node(self, node):
        path = None
        while type(node) != RootNode and type(node.parent) != RootNode:
            if path is None:
                path = Path(node.parent_key)
            else:
                path = node.parent_key / path
            node = node.parent
        return self.root_path if path is None else self.root_path / path

    def _add_preset_before_node(self, node, preset, former_choice, path, change_dirs=True):
        key = former_choice.get_metadata("name")

        new_node = PresetNode(preset)
        node.insert_as_parent(key, new_node)

        if change_dirs:
            (path / key).mkdir()
            for child_path in path.iterdir():
                if child_path.name != key:
                    child_path.rename(path / key / child_path.name)

        return new_node

    def _key_in_dict(self, dictionary, value_to_find):
        for key, value in dictionary.items():
            if value == value_to_find:
                return key
        return None

    def _get_choice_to_preset(self, task, preset):
        suitable_choice = None
        for choice in task.preset.base_presets:
            if choice.get_metadata("preset") == str(preset.uuid):
                suitable_choice = choice
                break

        if suitable_choice is None:
            return self.configuration.get_preset(preset.get_metadata("deprecated_choice"))
        else:
            return suitable_choice

    def _comp_tasks(self, first_task, second_task):
        return first_task.creation_time < second_task.creation_time

    def _insert_task(self, node, path, task, change_dirs=True):
        children = node.children
        self.task_by_uuid[str(task.uuid)] = node

        target_key = len(children.keys())
        for i in range(len(children.keys())):
            if not self._comp_tasks(children[str(i)], task):
                target_key = i
                break

        for i in reversed(range(target_key, len(children.keys()))):
            children[str(i + 1)] = children[str(i)]

            if change_dirs:
                (path / str(i)).rename((path / str(i + 1)))

        children[str(target_key)] = task

        if change_dirs:
            (path / str(target_key)).symlink_to(task.build_save_dir(), True)

    def _check_filesystem(self, node, path):
        if type(node) == dict:
            if path.exists() and not path.is_dir():
                self._remove_path(path)

            path.mkdir(exist_ok=True)

            for child in path.iterdir():
                if not path.is_dir() or path.name not in node.children.keys():
                    self._remove_path(child)

            for dir in node.children.keys():
                self._check_filesystem(node.children[dir], path / dir)
        elif type(node) == TaskWrapper:
            if path.exists() and (not path.is_symlink() or path.resolve(True) != node.build_save_dir()):
                self._remove_path(path)

            if not path.is_symlink():
                path.symlink_to(node.build_save_dir(), True)

    def _remove_path(self, path):
        if path.exists():
            if path.is_file() or path.is_symlink():
                path.unlink()
            else:
                shutil.rmtree(str(path))