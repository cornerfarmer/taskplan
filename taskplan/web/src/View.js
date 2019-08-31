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

    removeSubtree() {
        delete this.parent.children[this.parentKey];
    }

    getFirstTaskIn() {
        if (Object.keys(this.children).length > 0)
            return this.children[Object.keys(this.children)[0]].getFirstTaskIn();
        else
            return null;
    }

    getAllContainedTasks() {
        let tasks = [];
        for (let child of Object.values(this.children)) {
            tasks = tasks.concat(child.getAllContainedTasks());
        }
        return tasks;
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

    getAllContainedTasks() {
        return Object.values(this.children);
    }
}

class View {
    constructor(includeCodeVersion) {
        this.root = new RootNode();
        this.root.setChild("default", new TasksNode());
        this.taskByUuid = {};
        this.tasks = {};
        this.presets = [];
        this.presetsByUuid = {};
        this.includeCodeVersion = includeCodeVersion;
    }

    presetCompare(a, b) {
        if (a.sorting !== b.sorting)
            return a.sorting - b.sorting;
        else
            return a.uuid.localeCompare(b.uuid);
    }

    updatePresets(presets) {
        for (let preset of presets) {
            this.presetsByUuid[preset.uuid] = preset;
        }

        let sortedPresets = presets.slice().sort((a, b) => this.presetCompare(a, b));

        for (let i = 0; i < this.presets.length; i++) {
            if (sortedPresets.findIndex(x => x.uuid === this.presets[i].uuid) === - 1) {
                this.removePreset(this.presets[i]);
                i--;
            }
        }

        for (let i = 0; i < sortedPresets.length; i++) {
            if (i >= this.presets.length) {
                this.addPreset(sortedPresets[i], i);
                continue;
            }

            if (this.presets[i].uuid !== sortedPresets[i].uuid) {
                if (this.presets.findIndex(x => x.uuid === sortedPresets[i].uuid) !== -1) {
                    const preset = this.presets.find(x => x.uuid === sortedPresets[i].uuid);
                    this.removePreset(preset);
                }
                this.addPreset(sortedPresets[i], i);

                if (this.presets[i].uuid !== sortedPresets[i].uuid)
                    throw new Error("Error with the presets in the view");
            } else {
                this.presets[i] = sortedPresets[i];
            }
        }
    }

    addPreset(preset, insert_index) {
        this.presets.splice(insert_index, 0, preset);
        this.addNodeWithPreset(preset, this.root.children["default"]);
    }

    addNodeWithPreset(preset, root) {
        if ((root instanceof PresetNode && this.presetCompare(this.presetsByUuid[root.preset], preset) > 0) || root instanceof TasksNode) {
            const firstTask = root.getFirstTaskIn();
            if (firstTask !== null) {
                const formerChoiceKey = this.getChoiceKeyToPreset(this.tasks[firstTask], preset);

                const tasks = root.getAllContainedTasks();
                let tasksWithDifferentChoice = [];
                for (let task of tasks) {
                    if (this.getChoiceKeyToPreset(this.tasks[task], preset) !== formerChoiceKey)
                        tasksWithDifferentChoice.push(task);
                }

                if (tasksWithDifferentChoice.length > 0) {
                    let newNode = new PresetNode(preset.uuid);
                    this.addPresetBeforeNode(root, newNode, formerChoiceKey);

                    for (let task of tasksWithDifferentChoice) {
                        this.removeTask(this.tasks[task]);
                        this.addTask(this.tasks[task]);
                    }
                }
            }
        } else {
            for (let key in root.children)
                this.addNodeWithPreset(preset, root.children[key]);
        }
    }

    removePreset(preset) {
        if (this.presets.includes(preset)) {
            this.presets.splice(this.presets.indexOf(preset), 1);
            this.removeNodesWithPreset(preset, this.root.children["default"]);
        }
    }

    removeNodesWithPreset(preset, root) {
        if (root instanceof PresetNode && root.preset === preset.uuid) {
            let tasks = [];
            for (let key of Object.keys(root.children).slice(1)) {
                tasks = tasks.concat(this.removeSubtree(root.children[key]))
            }

            root.remove();
            for (let task of tasks)
                this.addTask(this.tasks[task]);
        } else if (!(root instanceof TasksNode)) {
            for (let key in root.children)
                this.removeNodesWithPreset(preset, root.children[key]);
        }
    }

    removeSubtree(root) {
        const tasks = root.getAllContainedTasks();
        for (let task of tasks) {
            delete this.taskByUuid[task.uuid];
        }

        root.removeSubtree();
        return tasks;
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

                key = this.getChoiceKeyToPreset(task, branching_option);
                nodeExists = node instanceof PresetNode && node.preset === branching_option.uuid;

            } else if (branching_option === "code_version") {
                key = task.version;
                nodeExists = node instanceof CodeVersionNode
            } else {
                throw new Error("Invalid branching option");
            }

            if (!nodeExists) {
                const firstTask = node.getFirstTaskIn();
                if (firstTask === null)
                    continue;

                let newNode, formerKey;
                if (typeof branching_option === "object") {
                    formerKey = this.getChoiceKeyToPreset(this.tasks[firstTask], branching_option);
                    if (formerKey === key)
                        continue;
                    else {
                        newNode = new PresetNode(branching_option.uuid);
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
        const key = parseInt(this.keyInDict(node.children, task.uuid));

        delete node.children[key];
        let i = key;
        while (i + 1 in node.children) {
            node.children[i] = node.children[i + 1];
            delete node.children[i + 1];
            i++;
        }

        this.checkNodeForRemoval(node);

        delete this.taskByUuid[task.uuid];
    }

    keyInDict(dict, value) {
        return Object.keys(dict).find(key => dict[key] === value);

    }

    checkNodeForRemoval(node) {
        if (Object.keys(node.children).length === 0 && !(node.parent instanceof RootNode)) {
            delete node.parent.children[node.parentKey];
            this.checkNodeForRemoval(node.parent)
        } else if (Object.keys(node.children).length === 1 && (node instanceof PresetNode || node instanceof CodeVersionNode)) {
            node.remove();
        }
    }

    addPresetBeforeNode(node, newNode, formerKey) {
        node.insertAsParent(formerKey, newNode);
        return newNode;
    }

    getChoiceToPreset(task, preset) {
        let suitableChoice = null;
        let args = [];
        for (const choice of task.choices) {
            if (choice[0].preset === preset.uuid) {
                suitableChoice = choice[0];
                args = choice.slice(1);
                break;
            }
        }

        if (suitableChoice === null)
            return [preset.deprecated_choice, args];
        else
            return [suitableChoice, args];
    }

    getChoiceKeyToPreset(task, preset) {
        let choice = this.getChoiceToPreset(task, preset);
        return this.getKeyToChoice(choice);
    }

    getKeyToChoice(choice) {
        let key = choice[0].name;

        for (let i = 0; i < choice[1].length; i++) {
            key = key.replace("$T" + (i) + "$", choice[1][i]);
        }

        return key
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
            choices.unshift([this.presetsByUuid[node.parent.preset], ...this.getChoiceToPreset(task, this.presetsByUuid[node.parent.preset])]);
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
                const suitableChoice = preset.choices.find((choice) => choice.uuid === selectedChoices[preset.uuid][0]);
                const suitableKey = this.getKeyToChoice([suitableChoice, selectedChoices[preset.uuid].slice(1)]);

                if (node instanceof TasksNode || node.preset !== preset.uuid) {
                    const firstTask = node.getFirstTaskIn();
                    if (firstTask === null)
                        return [];

                    const formerChoiceKey = this.getChoiceKeyToPreset(this.tasks[firstTask], preset);
                    if (formerChoiceKey === suitableKey)
                        continue;
                    else
                        return [];
                }

                if (!(suitableKey in node.children)) {
                    return [];
                }

                node = node.children[suitableKey]
            }
        }

        if (!(node instanceof TasksNode))
            throw new Error("Error in selecting tasks");

        return Object.values(node.children);
    }


}

export default View;