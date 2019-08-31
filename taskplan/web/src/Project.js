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
            tasks: [],
            activeTab: 0,
            sorting: [0, 4],
            sortingDescending: [true, true],
            selectedParamValues: {},
            selectedTasks: [],
            paramFilterEnabled: false,
            paramSortingMode: false,
            numberOfTasksPerParamValue: {}
        };
        this.updateTasks = this.updateTasks.bind(this);
        this.updateParams = this.updateParams.bind(this);
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.toggleShowAbstract = this.toggleShowAbstract.bind(this);
        this.showTab = this.showTab.bind(this);
        this.onChangeSorting = this.onChangeSorting.bind(this);
        this.switchSortingDirection = this.switchSortingDirection.bind(this);
        this.openParamViewer = this.openParamViewer.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.toggleParamFilter = this.toggleParamFilter.bind(this);
        this.toggleParamSortingMode = this.toggleParamSortingMode.bind(this);
        this.filterLikeTask = this.filterLikeTask.bind(this);
        this.filterView = new View(true);
        this.paramViewerRef = React.createRef();
    }

    componentDidMount() {
        this.props.repository.onChange("tasks", this.updateTasks);
        this.props.repository.onChange("params", this.updateParams);
        this.props.repository.onAdd("tasks", this.addTask);
        this.props.repository.onRemove("tasks", this.removeTask);
        this.updateParams(this.props.repository.params);
        for (let key in this.props.repository.tasks)
            this.addTask(this.props.repository.tasks[key]);
    }

    componentWillUnmount() {
        this.props.repository.removeOnChange("tasks", this.updateTasks);
        this.props.repository.removeOnChange("params", this.updateParams);
        this.props.repository.removeOnAdd("tasks", this.addTask);
        this.props.repository.removeOnRemove("tasks", this.removeTask);
    }

    addTask(task) {
        let numberOfTasksPerParamValue = Object.assign({}, this.state.numberOfTasksPerParamValue);
        if (!task.is_test) {
            if (task.project_name === this.props.project.name) {
                this.filterView.addTask(task);
            }

            for (let paramValue of task.paramValues) {
                if (!(paramValue[0].uuid in numberOfTasksPerParamValue))
                    numberOfTasksPerParamValue[paramValue[0].uuid] = [];
                numberOfTasksPerParamValue[paramValue[0].uuid].push([task.uuid, paramValue.slice(1)]);
            }
        }

        let tasks = Object.assign({}, this.state.tasks);
        tasks[task.uuid] = task;

        this.setState({
            tasks: tasks,
            numberOfTasksPerParamValue: numberOfTasksPerParamValue
        });

        this.updateVisibleTasks();
    }

    removeTask(task) {
        if ( !task.is_test) {
            let numberOfTasksPerParamValue = Object.assign({}, this.state.numberOfTasksPerParamValue);
            for (let paramValue of task.paramValues) {
                if (paramValue[0].uuid in numberOfTasksPerParamValue) {
                    let index = numberOfTasksPerParamValue[paramValue[0].uuid].findIndex(x => x[0] === task.uuid);
                    numberOfTasksPerParamValue[paramValue[0].uuid].splice(index, 1);
                }
            }

            this.setState({
                numberOfTasksPerParamValue: numberOfTasksPerParamValue
            });
        }

        if (task.project_name === this.props.project.name && !task.is_test) {
            this.filterView.removeTask(task);
        }
        this.updateVisibleTasks();
    }

    updateVisibleTasks(selectedParamValues=null, paramFilterEnabled=null) {
        if (selectedParamValues === null)
            selectedParamValues = this.state.selectedParamValues;
        if (paramFilterEnabled === null)
            paramFilterEnabled = this.state.paramFilterEnabled;

        let selectedTasks;
        if (paramFilterEnabled) {
            selectedTasks = this.filterView.getSelectedTask(selectedParamValues, this.props.project.current_code_version);
        } else {
            selectedTasks = Object.keys(this.state.tasks).filter(task => this.state.tasks[task].version === this.props.project.current_code_version);
        }
        this.setState({
            selectedTasks: selectedTasks
        });
    }

    updateParams(params) {
        this.filterView.updateParams(Object.values(params));

        let selectedParamValues = Object.assign({}, this.state.selectedParamValues);

        let paramsByGroup = {};
        for (const param of Object.values(params)) {
            if (!(param.uuid in selectedParamValues) && param.values.length > 0)
                selectedParamValues[param.uuid] = [param.values[0].uuid];

            const group = param.group.length > 0 ? param.group[0] : '';
            if (!(group in paramsByGroup))
                paramsByGroup[group] = [];
            paramsByGroup[group].push(param);
        }

        this.setState({
            params: Object.values(params),
            selectedParamValues: selectedParamValues,
            paramsByGroup: paramsByGroup
        });
    }

    updateTasks(tasks) {
        for (let key in tasks) {
            if (tasks[key].project_name === this.props.project.name)
                this.filterView.updateTask(tasks[key]);
        }

        this.setState({
            tasks: tasks
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
        sorting[this.state.activeTab] = parseInt(e.target.value);
        this.setState({sorting: sorting});
    }

    switchSortingDirection() {
        const sortingDescending = this.state.sortingDescending.slice();
        sortingDescending[this.state.activeTab] = !sortingDescending[this.state.activeTab];
        this.setState({sortingDescending: sortingDescending});
    }

    onSelectionChange(param, value, args) {
        const selectedParamValues = Object.assign({}, this.state.selectedParamValues);

        selectedParamValues[param.uuid] = [value.uuid, ...args];

        this.updateVisibleTasks(selectedParamValues);
        this.setState({
            selectedParamValues: selectedParamValues
        });
    }


    filterLikeTask(task) {
        const selectedParamValues = Object.assign({}, this.state.selectedParamValues);

        for (const param of this.state.params) {
            let value = this.filterView.getValueToParam(task, param);
            selectedParamValues[param.uuid] = [value[0].uuid, ...value[1]];
        }

        this.setState({
            selectedParamValues: selectedParamValues,
            paramFilterEnabled: true
        }, () => this.updateVisibleTasks());
        this.openParamViewer();
    }

    toggleParamFilter() {
        let paramFilterEnabled = !this.state.paramFilterEnabled;
        this.setState({
            paramFilterEnabled: paramFilterEnabled
        });
        this.updateVisibleTasks(null, paramFilterEnabled);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.project.current_code_version !== this.props.project.current_code_version)
            this.updateVisibleTasks();
        if (prevProps.highlightedTask !== this.props.highlightedTask && this.props.highlightedTask !== null) {
            this.setState({
                paramFilterEnabled: false,
                activeTab: 1
            }, () => this.updateVisibleTasks());
        }
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
            <div className="project" style={this.props.visible ? {} : {display: 'none'}}>
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
                                    <option value="0">Finished</option>
                                    <option value="1">Name</option>
                                    <option value="2">Created</option>
                                    <option value="3">Iterations</option>
                                    <option value="4">Started</option>
                                </select>
                                <span onClick={this.switchSortingDirection} className={this.state.sortingDescending[this.state.activeTab] ? "fa fa-sort-amount-down" : "fa fa-sort-amount-up"}></span>

                                <span className={this.state.paramFilterEnabled ? "fas fa-sliders-h filter-enabled" : "fas fa-sliders-h"}onClick={this.openParamViewer}></span>
                            </div>
                        }
                </div>
                <ParamTab
                    active={this.state.activeTab === 0}
                    paramsByGroup={this.state.paramsByGroup}
                    sorting={this.state.sorting}
                    project={this.props.project}
                    sortingDescending={this.state.sortingDescending}
                    paramSortingMode={this.state.paramSortingMode}
                    params={this.state.params}
                    numberOfTasksPerParamValue={this.state.numberOfTasksPerParamValue}
                />
                <TaskTab
                    active={this.state.activeTab === 1}
                    params={this.state.params}
                    project={this.props.project}
                    tasks={this.state.tasks}
                    selectedTasks={this.state.selectedTasks}
                    selectedParamValues={this.state.selectedParamValues}
                    paramFilterEnabled={this.state.paramFilterEnabled}
                    sorting={this.state.sorting}
                    sortingDescending={this.state.sortingDescending}
                    onSelectionChange={this.onSelectionChange}
                    showTask={this.props.showTask}
                    paramsByGroup={this.state.paramsByGroup}
                    highlightedTask={this.props.highlightedTask}
                    filterLikeTask={this.filterLikeTask}
                    devices={this.props.devices}
                />
                <ParamViewer ref={this.paramViewerRef} numberOfTasksPerParamValue={this.state.numberOfTasksPerParamValue} paramsByGroup={this.state.paramsByGroup} selectedParamValues={this.state.selectedParamValues} onSelectionChange={this.onSelectionChange} toggleParamFilter={this.toggleParamFilter} paramFilterEnabled={this.state.paramFilterEnabled}/>
            </div>
        );
    }
}


export default Project;
