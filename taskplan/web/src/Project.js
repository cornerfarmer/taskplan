import React from 'react';
import View from "./View";
import ParamTab from "./ParamTab";
import TaskTab from "./TaskTab";
import ParamViewer from "./ParamViewer";
import TaskContainer from "./TaskContainer";

class Project extends TaskContainer {
    constructor(props) {
        super(props);
        this.state = {
            params: [],
            paramsByGroup: {},
            tasks: {},
            task_lookup: {},
            activeTab: 0,
            sorting_tasks: [0, true],
            sorting_params: ["saved", false],
            selectedParamValues: {},
            collapsedParams: [],
            groupedParams: [],
            paramFilterEnabled: false,
            paramSortingMode: false
        };

        this.toggleShowAbstract = this.toggleShowAbstract.bind(this);
        this.showTab = this.showTab.bind(this);
        this.onChangeSorting = this.onChangeSorting.bind(this);
        this.switchSortingDirection = this.switchSortingDirection.bind(this);
        this.openParamViewer = this.openParamViewer.bind(this);
        this.toggleParamFilter = this.toggleParamFilter.bind(this);
        this.toggleParamSortingMode = this.toggleParamSortingMode.bind(this);
        this.filterLikeTask = this.filterLikeTask.bind(this);

        this.paramViewerRef = React.createRef();
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
        if (this.state.activeTab === 0) {
            const sorting_params = this.state.sorting_params.slice();
            sorting_params[0] = parseInt(e.target.value);
            this.setState({sorting_params: sorting_params});
        } else {
            const sorting_tasks = this.state.sorting_tasks.slice();
            sorting_tasks[0] = e.target.value;
            this.setState({sorting_tasks: sorting_tasks}, () => this.filterHasUpdated());
        }
    }

    switchSortingDirection() {
        if (this.state.activeTab === 0) {
            const sorting_params = this.state.sorting_params.slice();
            sorting_params[1] = !sorting_params[1];
            this.setState({sorting_params: sorting_params});
        } else {
            const sorting_tasks = this.state.sorting_tasks.slice();
            sorting_tasks[1] = !sorting_tasks[1];
            this.setState({sorting_tasks: sorting_tasks}, () => this.filterHasUpdated());
        }
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
                        <select value={this.state.sorting_tasks[0]} onChange={this.onChangeSorting}>
                            <option value="saved">Saved</option>
                            <option value="name">Name</option>
                            <option value="created">Created</option>
                            <option value="iterations">Iterations</option>
                            <option value="started">Started</option>
                        </select>
                        <span onClick={this.switchSortingDirection} className={this.state.sorting_tasks[1] ? "fa fa-sort-amount-down" : "fa fa-sort-amount-up"}></span>

                        <span className={this.state.paramFilterEnabled ? "fas fa-sliders-h filter-enabled" : "fas fa-sliders-h"} onClick={this.openParamViewer}></span>
                    </div>
                    }
                </div>
                <ParamTab
                    active={this.state.activeTab === 0}
                    paramsByGroup={this.state.paramsByGroup}
                    sorting={this.state.sorting_params}
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
