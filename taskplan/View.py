import shutil

from taskconf.config.Configuration import Configuration

from taskplan.TaskWrapper import TaskWrapper

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

    def remove_subtree(self):
        del self.parent.children[self.parent_key]

    def get_first_task_in(self):
        if len(self.children.keys()) > 0:
            return self.children[list(self.children.keys())[0]].get_first_task_in()
        else:
            return None

    def get_all_contained_tasks(self):
        tasks = []
        for child in self.children.values():
            tasks.extend(child.get_all_contained_tasks())
        return tasks

class RootNode(Node):
    def __init__(self):
        Node.__init__(self)

class ParamNode(Node):
    def __init__(self, param):
        Node.__init__(self)
        self.param = param

class CodeVersionNode(Node):
    def __init__(self):
        Node.__init__(self)

class GroupNode(Node):
    def __init__(self, params):
        Node.__init__(self)
        self.params = params

class CollapseNode(Node):
    def __init__(self, param):
        Node.__init__(self)
        self.param = param

class TasksNode(Node):
    def __init__(self):
        Node.__init__(self)

    def get_first_task_in(self):
        if len(self.children.keys()) > 0:
            return self.children["0"]
        else:
            return None

    def get_all_contained_tasks(self):
        return self.children.values()

class GroupBranch:
    def __init__(self, params, configuration):
        self.params = params
        self.configuration = configuration

    def key_from_task(self, task):
        group_name = []
        for param in self.params:
            key = task.get_param_value_key_to_param(param, self.configuration)
            group_name.append(key)
        group_name = " / ".join(group_name)
        return group_name

    def exists_node(self, node):
        node_exists = type(node) == GroupNode and node.params == self.params
        return node_exists

    def create_new_node(self):
        return GroupNode(self.params)


class ParamBranch:
    def __init__(self, param, configuration):
        self.param = param
        self.configuration = configuration

    def key_from_task(self, task):
        return task.get_param_value_key_to_param(self.param, self.configuration)

    def exists_node(self, node):
        #if self.param.get_metadata("deprecated_param_value") == "":
        #    return None, None
        node_exists = type(node) == ParamNode and node.param == self.param

        return node_exists

    def create_new_node(self):
        return ParamNode(self.param)

class CodeVersionBranch:
    def __init__(self, code_versions):
        self.code_versions = code_versions

    def key_from_task(self, task):
        for code_version in self.code_versions:
            if code_version["uuid"] == task.code_version:
                return code_version["name"]
        raise IndexError("No code version with uuid " + task.code_version)

    def exists_node(self, node):
        node_exists = type(node) == CodeVersionNode
        return node_exists

    def create_new_node(self):
        return CodeVersionNode()


class CollapseBranch(ParamBranch):
    def __init__(self, param, configuration):
        super().__init__(param, configuration)

    def exists_node(self, node):
        node_exists = type(node) == CollapseNode and node.param == self.param
        return node_exists

    def create_new_node(self):
        return CollapseNode(self.param)


class View:

    def __init__(self, configuration, root, branch_options):
        self.configuration = configuration
        self.params = self.configuration.sorted_params()
        self.branch_options = branch_options

        self.root_node = RootNode()
        self.root_node.set_child("default", TasksNode())
        self.root_path = root
        self.task_by_uuid = {}

    def initialize(self, tasks):
        for task in tasks:
            self.add_task(task, False)
        self._check_filesystem(self.root_node.children["default"], self.root_path)

    def _insert_new_node(self, task, node, branching_option, key, path, change_dirs):
        first_task = node.get_first_task_in()
        if first_task is None:
            return None

        former_key = branching_option.key_from_task(first_task)
        if former_key == key:
            return None
        else:
            new_node = branching_option.create_new_node()

        node = self._add_node_before_node(node, new_node, former_key, path, change_dirs)
        return node

    def add_task(self, task, change_dirs=True):
        path = self.root_path
        node = self.root_node.children["default"]
        for branching_option in self.branch_options:
            node_exists = branching_option.exists_node(node)
            key = branching_option.key_from_task(task)

            if key is None:
                continue

            if not node_exists:
                new_node = self._insert_new_node(task, node, branching_option, key, path, change_dirs)
                if new_node is None:
                    continue
                else:
                    node = new_node

            if path is not None:
                path = path / key
            if key not in node.children:
                node.set_child(key, TasksNode())

                if path is not None and change_dirs:
                    path.mkdir()

            node = node.children[key]

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
            del children[str(i + 1)]
            (path / str(i + 1)).rename((path / str(i)))

        self._check_node_for_removal(node, path)

        del self.task_by_uuid[str(task.uuid)]

    def add_param(self, param):
        insert_index = 0
        while insert_index < len(self.params) and self.params[insert_index].get_metadata("sorting") < param.get_metadata("sorting"):
            insert_index += 1

        self.params.insert(insert_index, param)
        self._add_node_with_param(param, self.root_node.children["default"], self.root_path)

    def _add_node_with_param(self, param, root, path):
        if (type(root) == ParamNode and root.param.get_metadata("sorting") > param.get_metadata("sorting")) or type(root) == TasksNode:
            first_task = root.get_first_task_in()
            if first_task is not None:
                former_param_value_key = first_task.get_param_value_key_to_param(param, self.configuration)

                tasks = root.get_all_contained_tasks()
                tasks_with_different_param_value = []
                for task in tasks:
                    if task.get_param_value_key_to_param(param, self.configuration) != former_param_value_key:
                        tasks_with_different_param_value.append(task)

                if len(tasks_with_different_param_value) > 0:
                    new_node = ParamNode(param)
                    self._add_node_before_node(root, new_node, former_param_value_key, path)

                    for task in tasks_with_different_param_value:
                        self.remove_task(task)
                        self.add_task(task)
        else:

            for key in root.children:
                self._add_node_with_param(param, root.children[key], path / key)

    def remove_param(self, param):
        if param in self.params:
            self.params.remove(param)
            self._remove_nodes_with_param(param, self.root_node.children["default"], self.root_path)

    def _remove_nodes_with_param(self, param, root, path):
        if type(root) == ParamNode and root.param == param:
            tasks = []
            for key in list(root.children.keys())[1:]:
                tasks.extend(self._remove_subtree(root.children[key], path / key))

            self._remove_param_at_node(root, path)
            for task in tasks:
                self.add_task(task)

        elif type(root) != TasksNode:
            for key in root.children:
                self._remove_nodes_with_param(param, root.children[key], path / key)

    def _remove_subtree(self, root, path):
        tasks = root.get_all_contained_tasks()
        for task in tasks:
            del self.task_by_uuid[str(task.uuid)]

        root.remove_subtree()
        self._remove_path(path)
        return tasks

    def _check_node_for_removal(self, node, path):
        if len(node.children) == 0 and type(node.parent) != RootNode:
            del node.parent.children[node.parent_key]
            self._remove_path(path)
            self._check_node_for_removal(node.parent, path.parent)
        elif len(node.children) == 1 and type(node) in [ParamNode, CodeVersionNode]:
            self._remove_param_at_node(node, path)

    def _remove_param_at_node(self, node, path):
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

    def _add_node_before_node(self, node, new_node, key, path, change_dirs=True):
        node.insert_as_parent(key, new_node)

        if path is not None and change_dirs:
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


    def _comp_tasks(self, first_task, second_task):
        return first_task.creation_time < second_task.creation_time

    def _insert_task(self, node, path, task, change_dirs=True):
        if task in node.children.values():
            task = task
        children = node.children
        self.task_by_uuid[str(task.uuid)] = node

        target_key = len(children.keys())
        for i in range(len(children.keys())):
            if not self._comp_tasks(children[str(i)], task):
                target_key = i
                break

        for i in reversed(range(target_key, len(children.keys()))):
            children[str(i + 1)] = children[str(i)]

            if path is not None and change_dirs:
                if not (path / str(i)).exists():
                    task = task
                (path / str(i)).rename((path / str(i + 1)))

        children[str(target_key)] = task

        if path is not None and change_dirs:
            (path / str(target_key)).symlink_to(task.build_save_dir(), True)

    def _check_filesystem(self, node, path):
        if type(node) in [ParamNode, CodeVersionNode] or type(node) == TasksNode:
            if path.exists() and not path.is_dir():
                self._remove_path(path)

            path.mkdir(exist_ok=True)

            for child in path.iterdir():
                if not child.is_dir() or child.name not in node.children.keys():
                    self._remove_path(child)

            for dir in node.children.keys():
                self._check_filesystem(node.children[dir], path / dir)
        elif type(node) == TaskWrapper:
            if path.exists() and (not path.is_symlink() or path.resolve(True) != node.build_save_dir()):
                self._remove_path(path)

            if not path.is_symlink():
                path.symlink_to(node.build_save_dir(), True)

    def _remove_path(self, path):
        if path.is_symlink() or path.exists():
            if path.is_file() or path.is_symlink():
                path.unlink()
            else:
                shutil.rmtree(str(path))