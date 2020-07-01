import State from "./Global";
import Scheduler from "./Scheduler";

class Repository {
    constructor(evtSource) {
        this.evtSource = evtSource;       
        this.params = {};
        this.paramValues = {};
        this.tasks = {};
        this.onChangeListeners = {
            "params": [],
            "paramValues": [],
            "tasks": []
        };
        this.onAddListeners = {
            "params": [],
            "paramValues": [],
            "tasks": []
        };
        this.onRemoveListeners = {
            "params": [],
            "paramValues": [],
            "tasks": []
        };

        this.evtSource.addEventListener("PARAM_CHANGED", (e) => {
            const changedParam = JSON.parse(e.data);

            if (changedParam.uuid in this.params) {
                changedParam.values = this.params[changedParam.uuid].values;
            } else {
                changedParam.values = [];
            }
            if (changedParam.deprecated_param_value in this.paramValues)
                changedParam.deprecated_param_value = this.paramValues[changedParam.deprecated_param_value];
            if (changedParam.default_param_value in this.paramValues)
                changedParam.default_param_value = this.paramValues[changedParam.default_param_value];

            this.updateEntity(this.params, changedParam, "params");
        });

        this.evtSource.addEventListener("PARAM_VALUE_CHANGED", (e) => {
            const changedParamValue = JSON.parse(e.data);

            changedParamValue.creation_time = new Date(changedParamValue.creation_time * 1000);

            this.updateEntity(this.paramValues, changedParamValue, "paramValues");

            let param = this.params[changedParamValue.param];
            const previousIndex = param.values.findIndex(function (e) {
                return e.uuid === changedParamValue.uuid
            });

            if (previousIndex >= 0) {
                param.values[previousIndex] = changedParamValue;
            } else {
                param.values.push(changedParamValue);
            }
            this.updateEntity(this.params, param, "params");

            param = Object.values(this.params).find((param) => param.deprecated_param_value === changedParamValue.uuid);
            if (param !== undefined) {
                param.deprecated_param_value = changedParamValue;
                this.updateEntity(this.params, param, "params");
            }
            param = Object.values(this.params).find((param) => param.default_param_value === changedParamValue.uuid);
            if (param !== undefined) {
                param.default_param_value = changedParamValue;
                this.updateEntity(this.params, param, "params");
            }
        });

        this.evtSource.addEventListener("TASK_CHANGED", (e) => {
            const changedTask = JSON.parse(e.data);

            changedTask.creation_time = new Date(changedTask.creation_time * 1000);
            changedTask.saved_time = new Date(changedTask.saved_time * 1000);
            changedTask.paramValues = changedTask.paramValues.map(e => [this.paramValues[e[0]]].concat(e.slice(1)));
            for (let checkpoint of changedTask.checkpoints) {
                checkpoint.time = new Date(checkpoint.time * 1000);
            }

            this.updateEntity(this.tasks, changedTask, "tasks");
        });

        this.evtSource.addEventListener("TASK_REMOVED", (e) => {
            const changedTask = JSON.parse(e.data);
            this.removeEntity(this.tasks, changedTask, "tasks")
        });

        this.evtSource.addEventListener("PARAM_VALUE_REMOVED", (e) => {
            const changedParamValue = JSON.parse(e.data);
            this.removeEntity(this.paramValues, changedParamValue, "paramValues");

            let param = this.params[changedParamValue.param];
            const previousIndex = param.values.findIndex(function (e) {
                return e.uuid === changedParamValue.uuid
            });

            if (previousIndex >= 0) {
                param.values.splice(previousIndex, 1);
                this.updateEntity(this.params, param, "params");
            }
        });

        this.evtSource.addEventListener("PARAM_REMOVED", (e) => {
            const changedParam = JSON.parse(e.data);
            this.removeEntity(this.params, changedParam, "params")
        });

    }

    updateEntity(entities, newEntity, entityType, key="uuid") {
        const isNew = !(newEntity[key] in entities);
        entities[newEntity[key]] = newEntity;

        if (isNew)
            this.throwOnAddEvent(newEntity, entityType);
        this.throwOnChangeEvent(entities, entityType, newEntity[key]);
    }

    removeEntity(entities, entityToRemove, entityType, key="uuid") {
        let entity = entities[entityToRemove[key]];
        delete entities[entityToRemove[key]];

        this.throwOnRemoveEvent(entity, entityType);
        this.throwOnChangeEvent(entities, entityType, entityToRemove[key]);
    }

    throwOnChangeEvent(entities, entityType, key) {
        let entitiesClone = Object.assign({}, entities);
        for (let listener of this.onChangeListeners[entityType]) {
            listener(entitiesClone, key);
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