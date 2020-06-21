import React from 'react';
import View from "./View";
import ParamTab from "./ParamTab";
import TaskTab from "./TaskTab";
import ParamViewer from "./ParamViewer";

class TaskContainer extends React.Component {
    constructor(props) {
        super(props);
        this.filterHasUpdated = this.filterHasUpdated.bind(this);
        this.updateParams = this.updateParams.bind(this);
        this.updateTasks = this.updateTasks.bind(this);
        this.toggleSelection = this.toggleSelection.bind(this);
        this.addParamCollapse = this.addParamCollapse.bind(this);
        this.removeParamCollapse = this.removeParamCollapse.bind(this);
        this.addParamGroup = this.addParamGroup.bind(this);
        this.removeParamGroup = this.removeParamGroup.bind(this);
        this.replaceUuidsWithTasks = this.replaceUuidsWithTasks.bind(this);
        this.loadFilter = this.loadFilter.bind(this);
        this.saveFilter = this.saveFilter.bind(this);
    }

    componentDidMount() {
        this.props.repository.onChange("tasks", this.updateTasks);
        this.props.repository.onChange("params", this.updateParams);
        this.updateParams(this.props.repository.params);
        this.updateTasks(this.props.repository.task_list);
        this.filterHasUpdated();
    }

    componentWillUnmount() {
        this.props.repository.removeOnChange("tasks", this.updateTasks);
        this.props.repository.removeOnChange("params", this.updateParams);
    }


    replaceUuidsWithTasks(tasks, task_lookup) {
        for (let key in tasks) {
            if (tasks[key] instanceof Object && !("uuid" in tasks[key])) {
                this.replaceUuidsWithTasks(tasks[key],task_lookup);
            } else {
                let task = tasks[key];
                let replacement = {"name": task.name, "metrics": task.metrics};
                if (task.uuid in this.props.repository.tasks)
                    replacement["task"] = this.props.repository.tasks[task.uuid];
                else {
                    replacement["task"] = null;
                    fetch("/task_details/" + task.uuid)
                        .then(res => res.json())
                        .then(
                            (result) => {
                            }
                        )
                }
                task_lookup[task.uuid] = replacement;
                tasks[key] = replacement;
            }
        }
    }

    filterHasUpdated() {
        var data = new FormData();
        var dataJson = {};
        if (this.state.paramFilterEnabled) {
            dataJson['filter'] = this.state.selectedParamValues;
        } else {
            dataJson['filter'] = {};
        }
        dataJson['collapse'] = this.state.collapsedParams;
        dataJson['group'] = this.state.groupedParams;
        dataJson['sort_col'] = this.state.sorting_tasks[0];
        dataJson['sort_dir'] = this.state.sorting_tasks[1] ? "DESC" : "ASC";

        data.append("data", JSON.stringify(dataJson));

        let self = this;
        fetch("filter_tasks", {
                method: "POST",
                body: data
            })
            .then(res => res.json())
            .then(
                (result) => {
                    let task_lookup = {};
                    console.log(result);
                    this.replaceUuidsWithTasks(result[0], task_lookup);
                    console.log(result);
                    self.setState({
                        tasks: result[0], 
                        metric_superset: result[1].sort(),
                        task_lookup: task_lookup
                    })
                },
                (error) => {

                }
            );

    }

    saveFilter(saveName) {
        var data = new FormData();
        var dataJson = {};
        if (this.state.paramFilterEnabled) {
            dataJson['filter'] = this.state.selectedParamValues;
        } else {
            dataJson['filter'] = {};
        }
        dataJson['collapse'] = this.state.collapsedParams;
        dataJson['group'] = this.state.groupedParams;
        dataJson['saveName'] = saveName;

        data.append("data", JSON.stringify(dataJson));

        fetch("save_filter", {
                method: "POST",
                body: data
            })
    }

    loadFilter(data) {
        this.setState({
            selectedParamValues: data.filter,
            collapsedParams: data.collapse,
            groupedParams: data.group,
        }, () =>this.filterHasUpdated());
    }

    updateParams(params) {
        params = Object.values(params);
       // this.filterView.updateParams(params);

        let paramsByGroup = {};
        for (const param of params) {
            const group = param.group.length > 0 ? param.group[0] : '';
            if (!(group in paramsByGroup))
                paramsByGroup[group] = [];
            paramsByGroup[group].push(param);
        }

        this.setState({
            params: params,
            paramsByGroup: paramsByGroup
        });
    }

    updateTasks(all_tasks, changed) {
        let task_lookup = Object.assign({}, this.state.task_lookup);
        if (changed in task_lookup) {
            task_lookup[changed].task = all_tasks[changed];
        }
        this.setState({
            task_lookup: task_lookup,
            tasks: (this.state.tasks instanceof Array ? this.state.tasks.slice() : Object.assign({}, this.state.tasks))
        });
    }

    toggleSelection(param, value, args) {
        const selectedParamValues = Object.assign({}, this.state.selectedParamValues);

        if (value === null) {
            if (param.uuid in selectedParamValues) {
                delete selectedParamValues[param.uuid];
            } else {
                selectedParamValues[param.uuid] = [];
            }
        } else {
            const newValue = [value.uuid, ...args];
            if (param.uuid in selectedParamValues) {
                const existingIndex = selectedParamValues[param.uuid].findIndex(paramValue => newValue.length === paramValue.length && newValue.every((value, index) => value === paramValue[index]));
                if (existingIndex !== -1)
                    selectedParamValues[param.uuid].splice(existingIndex, 1);
                else
                    selectedParamValues[param.uuid].push(newValue);
            } else {
                selectedParamValues[param.uuid] = [newValue];
            }
        }

        this.setState({
            selectedParamValues: selectedParamValues
        },() => this.filterHasUpdated());
    }

    addParamCollapse(param) {
        let collapsedParams = this.state.collapsedParams.slice();

        let index = collapsedParams.indexOf(param.uuid);
        if (index === -1) {
            collapsedParams.push(param.uuid);
        }

        this.setState({collapsedParams: collapsedParams}, () =>this.filterHasUpdated());
    }

    removeParamCollapse(param) {
        let collapsedParams = this.state.collapsedParams.slice();

        let index = collapsedParams.indexOf(param.uuid);
        if (index !== -1) {
            collapsedParams.splice(index, 1);
            ;
        }

        this.setState({collapsedParams: collapsedParams}, () =>this.filterHasUpdated());
    }


    addParamGroup(params) {
        if (params.length === 0)
            return;

        for (let i = 0; i < params.length; i++)
            params[i] = params[i].uuid;
        let groupedParams = this.state.groupedParams.slice();

        groupedParams.push(params);

        this.setState({groupedParams: groupedParams}, () =>this.filterHasUpdated());
    }

    arraysEqual(a, b) {
      if (a === b) return true;
      if (a == null || b == null) return false;
      if (a.length != b.length) return false;

      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }

    removeParamGroup(params) {
        let groupedParams = this.state.groupedParams.slice();

        let index = -1;
        for (let i = 0; i < groupedParams.length; i++) {
            if (this.arraysEqual(groupedParams[i], params)) {
                index = i;
            }
        }
        if (index !== -1) {
            groupedParams.splice(index, 1);
        }

        this.setState({groupedParams: groupedParams}, () =>this.filterHasUpdated());
    }





}


export default TaskContainer;
