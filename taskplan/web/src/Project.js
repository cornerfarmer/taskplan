import React from 'react';
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
            sorting_tasks: ["saved", true],
            sorting_params: [0, false],
            selectedParamValues: {},
            collapsedParams: [],
            groupedParams: [],
            paramSortingMode: false,
            paramSorting: {},
            collapseSorting: ["saved", true],
            metric_superset: [],
            taskTabInitialized: false,
            versionInName: "label",
            showSearchBar: false,
            searchValue: "",
            forceParamInName: {},
            collapseEnabled: false
        };

        this.toggleShowAbstract = this.toggleShowAbstract.bind(this);
        this.showTab = this.showTab.bind(this);
        this.onChangeSorting = this.onChangeSorting.bind(this);
        this.switchSortingDirection = this.switchSortingDirection.bind(this);
        this.openParamViewer = this.openParamViewer.bind(this);
        this.toggleParamSortingMode = this.toggleParamSortingMode.bind(this);
        this.filterLikeTask = this.filterLikeTask.bind(this);
        this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
        this.searchBarKeyDown = this.searchBarKeyDown.bind(this);

        this.addView = this.addView.bind(this);
        this.paramViewerRef = React.createRef();
        this.taskTabRef = React.createRef();
    }

    addView(name) {
        var data = new FormData();
        var dataJson = {};
        dataJson['filter'] = this.state.selectedParamValues;
        dataJson['collapse'] = this.state.collapsedParams;
        dataJson['collapse_sorting'] = this.state.collapseSorting;
        dataJson['group'] = this.state.groupedParams;
        dataJson['param_sorting'] = this.state.paramSorting;
        dataJson['sorting_tasks'] = this.state.sorting_tasks;
        dataJson['name'] = name;
        dataJson['path'] = null;
        dataJson['version_in_name'] = this.state.versionInName;
        dataJson['force_param_in_name'] = this.state.forceParamInName;
        dataJson['collapse_enabled'] = this.state.collapseEnabled;


        data.append("data", JSON.stringify(dataJson));

        fetch("add_view", {
            method: "POST",
            body: data
        })
    }


    toggleShowAbstract() {
        this.setState({
            showAbstract: !this.state.showAbstract,
        });
    }

    showTab(tab) {
        this.setState({
            activeTab: tab,
            taskTabInitialized: this.state.taskTabInitialized || tab === 1
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
        const selectedParamValues = {}

        for (const param of this.state.params) {
            let suitableParamValue = null;
            let args = [];
            for (const value of task.paramValues["0"]) {
                if (value[0].param === param.uuid) {
                    suitableParamValue = value[0];
                    args = value.slice(1);
                    break;
                }
            }

            if (suitableParamValue === null)
                selectedParamValues[param.uuid] = [[param.deprecated_param_value.uuid, ...param.deprecated_param_value.template_deprecated]];
            else
                selectedParamValues[param.uuid] = [[suitableParamValue.uuid, ...args]];
        }

        this.setState({
            selectedParamValues: selectedParamValues
        }, () => this.filterHasUpdated());
        this.openParamViewer();
    }

    editTask(task) {
        this.taskTabRef.current.editTask(task);
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

    handleSearchValueChange(event) {
        this.setState({searchValue: event.target.value});
    }

    searchBarKeyDown(e) {
        if(e.keyCode === 13 && this.state.searchValue in this.props.repository.tasks){
            this.props.showTask(this.state.searchValue);
            this.setState({
                showSearchBar: false
            });
        }
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
                        <span onClick={this.toggleParamSortingMode} className={"fas fa-sort"} title="Switch to sorting mode for default naming"></span>
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
                            {this.state.metric_superset.map(col => (
                                <option value={col}>{col}</option>
                            ))}
                        </select>
                        <span onClick={this.switchSortingDirection} title="Switch sorting direction" className={this.state.sorting_tasks[1] ? "fa fa-sort-amount-down" : "fa fa-sort-amount-up"}></span>

                        <span className="fas fa-sliders-h" title="Open filter configurator" onClick={this.openParamViewer}></span>

                        <span className="fas fa-sync-alt" title="Update listing" onClick={this.filterHasUpdated}></span>
                        <span className="fas fa-search" title="Find task by uuid" onClick={() => this.setState({showSearchBar: !this.state.showSearchBar, searchValue: ""})}></span>
                    </div>
                    }
                </div>
                {this.state.showSearchBar &&
                <div className="search-bar">
                    <span>Search:</span>
                    <input value={this.state.searchValue} onKeyDown={this.searchBarKeyDown} placeholder="uuid" onChange={this.handleSearchValueChange} />
                </div>
                }
                <ParamTab
                    active={this.state.activeTab === 0}
                    paramsByGroup={this.state.paramsByGroup}
                    sorting={this.state.sorting_params}
                    paramSortingMode={this.state.paramSortingMode}
                    params={this.state.params}
                />
                <TaskTab
                    ref={this.taskTabRef}
                    closeViewer={this.props.closeViewer}
                    allTags={this.props.allTags}
                    active={this.state.activeTab === 1}
                    params={this.state.params}
                    tasks={this.state.tasks}
                    selectedParamValues={this.state.selectedParamValues}
                    showTask={this.props.showTask}
                    paramsByGroup={this.state.paramsByGroup}
                    highlightedTask={this.props.highlightedTask}
                    filterLikeTask={this.filterLikeTask}
                    devices={this.props.devices}
                    detailCol={this.state.collapseSorting[0]}
                    initialized={this.state.taskTabInitialized}
                    config_path={this.props.config_path}
                />
                <ParamViewer
                    ref={this.paramViewerRef}
                    paramsByGroup={this.state.paramsByGroup}
                    selectedParamValues={this.state.selectedParamValues}
                    toggleSelection={this.toggleSelection}
                    allowClose={true}

                    tags={this.props.allTags}
                    codeVersions={this.props.codeVersions}
                    params={this.state.params}
                    collapsedParams={this.state.collapsedParams}
                    addParamCollapse={this.addParamCollapse}
                    removeParamCollapse={this.removeParamCollapse}
                    groupedParams={this.state.groupedParams}
                    addParamGroup={this.addParamGroup}
                    removeParamGroup={this.removeParamGroup}
                    saveFilter={this.saveFilter}
                    loadFilter={this.loadFilter}
                    views={this.props.views}
                    addView={this.addView}
                    paramSorting={this.state.paramSorting}
                    reorderParam={this.reorderParam}
                    metric_superset={this.state.metric_superset}
                    collapseSorting={this.state.collapseSorting}
                    onChangeCollapseSorting={this.onChangeCollapseSorting}
                    flipCollapseSortingDirection={this.flipCollapseSortingDirection}
                    onChangeVersionInName={this.onChangeVersionInName}
                    versionInName={this.state.versionInName}
                    tensorboard_ports={this.props.tensorboard_ports}
                    forceParamInName={this.state.forceParamInName}
                    onChangeForceParamInName={this.onChangeForceParamInName}
                    collapseEnabled={this.state.collapseEnabled}
                    toggleCollapse={this.toggleCollapse}
                />
            </div>
        );
    }
}


export default Project;
