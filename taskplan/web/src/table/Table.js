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
            selectedCols: [],
            metric_superset: []
        };

        this.changeSorting = this.changeSorting.bind(this);
        this.addCol = this.addCol.bind(this);
        this.removeCol = this.removeCol.bind(this);

        this.paramViewerRef = React.createRef();
    }


    changeSorting(name, direction) {
        const sorting_tasks = this.state.sorting_tasks.slice();
        sorting_tasks[0] = name;
        sorting_tasks[1] = direction;
        this.setState({sorting_tasks: sorting_tasks}, () => this.filterHasUpdated());
    }

    addCol(col, position_col) {
        if (col !== position_col) {
            const selectedCols = this.state.selectedCols.slice();

            if (selectedCols.findIndex(x => x === col) !== -1)
                selectedCols.splice(selectedCols.findIndex(x => x === col), 1);
            let position = selectedCols.length;
            if (position_col !== null) {
                position = selectedCols.findIndex(x => x === position_col);
            }
            selectedCols.splice(position, 0, col);

            this.setState({selectedCols: selectedCols});
        }
    }

    removeCol(col) {
        if (this.state.selectedCols.findIndex(x => x === col) !== -1) {
            const selectedCols = this.state.selectedCols.slice();
            selectedCols.splice(selectedCols.findIndex(x => x === col), 1);
            this.setState({selectedCols: selectedCols});
        }
    }


    render() {
        return (
            <div style={{"display": "flex", "width": "100%"}}>
                <ParamViewer
                    ref={this.paramViewerRef}
                    paramsByGroup={this.state.paramsByGroup}
                    selectedParamValues={this.state.selectedParamValues}
                    toggleSelection={this.toggleSelection}

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
                    hideViews={true}
                    selectedCols={this.state.selectedCols}
                    allCols={["name", "iterations"].concat(this.state.metric_superset)}
                    addCol={this.addCol}
                    removeCol={this.removeCol}
                />
                <div className="task-table-wrapper">
                    <TaskTable
                        params={this.state.params}
                        tasks={this.state.tasks}
                        selectedCols={this.state.selectedCols}
                        changeSorting={this.changeSorting}
                    />
                </div>
            </div>
        );
    }
}


export default Table;
