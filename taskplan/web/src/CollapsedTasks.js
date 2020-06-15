import React from 'react';
import Prompt from "./Prompt";
import {TaskName} from "./Task";
import State from "./Global";
import ReassuringPrompt from "./ReassuringPrompt";
import PausedTask from "./PausedTask";

class CollapsedTasks extends React.Component {
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
                <div>
                    <PausedTask
                        rerunTask={this.props.rerunTask}
                        key={tasks[0].task.uuid}
                        task={tasks[0].task}
                        name={tasks[0].name}
                        showTask={this.props.showTask}
                        highlight={tasks[0].task.uuid === this.props.highlightedTask}
                        filterLikeTask={this.props.filterLikeTask}
                        devices={this.props.devices}
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
                        <PausedTask
                            rerunTask={this.props.rerunTask}
                            key={task.task.uuid}
                            task={task.task}
                            name={task.name}
                            showTask={this.props.showTask}
                            highlight={task.task.uuid === this.props.highlightedTask}
                            filterLikeTask={this.props.filterLikeTask}
                            devices={this.props.devices}
                        />
                    ))}
                </div>
            );
        } else {
            return "";
        }
    }
}

export default CollapsedTasks;