import State from "./Global";
import Scheduler from "./Scheduler";

class Repository {
    constructor(evtSource) {
        this.evtSource = evtSource;       
        this.presets = {};
        this.projects = {};
        this.choices = {};
        this.tasks = {};
        this.onChangeListener = {
            "presets": [],
            "projects": [],
            "choices": [],
            "tasks": []
        };
        
        this.evtSource.addEventListener("PROJECT_CHANGED", (e) => {
            const changedProject = JSON.parse(e.data);
            this.updateEntity(this.projects, changedProject, "projects", "name");
        });

        this.evtSource.addEventListener("PRESET_CHANGED", (e) => {
            const changedPreset = JSON.parse(e.data);

            if (changedPreset.uuid in this.presets) {
                changedPreset.choices = this.presets[changedPreset.uuid].choices;
            } else {
                changedPreset.choices = [];
            }

            this.updateEntity(this.presets, changedPreset, "presets");
        });

        this.evtSource.addEventListener("CHOICE_CHANGED", (e) => {
            const changedChoice = JSON.parse(e.data);

            changedChoice.creation_time = new Date(changedChoice.creation_time * 1000);

            this.updateEntity(this.choices, changedChoice, "choices");

            const preset = this.presets[changedChoice.preset];
            const previousIndex = preset.choices.findIndex(function (e) {
                return e.uuid === changedChoice.uuid
            });

            if (previousIndex >= 0) {
                preset.choices[previousIndex] = changedChoice;
            } else {
                preset.choices.push(changedChoice);
            }

            this.updateEntity(this.presets, preset, "presets");
        });

        this.evtSource.addEventListener("TASK_CHANGED", (e) => {
            const changedTask = JSON.parse(e.data);

            changedTask.creation_time = new Date(changedTask.creation_time * 1000);
            changedTask.saved_time = new Date(changedTask.saved_time * 1000);
            changedTask.choices = changedTask.choices.map(e => this.choices[e]);

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

            this.updateEntity(this.tasks, changedTask, "tasks");
        });

        this.evtSource.addEventListener("TASK_REMOVED", (e) => {
            const changedTask = JSON.parse(e.data);
            this.removeEntity(this.tasks, changedTask, "tasks")
        });
    }

    
    updateEntity(entities, newEntity, entityType, key="uuid") {
        entities[newEntity[key]] = newEntity;
        this.throwOnChangeEvent(entities, entityType);
    }

    removeEntity(entities, entityToRemove, entityType, key="uuid") {
        delete entities[entityToRemove[key]];
        this.throwOnChangeEvent(entities, entityType);
    }

    throwOnChangeEvent(entities, entityType) {
        let entitiesClone = Object.assign({}, entities);
        for (let listener of this.onChangeListener[entityType]) {
            listener(entitiesClone);
        }
    }

    onChange(entityType, listener) {
        this.onChangeListener[entityType].push(listener);
    }

    removeOnChange(entityType, listener) {
        const listenerIndex = this.onChangeListener[entityType].findIndex(listener);
        if (listenerIndex >= 0)
            this.onChangeListener[entityType].splice(listenerIndex, 1);
    }
}

export default Repository;