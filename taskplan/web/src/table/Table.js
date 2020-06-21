import React from 'react';
import ParamViewer from "../ParamViewer";
import TaskContainer from "../TaskContainer";
import TaskTable from "./TaskTable";
import TaskTab from "../TaskTab";

class Table extends TaskContainer {
    constructor(props) {
        super(props);
        this.state = {
            params: [],
            paramsByGroup: {},
            tasks: {},
            task_lookup: {},
            sorting_tasks: ["name", true],
            selectedParamValues: {},
            collapsedParams: [],
            groupedParams: [],
        };

        this.changeSorting = this.changeSorting.bind(this);

        this.paramViewerRef = React.createRef();
    }


    changeSorting(name, direction) {
        const sorting_tasks = this.state.sorting_tasks.slice();
        sorting_tasks[0] = name;
        sorting_tasks[1] = direction;
        this.setState({sorting_tasks: sorting_tasks}, () => this.filterHasUpdated());
    }


    render() {
        return (
            <div style={{"display": "flex", "width": "100%"}}>
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
                    open={true}
                    style={{"position": "static"}}
                />
                <div className="task-table-wrapper">
                    <TaskTable
                        params={this.state.params}
                        tasks={this.state.tasks}
                        metric_superset={this.state.metric_superset}
                        changeSorting={this.changeSorting}
                    />
                </div>
            </div>
        );
    }
}


export default Table;
