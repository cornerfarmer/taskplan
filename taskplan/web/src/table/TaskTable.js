import React from 'react';
import GroupedTableTasks from "./GroupedTableTasks";
import ParamViewer from "../ParamViewer";

class TaskTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <table className="task-table">
                <thead>
                <tr className="task-table-header">
                    {this.props.selectedCols.map(name => (
                        <th>{name} <i className={"fas fa-caret-down " + (this.props.sorting[0] === name && this.props.sorting[1] ? "sort-active" : "")} onClick={() => this.props.changeSorting(name, true)}></i><i className={"fas fa-caret-up " + (this.props.sorting[0] === name && !this.props.sorting[1] ? "sort-active" : "")} onClick={() => this.props.changeSorting(name, false)}></i></th>
                        )
                    )}
                </tr>
                </thead>
                <tbody>
                    <GroupedTableTasks
                        tasks={this.props.tasks}
                        selectedCols={this.props.selectedCols}
                    />
                </tbody>
            </table>
        );
    }
}


export default TaskTable;
