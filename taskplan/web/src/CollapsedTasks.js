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
                        showTask={this.props.showTask}
                        highlight={tasks[0].task.uuid === this.props.highlightedTask}
                        filterLikeTask={this.props.filterLikeTask}
                        devices={this.props.devices}
                    />
                    <div onClick={this.toggleCollapsed}>{this.state.collapsed ? "Expand" : "Collapse"}</div>
                    {!this.state.collapsed && tasks.slice(1).map(task => (
                        <PausedTask
                            rerunTask={this.props.rerunTask}
                            key={task.task.uuid}
                            task={task.task}
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