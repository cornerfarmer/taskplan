import React from 'react';
import TableRowTask from "./TableRowTask";
import GroupedTableTasks from "./GroupedTableTasks";
import LazyLoad from "react-lazyload";

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
        let tasks = Object.values(this.props.tasks);
        if (tasks.length > 0) {
            return (
                <React.Fragment>
                    <LazyLoad once={true} key={tasks[0].uuid} height={40} offset={[0, 0]} scrollContainer=".project" resize={true} overflow={true}>
                        <TableRowTask
                            uuid={tasks[0].uuid}
                            task={tasks[0].task}
                            name={tasks[0].name}
                            metrics={tasks[0].metrics}
                            selectedCols={this.props.selectedCols}
                        />
                    </LazyLoad>
                    {tasks.length > 1 &&
                        <tr><td class="collapse-toggle" onClick={this.toggleCollapsed}  colSpan={this.props.selectedCols.length}>{
                            this.state.collapsed
                                ?
                                <div><i className="fas fa-angle-double-down"></i> {"Expand (" + tasks.length + ")"}</div>
                                :
                                <div><i className="fas fa-angle-double-up"></i> Collapse</div>
                        }</td></tr>
                    }
                    {!this.state.collapsed && tasks.slice(1).map(task => (
                        <LazyLoad key={tasks.uuid} height={40} offset={[0, 0]} scrollContainer=".project" resize={true} overflow={true}>
                            <TableRowTask
                                uuid={task.uuid}
                                task={task.task}
                                name={task.name}
                                metrics={task.metrics}
                                selectedCols={this.props.selectedCols}
                            />
                        </LazyLoad>
                    ))}
                </React.Fragment>
            );
        } else {
            return "";
        }
    }
}

export default CollapsedTableTasks;