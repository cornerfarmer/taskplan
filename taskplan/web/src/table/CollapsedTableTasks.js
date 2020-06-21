import React from 'react';
import TableRowTask from "./TableRowTask";
import GroupedTableTasks from "./GroupedTableTasks";

class CollapsedTableTasks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: true
        };

        this.toggleCollapsed = this.toggleCollapsed.bind(this);
    }

    toggleCollapsed() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render() {
        let tasks = Object.values(this.props.tasks).filter(task => task.task !== null);
        if (tasks.length > 0) {
            return (
                <React.Fragment>
                    <TableRowTask
                        key={tasks[0].task.uuid}
                        task={tasks[0].task}
                        name={tasks[0].name}
                        metrics={tasks[0].metrics}
                        metric_superset={this.props.metric_superset}
                    />
                    {tasks.length > 1 &&
                        <div class="collapse-toggle" onClick={this.toggleCollapsed}>{
                            this.state.collapsed
                                ?
                                <div><i className="fas fa-angle-double-down"></i> {"Expand (" + tasks.length + ")"}</div>
                                :
                                <div><i className="fas fa-angle-double-up"></i> Collapse</div>
                        }</div>
                    }
                    {!this.state.collapsed && tasks.slice(1).map(task => (
                        <TableRowTask
                            key={task.task.uuid}
                            task={task.task}
                            name={task.name}
                            metrics={task.metrics}
                            metric_superset={this.props.metric_superset}
                        />
                    ))}
                </React.Fragment>
            );
        } else {
            return "";
        }
    }
}

export default CollapsedTableTasks;