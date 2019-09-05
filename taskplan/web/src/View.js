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

class ParamNode extends Node {
    constructor(param) {
        super();
        this.param = param;
    }
}


class CodeVersionNode extends Node {
    constructor() {
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
        this.params = [];
        this.paramsByUuid = {};
        this.includeCodeVersion = includeCodeVersion;
    }

    paramCompare(a, b) {
        if (a.sorting !== b.sorting)
            return a.sorting - b.sorting;
        else
            return a.uuid.localeCompare(b.uuid);
    }

    updateParams(params) {
        for (let param of params) {
            this.paramsByUuid[param.uuid] = param;
        }

        let sortedParams = params.slice().sort((a, b) => this.paramCompare(a, b));

        for (let i = 0; i < this.params.length; i++) {
            if (sortedParams.findIndex(x => x.uuid === this.params[i].uuid) === - 1) {
                this.removeParam(this.params[i]);
                i--;
            }
        }

        for (let i = 0; i < sortedParams.length; i++) {
            if (i >= this.params.length) {
                this.addParam(sortedParams[i], i);
                continue;
            }

            if (this.params[i].uuid !== sortedParams[i].uuid) {
                if (this.params.findIndex(x => x.uuid === sortedParams[i].uuid) !== -1) {
                    const param = this.params.find(x => x.uuid === sortedParams[i].uuid);
                    this.removeParam(param);
                }
                this.addParam(sortedParams[i], i);

                if (this.params[i].uuid !== sortedParams[i].uuid)
                    throw new Error("Error with the params in the view");
            } else {
                this.params[i] = sortedParams[i];
            }
        }
    }

    addParam(param, insert_index) {
        this.params.splice(insert_index, 0, param);
        this.addNodeWithParam(param, this.root.children["default"]);
    }

    addNodeWithParam(param, root) {
        if ((root instanceof ParamNode && this.paramCompare(this.paramsByUuid[root.param], param) > 0) || root instanceof TasksNode) {
            const firstTask = root.getFirstTaskIn();
            if (firstTask !== null) {
                const formerValueKey = this.getValueKeyToParam(this.tasks[firstTask], param);

                const tasks = root.getAllContainedTasks();
                let tasksWithDifferentParamValue = [];
                for (let task of tasks) {
                    if (this.getValueKeyToParam(this.tasks[task], param) !== formerValueKey)
                        tasksWithDifferentParamValue.push(task);
                }

                if (tasksWithDifferentParamValue.length > 0) {
                    let newNode = new ParamNode(param.uuid);
                    this.addParamBeforeNode(root, newNode, formerValueKey);

                    for (let task of tasksWithDifferentParamValue) {
                        this.removeTask(this.tasks[task]);
                        this.addTask(this.tasks[task]);
                    }
                }
            }
        } else {
            for (let key in root.children)
                this.addNodeWithParam(param, root.children[key]);
        }
    }

    removeParam(param) {
        if (this.params.includes(param)) {
            this.params.splice(this.params.indexOf(param), 1);
            this.removeNodesWithParam(param, this.root.children["default"]);
        }
    }

    removeNodesWithParam(param, root) {
        if (root instanceof ParamNode && root.param === param.uuid) {
            let tasks = [];
            for (let key of Object.keys(root.children).slice(1)) {
                tasks = tasks.concat(this.removeSubtree(root.children[key]))
            }

            root.remove();
            for (let task of tasks)
                this.addTask(this.tasks[task]);
        } else if (!(root instanceof TasksNode)) {
            for (let key in root.children)
                this.removeNodesWithParam(param, root.children[key]);
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
        branching_options = branching_options.concat(this.params);

        for (const branching_option of branching_options) {
            let key, nodeExists, suitableParamValue;
            if (typeof branching_option === "object") {
                if (branching_option.deprecated_param_value === '')
                    continue;

                key = this.getValueKeyToParam(task, branching_option);
                nodeExists = node instanceof ParamNode && node.param === branching_option.uuid;

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
                    formerKey = this.getValueKeyToParam(this.tasks[firstTask], branching_option);
                    if (formerKey === key)
                        continue;
                    else {
                        newNode = new ParamNode(branching_option.uuid);
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

                node = this.addParamBeforeNode(node, newNode, formerKey)
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
        } else if (Object.keys(node.children).length === 1 && (node instanceof ParamNode || node instanceof CodeVersionNode)) {
            node.remove();
        }
    }

    addParamBeforeNode(node, newNode, formerKey) {
        node.insertAsParent(formerKey, newNode);
        return newNode;
    }

    getValueToParam(task, param) {
        let suitableValue = null;
        let args = [];
        for (const paramValue of task.paramValues) {
            if (paramValue[0].param === param.uuid) {
                suitableValue = paramValue[0];
                args = paramValue.slice(1);
                break;
            }
        }

        if (suitableValue === null)
            return [param.deprecated_param_value, param.deprecated_param_value.template_deprecated !== undefined ? param.deprecated_param_value.template_deprecated : []];
        else
            return [suitableValue, args];
    }

    getValueKeyToParam(task, param) {
        let value = this.getValueToParam(task, param);
        return this.getKeyToParamValue(value);
    }

    getKeyToParamValue(paramValue) {
        let key = paramValue[0].name;

        for (let i = 0; i < paramValue[1].length; i++) {
            key = key.replace("$T" + (i) + "$", paramValue[1][i]);
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

    getNodeParamValuePath(node, task) {
        let values = [];
        while (!(node instanceof RootNode) && !(node.parent instanceof RootNode) && !(node instanceof CodeVersionNode) && !(node.parent instanceof CodeVersionNode)) {
            values.unshift([this.paramsByUuid[node.parent.param], ...this.getValueToParam(task, this.paramsByUuid[node.parent.param])]);
            node = node.parent;
        }
        return values;
    }

    getSelectedTask(selectedParamValues, codeVersion=null) {
        let node = this.root.children["default"];

        if (node instanceof CodeVersionNode) {
            if (!(codeVersion in node.children)) {
                return [];
            }
            node = node.children[codeVersion]
        }

        for (const param of this.params) {
            if (param.deprecated_param_value !== '') {
                const suitableParamValue = param.values.find((value) => value.uuid === selectedParamValues[param.uuid][0]);
                const suitableKey = this.getKeyToParamValue([suitableParamValue, selectedParamValues[param.uuid].slice(1)]);

                if (node instanceof TasksNode || node.param !== param.uuid) {
                    const firstTask = node.getFirstTaskIn();
                    if (firstTask === null)
                        return [];

                    const formerParamValueKey = this.getValueKeyToParam(this.tasks[firstTask], param);
                    if (formerParamValueKey === suitableKey)
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