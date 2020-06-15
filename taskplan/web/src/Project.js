import React from 'react';
import View from "./View";
import ParamTab from "./ParamTab";
import TaskTab from "./TaskTab";
import ParamViewer from "./ParamViewer";

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            params: [],
            paramsByGroup: {},
            tasks: {},
            task_lookup: {},
            activeTab: 0,
            sorting: [0, "saved"],
            sortingDescending: [true, true],
            selectedParamValues: {},
            collapsedParams: [],
            groupedParams: [],
            paramFilterEnabled: false,
            paramSortingMode: false
        };
        this.filterHasUpdated = this.filterHasUpdated.bind(this);
        this.updateParams = this.updateParams.bind(this);
        this.updateTasks = this.updateTasks.bind(this);
        this.addParam = this.addParam.bind(this);
        this.toggleShowAbstract = this.toggleShowAbstract.bind(this);
        this.showTab = this.showTab.bind(this);
        this.onChangeSorting = this.onChangeSorting.bind(this);
        this.switchSortingDirection = this.switchSortingDirection.bind(this);
        this.openParamViewer = this.openParamViewer.bind(this);
        this.toggleSelection = this.toggleSelection.bind(this);
        this.toggleParamFilter = this.toggleParamFilter.bind(this);
        this.toggleParamSortingMode = this.toggleParamSortingMode.bind(this);
        this.filterLikeTask = this.filterLikeTask.bind(this);
        this.addParamCollapse = this.addParamCollapse.bind(this);
        this.removeParamCollapse = this.removeParamCollapse.bind(this);
        this.addParamGroup = this.addParamGroup.bind(this);
        this.removeParamGroup = this.removeParamGroup.bind(this);
        this.replaceUuidsWithTasks = this.replaceUuidsWithTasks.bind(this);
        this.loadFilter = this.loadFilter.bind(this);
        this.saveFilter = this.saveFilter.bind(this);
        this.paramViewerRef = React.createRef();
    }

    componentDidMount() {
        this.props.repository.onChange("tasks", this.updateTasks);
        this.props.repository.onChange("params", this.updateParams);
        this.props.repository.onAdd("params", this.addParam);
        this.updateParams(this.props.repository.params);
        this.updateTasks(this.props.repository.task_list);
        this.filterHasUpdated();
    }

    componentWillUnmount() {
        this.props.repository.removeOnChange("tasks", this.updateTasks);
        this.props.repository.removeOnChange("params", this.updateParams);
        this.props.repository.removeOnAdd("params", this.addParam);
    }

    addParam(param) {
        let numberOfTasksPerParamValue = Object.assign({}, this.state.numberOfTasksPerParamValue);

        for (let task of Object.values(this.state.tasks)) {
            let paramValue = task.paramValues.find(paramValue => paramValue[0].param === param.uuid);

            let paramValueKey;
            if (paramValue !== undefined) {
                paramValueKey = paramValue[0].uuid;
            } else {
                paramValueKey = param.uuid + "_deprecated"
            }

            if (!(paramValueKey in numberOfTasksPerParamValue))
                numberOfTasksPerParamValue[paramValueKey] = [];
            numberOfTasksPerParamValue[paramValueKey].push([task.uuid, paramValue !== undefined ? paramValue.slice(1) : []]);
        }

        this.setState({
            numberOfTasksPerParamValue: numberOfTasksPerParamValue
        });
    }

    replaceUuidsWithTasks(tasks, task_lookup) {
        for (let key in tasks) {
            if (tasks[key] instanceof Object && !("uuid" in tasks[key])) {
                this.replaceUuidsWithTasks(tasks[key],task_lookup);
            } else {
                let task = tasks[key];
                let replacement = {"name": task.name};
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
        dataJson['sort_col'] = this.state.sorting[1];
        dataJson['sort_dir'] = this.state.sortingDescending[1] ? "DESC" : "ASC";

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
                    this.replaceUuidsWithTasks(result, task_lookup);
                    console.log(result);
                    self.setState({
                        tasks: result,
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

    toggleShowAbstract() {
        this.setState({
            showAbstract: !this.state.showAbstract,
        });
    }

    showTab(tab) {
        this.setState({
            activeTab: tab,
        });
    }

    onChangeSorting(e) {
        const sorting = this.state.sorting.slice();
        sorting[this.state.activeTab] = this.state.activeTab === 1 ? e.target.value : parseInt(e.target.value);
        this.setState({sorting: sorting}, (this.state.activeTab === 1 ? () => this.filterHasUpdated(): null));
    }

    switchSortingDirection() {
        const sortingDescending = this.state.sortingDescending.slice();
        sortingDescending[this.state.activeTab] = !sortingDescending[this.state.activeTab];
        this.setState({sortingDescending: sortingDescending}, (this.state.activeTab === 1 ? () => this.filterHasUpdated(): null));
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

    filterLikeTask(task) {
        const selectedParamValues = Object.assign({}, this.state.selectedParamValues);

        for (const param of this.state.params) {
            let value = this.filterView.getValueToParam(task, param);
            selectedParamValues[param.uuid] = [[value[0].uuid, ...value[1]]];
        }

        this.setState({
            selectedParamValues: selectedParamValues,
            paramFilterEnabled: true
        }, () => this.filterHasUpdated());
        this.openParamViewer();
    }

    toggleParamFilter() {
        let paramFilterEnabled = !this.state.paramFilterEnabled;
        this.setState({
            paramFilterEnabled: paramFilterEnabled
        }, () => this.filterHasUpdated());
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        /*if (prevProps.current_code_version !== this.props.current_code_version)
            this.updateVisibleTasks();
        if (prevProps.highlightedTask !== this.props.highlightedTask && this.props.highlightedTask !== null) {
            this.setState({
                paramFilterEnabled: false,
                activeTab: 1
            }, () => this.updateVisibleTasks());
        }*/
    }

    openParamViewer() {
        this.props.closeViewer();
        this.paramViewerRef.current.open();
    }

    toggleParamSortingMode() {
        this.setState({
            paramSortingMode: !this.state.paramSortingMode
        });
    }

    render() {
        return (
            <div className="project">
                <div className="tabs">
                    <div className={this.state.activeTab === 0 ? "tab-active" : ""} onClick={() => this.showTab(0)}>Parameters</div>
                    <div className={this.state.activeTab === 1 ? "tab-active" : ""} onClick={() => this.showTab(1)}>Tasks</div>
                </div>
                <div className="sorting">
                    {this.state.activeTab === 0 &&
                    <div>
                        <span onClick={this.toggleParamSortingMode} className={"fas fa-sort"}></span>
                    </div>
                    }
                    {this.state.activeTab === 1 &&
                    <div>
                        <label>Sorting:</label>
                        <select value={this.state.sorting[1]} onChange={this.onChangeSorting}>
                            <option value="saved">Saved</option>
                            <option value="name">Name</option>
                            <option value="created">Created</option>
                            <option value="iterations">Iterations</option>
                            <option value="started">Started</option>
                        </select>
                        <span onClick={this.switchSortingDirection} className={this.state.sortingDescending[this.state.activeTab] ? "fa fa-sort-amount-down" : "fa fa-sort-amount-up"}></span>

                        <span className={this.state.paramFilterEnabled ? "fas fa-sliders-h filter-enabled" : "fas fa-sliders-h"} onClick={this.openParamViewer}></span>
                    </div>
                    }
                </div>
                <ParamTab
                    active={this.state.activeTab === 0}
                    paramsByGroup={this.state.paramsByGroup}
                    sorting={this.state.sorting}
                    sortingDescending={this.state.sortingDescending}
                    paramSortingMode={this.state.paramSortingMode}
                    params={this.state.params}
                    numberOfTasksPerParamValue={this.state.numberOfTasksPerParamValue}
                />
                <TaskTab
                    active={this.state.activeTab === 1}
                    params={this.state.params}
                    tasks={this.state.tasks}
                    selectedParamValues={this.state.selectedParamValues}
                    paramFilterEnabled={this.state.paramFilterEnabled}
                    sorting={this.state.sorting}
                    sortingDescending={this.state.sortingDescending}
                    showTask={this.props.showTask}
                    paramsByGroup={this.state.paramsByGroup}
                    highlightedTask={this.props.highlightedTask}
                    filterLikeTask={this.filterLikeTask}
                    devices={this.props.devices}
                />
                <ParamViewer
                    ref={this.paramViewerRef}
                    paramsByGroup={this.state.paramsByGroup}
                    selectedParamValues={this.state.selectedParamValues}
                    toggleSelection={this.toggleSelection}
                    toggleParamFilter={this.toggleParamFilter}
                    paramFilterEnabled={this.state.paramFilterEnabled}

                    params={this.state.params}
                    collapsedParams={this.state.collapsedParams}
                    addParamCollapse={this.addParamCollapse}
                    removeParamCollapse={this.removeParamCollapse}
                    groupedParams={this.state.groupedParams}
                    addParamGroup={this.addParamGroup}
                    removeParamGroup={this.removeParamGroup}
                    saveFilter={this.saveFilter}
                    loadFilter={this.loadFilter}
                    saved_filters={this.props.saved_filters}
                />
            </div>
        );
    }
}


export default Project;
