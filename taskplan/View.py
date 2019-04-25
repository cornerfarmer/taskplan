from taskplan.TaskWrapper import TaskWrapper
import shutil
try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path

class View:

    def __init__(self, presets, root):
        self.presets = []
        for preset in presets:
            self.presets.append({"preset": preset, "visible_choices": 0})

        self.state = {
            "type": "root",
            "parent": None,
            "children": {
                "default": {
                    "type": "tasks",
                    "children": {}
                }
            }
        }
        self.state["children"]["default"]["parent"] = self.state
        self.state["children"]["default"]["parent_key"] = "default"
        self.root = root
        self.task_by_uuid = {}

    def initialize(self, tasks):
        for task in tasks:
            self.add_task(task, False)
        self._check_filesystem(self.state["children"]["default"], self.root)

    def add_task(self, task, change_dirs=True):
        current_path = self.root
        current_state = self.state["children"]["default"]
        for preset in self.presets:
            suitable_choice = self._get_choice_to_preset(task, preset)

            if suitable_choice is not None:
                name = suitable_choice.get_metadata("name")
                if current_state["type"] == "tasks" or current_state["preset"] != preset:
                    first_task = self._get_first_task_in(current_state)
                    if first_task is None:
                        continue

                    former_choice = self._get_choice_to_preset(first_task, preset)
                    if former_choice == suitable_choice:
                        continue

                    current_state = self._add_preset_before_state(current_state, preset, former_choice, current_path, change_dirs)

                current_path = current_path / name
                if name not in current_state["children"]:
                    current_state["children"][name] = {
                        "type": "preset",
                        "parent": current_state,
                        "parent_key": name,
                        "preset": preset,
                        "children": {}
                    }

                    if change_dirs:
                        current_path.mkdir()

                current_state = current_state["children"][name]
            else:
                raise NotImplementedError()

        current_state["type"] = "tasks"
        if "type" not in current_state:
            current_state["children"] = {}

        self._insert_task(current_state, current_path, task, change_dirs)

    def remove_task(self, task):
        state = self.task_by_uuid[str(task.uuid)]
        path = self._path_of_state(state)
        children = state["children"]
        key = int(self._key_in_dict(children, task))

        self._remove_path(path / str(key))
        del children[str(key)]
        for i in range(key, len(children)):
            children[str(i)] = children[str(i + 1)]
            (path / str(i + 1)).rename((path / str(i)))

        self._check_state_for_removal(state, path)

        del self.task_by_uuid[str(task.uuid)]

    def _check_state_for_removal(self, state, path):
        if len(state["children"]) == 0 and state["parent"]["type"] != "root":
            del state["parent"]["children"][state["parent_key"]]
            self._remove_path(path)
            self._check_state_for_removal(state["parent"], path.parent)
        elif len(state["children"]) == 1 and state["type"] == "preset":
            self._remove_preset_at_state(state, path)

    def _remove_preset_at_state(self, state, path):
        assert(len(state["children"]) == 1)
        parent = state["parent"]
        key = list(state["children"].keys())[0]
        path = path / key

        child = state["children"][key]
        parent["children"][state["parent_key"]] = child
        child["parent"] = state["parent"]
        child["parent_key"] = state["parent_key"]

        for child_path in path.iterdir():
            assert(child_path.name != path.name)
            child_path.rename(path.parent / child_path.name)
        self._remove_path(path)

    def _path_of_state(self, state):
        path = None
        while state["type"] != "root" and state["parent"]["type"] != "root":
            if path is None:
                path = Path(state["parent_key"])
            else:
                path = state["parent_key"] / path
            state = state["parent"]
        return self.root if path is None else self.root / path

    def _add_preset_before_state(self, state, preset, former_choice, path, change_dirs=True):
        parent = state["parent"]
        key = former_choice.get_metadata("name")
        new_state = {
            "type": "preset",
            "preset": preset,
            "parent": parent,
            "parent_key": state["parent_key"],
            "children": {
                key: state
            }
        }
        parent["children"][state["parent_key"]] = new_state
        state["parent"] = new_state
        state["parent_key"] = key

        if change_dirs:
            (path / key).mkdir()
            for child_path in path.iterdir():
                if child_path.name != key:
                    child_path.rename(path / key / child_path.name)

        return new_state

    def _key_in_dict(self, dictionary, value_to_find):
        for key, value in dictionary.items():
            if value == value_to_find:
                return key
        return None

    def _get_choice_to_preset(self, task, preset):
        suitable_choice = None
        for choice in task.preset.base_presets:
            if choice.get_metadata("preset") == str(preset["preset"].uuid):
                suitable_choice = choice
                break
        return suitable_choice

    def _get_first_task_in(self, state):
        if type(state) == TaskWrapper:
            return state

        children = state["children"]
        if len(children.keys()) > 0:
            return self._get_first_task_in(children[list(children.keys())[0]])
        else:
            return None

    def _comp_tasks(self, first_task, second_task):
        return first_task.creation_time < second_task.creation_time

    def _insert_task(self, state, path, task, change_dirs=True):
        children = state["children"]
        self.task_by_uuid[str(task.uuid)] = state

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

    def _check_filesystem(self, state, path):
        if type(state) == dict:
            if path.exists() and not path.is_dir():
                self._remove_path(path)

            path.mkdir(exist_ok=True)

            for child in path.iterdir():
                if not path.is_dir() or path.name not in state["children"].keys():
                    self._remove_path(child)

            for dir in state["children"].keys():
                self._check_filesystem(state["children"][dir], path / dir)
        elif type(state) == TaskWrapper:
            if path.exists() and (not path.is_symlink() or path.resolve(True) != state.build_save_dir()):
                self._remove_path(path)

            if not path.is_symlink():
                path.symlink_to(state.build_save_dir(), True)

    def _remove_path(self, path):
        if path.exists():
            if path.is_file() or path.is_symlink():
                path.unlink()
            else:
                shutil.rmtree(str(path))