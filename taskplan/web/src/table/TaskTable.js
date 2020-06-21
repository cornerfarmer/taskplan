import React from 'react';
import GroupedTableTasks from "./GroupedTableTasks";

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
                    {["name", "iterations"].concat(this.props.metric_superset).map(name => (
                        <th>{name} <i className="fas fa-caret-down" onClick={() => this.props.changeSorting(name, true)}></i><i className="fas fa-caret-up" onClick={() => this.props.changeSorting(name, false)}></i></th>
                        )
                    )}
                </tr>
                </thead>
                <tbody>
                    <GroupedTableTasks
                        tasks={this.props.tasks}
                        metric_superset={this.props.metric_superset}
                    />
                </tbody>
            </table>
        );
    }
}


export default TaskTable;
