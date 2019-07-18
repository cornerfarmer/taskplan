import State from "./Global";
import Scheduler from "./Scheduler";
import View from "./View";

class Repository {
    constructor(evtSource) {
        this.evtSource = evtSource;       
        this.presets = {};
        this.projects = {};
        this.choices = {};
        this.tasks = {};
        this.codeVersions = {};
        this.onChangeListeners = {
            "presets": [],
            "projects": [],
            "choices": [],
            "tasks": [],
            "codeVersions": []
        };
        this.onAddListeners = {
            "presets": [],
            "projects": [],
            "choices": [],
            "tasks": [],
            "codeVersions": []
        };
        this.onRemoveListeners = {
            "presets": [],
            "projects": [],
            "choices": [],
            "tasks": [],
            "codeVersions": []
        };
        
        this.evtSource.addEventListener("PROJECT_CHANGED", (e) => {
            const changedProject = JSON.parse(e.data);
            this.updateEntity(this.projects, changedProject, "projects", "name");
        });

        this.evtSource.addEventListener("CODE_VERSION_CHANGED", (e) => {
            const changedCodeVersion = JSON.parse(e.data);
            changedCodeVersion.time = new Date(changedCodeVersion.time * 1000);
            this.updateEntity(this.codeVersions, changedCodeVersion, "codeVersions");
        });

        this.evtSource.addEventListener("PRESET_CHANGED", (e) => {
            const changedPreset = JSON.parse(e.data);

            if (changedPreset.uuid in this.presets) {
                changedPreset.choices = this.presets[changedPreset.uuid].choices;
            } else {
                changedPreset.choices = [];
            }
            if (changedPreset.deprecated_choice in this.choices)
                changedPreset.deprecated_choice = this.choices[changedPreset.deprecated_choice];
            if (changedPreset.default_choice in this.choices)
                changedPreset.default_choice = this.choices[changedPreset.default_choice];

            this.updateEntity(this.presets, changedPreset, "presets");
        });

        this.evtSource.addEventListener("CHOICE_CHANGED", (e) => {
            const changedChoice = JSON.parse(e.data);

            changedChoice.creation_time = new Date(changedChoice.creation_time * 1000);

            this.updateEntity(this.choices, changedChoice, "choices");

            let preset = this.presets[changedChoice.preset];
            const previousIndex = preset.choices.findIndex(function (e) {
                return e.uuid === changedChoice.uuid
            });

            if (previousIndex >= 0) {
                preset.choices[previousIndex] = changedChoice;
            } else {
                preset.choices.push(changedChoice);
            }
            this.updateEntity(this.presets, preset, "presets");

            preset = Object.values(this.presets).find((preset) => preset.deprecated_choice === changedChoice.uuid);
            if (preset !== undefined) {
                preset.deprecated_choice = changedChoice;
                this.updateEntity(this.presets, preset, "presets");
            }
            preset = Object.values(this.presets).find((preset) => preset.default_choice === changedChoice.uuid);
            if (preset !== undefined) {
                preset.default_choice = changedChoice;
                this.updateEntity(this.presets, preset, "presets");
            }
        });

        this.evtSource.addEventListener("TASK_CHANGED", (e) => {
            const changedTask = JSON.parse(e.data);

            changedTask.creation_time = new Date(changedTask.creation_time * 1000);
            changedTask.saved_time = new Date(changedTask.saved_time * 1000);
            changedTask.choices = changedTask.choices.map(e => this.choices[e]);
            for (let checkpoint of changedTask.checkpoints) {
                checkpoint.time = new Date(checkpoint.time * 1000);
            }

            if (changedTask.state === State.RUNNING) {
                if (changedTask.uuid in this.tasks) {
                    if (changedTask.finished_iterations !== this.tasks[changedTask.uuid].finished_iterations) {
                        changedTask.mean_iteration_time = (changedTask.iteration_update_time - (this.tasks[changedTask.uuid].iteration_update_time === 0 ? changedTask.start_time : this.tasks[changedTask.uuid].iteration_update_time)) / (changedTask.finished_iterations - this.tasks[changedTask.uuid].finished_iterations);
                        changedTask.total_time = parseInt(changedTask.iteration_update_time - changedTask.start_time + changedTask.mean_iteration_time * (changedTask.total_iterations - changedTask.finished_iterations));
                    } else {
                        changedTask.mean_iteration_time = this.tasks[changedTask.uuid].mean_iteration_time;
                        changedTask.total_time = this.tasks[changedTask.uuid].total_time;
                    }
                }
                changedTask.start_time_timestamp = changedTask.start_time;
                changedTask.start_time = new Date(changedTask.start_time * 1000);
                Scheduler.refreshRunTime(changedTask);
            }

            if (changedTask.uuid in this.tasks) {
                changedTask.name = this.tasks[changedTask.uuid].name;
                changedTask.try = this.tasks[changedTask.uuid].try;
                changedTask.nameChoices = this.tasks[changedTask.uuid].nameChoices;
            }

            this.updateEntity(this.tasks, changedTask, "tasks");
        });

        this.evtSource.addEventListener("TASK_REMOVED", (e) => {
            const changedTask = JSON.parse(e.data);
            this.removeEntity(this.tasks, changedTask, "tasks")
        });


        this.standardView = new View(true);
        this.onAdd("tasks", (task) => {
            this.standardView.addTask(task);

            for (const key of Object.keys(this.tasks)) {
                let node = this.standardView.taskByUuid[key];
                this.tasks[key].nameChoices = this.standardView.getNodeChoicePath(node, this.tasks[key]);
                this.tasks[key].try = this.standardView.keyInDict(node.children, key);
            }
        });
        this.onRemove("tasks", (task) => {
            this.standardView.removeTask(task);
        });
        this.onChange("presets", (presets) => {
            this.standardView.updatePresets(Object.values(presets));
        });
        this.onChange("tasks", (tasks) => {
            this.standardView.updateTasks(tasks);
        });
    }

    updateEntity(entities, newEntity, entityType, key="uuid") {
        const isNew = !(newEntity[key] in entities);
        entities[newEntity[key]] = newEntity;

        if (isNew)
            this.throwOnAddEvent(newEntity, entityType);
        this.throwOnChangeEvent(entities, entityType);
    }

    removeEntity(entities, entityToRemove, entityType, key="uuid") {
        delete entities[entityToRemove[key]];

        this.throwOnRemoveEvent(entityToRemove, entityType);
        this.throwOnChangeEvent(entities, entityType);
    }

    throwOnChangeEvent(entities, entityType) {
        let entitiesClone = Object.assign({}, entities);
        for (let listener of this.onChangeListeners[entityType]) {
            listener(entitiesClone);
        }
    }

    throwOnAddEvent(entity, entityType) {
        for (let listener of this.onAddListeners[entityType]) {
            listener(entity);
        }
    }

    throwOnRemoveEvent(entity, entityType) {
        for (let listener of this.onRemoveListeners[entityType]) {
            listener(entity);
        }
    }

    onChange(entityType, listener) {
        this.onChangeListeners[entityType].push(listener);
    }

    removeOnChange(entityType, listener) {
        const listenerIndex = this.onChangeListeners[entityType].findIndex(listener);
        if (listenerIndex >= 0)
            this.onChangeListeners[entityType].splice(listenerIndex, 1);
    }

    onAdd(entityType, listener) {
        this.onAddListeners[entityType].push(listener);
    }

    removeOnAdd(entityType, listener) {
        const listenerIndex = this.onAddListeners[entityType].findIndex(listener);
        if (listenerIndex >= 0)
            this.onAddListeners[entityType].splice(listenerIndex, 1);
    }

    onRemove(entityType, listener) {
        this.onRemoveListeners[entityType].push(listener);
    }

    removeOnRemove(entityType, listener) {
        const listenerIndex = this.onRemoveListeners[entityType].findIndex(listener);
        if (listenerIndex >= 0)
            this.onRemoveListeners[entityType].splice(listenerIndex, 1);
    }

}

export default Repository;