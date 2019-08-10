class Node {
    constructor() {
        this.children = {};
        this.parent = null;
        this.parentKey = "";
    }

    setChild(key, child) {
        this.children[key] = child;
        child.parent = this;
        child.parentKey = key;
    }

    insertAsParent(key, newParent) {
        this.parent.setChild(this.parentKey, newParent);
        newParent.setChild(key, this);
    }

    remove() {
        const key = Object.keys(this.children)[0];

        let child = this.children[key];
        this.parent.children[this.parentKey] = child;
        child.parent = this.parent;
        child.parentKey = this.parentKey;
        return key;
    }

    getFirstTaskIn() {
        if (Object.keys(this.children).length > 0)
            return this.children[Object.keys(this.children)[0]].getFirstTaskIn();
        else
            return null;
    }
}

class RootNode extends Node {

}

class PresetNode extends Node {
    constructor(preset) {
        super();
        this.preset = preset;
    }
}


class CodeVersionNode extends Node {
    constructor(preset) {
        super();
    }
}

class TasksNode extends Node {
    getFirstTaskIn() {
        if (Object.keys(this.children).length > 0)
            return this.children["0"];
        else
            return null;
    }
}

class View {
    constructor(includeCodeVersion) {
        this.root = new RootNode();
        this.root.setChild("default", new TasksNode());
        this.taskByUuid = {};
        this.tasks = {};
        this.presets = [];
        this.includeCodeVersion = includeCodeVersion;
    }

    updatePresets(presets) {
        this.presets = presets;
    }

    updateTasks(tasks) {
        this.tasks = tasks;
    }

    updateTask(task) {
        this.tasks[task.uuid] = task;
    }

    addTasks(tasks) {
        for (const task of tasks)
            this.addTask(task);
    }

    addTask(task) {
        this.tasks[task.uuid] = task;
        let node = this.root.children["default"];
        let branching_options = [];
        if (this.includeCodeVersion)
            branching_options.push("code_version");
        branching_options = branching_options.concat(this.presets);

        for (const branching_option of branching_options) {
            let key, nodeExists, suitableChoice;
            if (typeof branching_option === "object") {
                if (branching_option.deprecated_choice === '')
                    continue;

                suitableChoice = this.getChoiceToPreset(task, branching_option);
                key = suitableChoice.name;
                nodeExists = node instanceof PresetNode && node.preset === branching_option;

            } else if (branching_option === "code_version") {
                key = task.version;
                nodeExists = node instanceof CodeVersionNode
            } else {
                throw "";
            }

            if (!nodeExists) {
                const firstTask = node.getFirstTaskIn();
                if (firstTask === null)
                    continue;

                let newNode, formerKey;
                if (typeof branching_option === "object") {
                    const formerChoice = this.getChoiceToPreset(this.tasks[firstTask], branching_option);
                    if (formerChoice === suitableChoice)
                        continue;
                    else {
                        newNode = new PresetNode(branching_option);
                        formerKey = formerChoice.name;
                    }
                } else if (branching_option === "code_version") {
                    if (this.tasks[firstTask].version === key)
                        continue;
                    else {
                        newNode = new CodeVersionNode();
                        formerKey = this.tasks[firstTask].version;
                    }
                } else {
                    throw "";
                }

                node = this.addPresetBeforeNode(node, newNode, formerKey)
            }

            if (!(key in node.children)) {
                node.setChild(key, new TasksNode())
            }

            node = node.children[key]
        }

        this.insertTask(node, task)
    }

    removeTask(task) {
        let node = this.taskByUuid[task.uuid];
        const key = parseInt(this.keyInDict(node.children, task));

        delete node.children[key];
        let i = key;
        while (i + 1 in node.children) {
            node.children[i] = node.children[i + 1];
            i++;
        }

        delete this.taskByUuid[task.uuid];
    }

    keyInDict(dict, value) {
        return Object.keys(dict).find(key => dict[key] === value);

    }

    checkNodeForRemoval(node) {
        if (Object.keys(node.children).length === 0 && !(node.parent instanceof RootNode)) {
            delete node.parent.children[node.parentKey];
            this.checkNodeForRemoval(node.parent)
        } else if (Object.keys(node.children).length === 1 && node.parent instanceof PresetNode) {
            node.remove();
        }
    }

    addPresetBeforeNode(node, newNode, formerKey) {
        node.insertAsParent(formerKey, newNode);
        return newNode;
    }

    getChoiceToPreset(task, preset) {
        let suitableChoice = null;
        for (const choice of task.choices) {
            if (choice.preset === preset.uuid) {
                suitableChoice = choice;
                break;
            }
        }

        if (suitableChoice === null)
            return preset.deprecated_choice;
        else
            return suitableChoice;
    }

    compTasks(firstTask, secondTask) {
        return this.tasks[firstTask].creation_time < this.tasks[secondTask].creation_time;
    }

    insertTask(node, task) {
        this.taskByUuid[task.uuid] = node;
        const keys = Object.keys(node.children);

        let targetKey = keys.length;
        for (let i = 0; i < keys.length; i++) {
            if (!this.compTasks(node.children[i], task.uuid)) {
                targetKey = i;
                break;
            }
        }

        for (let i = keys.length - 1; i >= targetKey; i--) {
            node.children[i + 1] = node.children[i];
        }

        node.children[targetKey] = task.uuid;
    }

    getNodeChoicePath(node, task) {
        let choices = [];
        while (!(node instanceof RootNode) && !(node.parent instanceof RootNode) && !(node instanceof CodeVersionNode) && !(node.parent instanceof CodeVersionNode)) {
            choices.unshift([node.parent.preset, this.getChoiceToPreset(task, node.parent.preset)]);
            node = node.parent;
        }
        return choices;
    }

    getSelectedTask(selectedChoices, codeVersion=null) {
        let node = this.root.children["default"];

        if (node instanceof CodeVersionNode) {
            if (!(codeVersion in node.children)) {
                return [];
            }
            node = node.children[codeVersion]
        }

        for (const preset of this.presets) {
            if (preset.deprecated_choice !== '') {
                const suitableChoice = preset.choices.find((choice) => choice.uuid === selectedChoices[preset.uuid]);

                if (node instanceof TasksNode || node.preset !== preset) {
                    const firstTask = node.getFirstTaskIn();
                    if (firstTask === null)
                        return [];

                    const formerChoice = this.getChoiceToPreset(this.tasks[firstTask], preset);
                    if (formerChoice === suitableChoice)
                        continue;
                    else
                        return [];
                }

                if (!(suitableChoice.name in node.children)) {
                    return [];
                }

                node = node.children[suitableChoice.name]
            }
        }

        if (!(node instanceof TasksNode))
            throw Exception("Error in selecting tasks");

        return Object.values(node.children);
    }


}

export default View;