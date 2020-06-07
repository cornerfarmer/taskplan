import React from 'react';
import Prompt from "./Prompt";
import {TaskName} from "./Task";
import State from "./Global";
import ReassuringPrompt from "./ReassuringPrompt";
import PausedTask from "./PausedTask";
import CollapsedTasks from "./CollapsedTasks";

class GroupedTasks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false
        };

        this.toggleCollapsed = this.toggleCollapsed.bind(this);
    }

    toggleCollapsed() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render() {
        if (Object.values(this.props.tasks).length > 0) {
            if ((Object.values(this.props.tasks)[0]) instanceof Array) {
                return Object.values(this.props.tasks).map((tasks, i) => (
                        <CollapsedTasks
                            tasks={tasks}
                            key={tasks[0] !== null ? tasks[0].uuid : i}
                            rerunTask={this.rerunTask}
                            showTask={this.props.showTask}
                            filterLikeTask={this.props.filterLikeTask}
                            devices={this.props.devices}
                        />
                    ));
            } else {
                return Object.keys(this.props.tasks).sort((a, b) => a.localeCompare(b)).map((group) => (
                    <div key={group} className="param-group">
                        <div className="group-header" onClick={() => this.toggleCollapsed()}>
                            <div className="title">{group}</div>
                        </div>
                        {!this.state.collapsed &&
                            <div className="group-tasks">
                                <GroupedTasks
                                    tasks={this.props.tasks[group]}
                                    rerunTask={this.props.rerunTask}
                                    showTask={this.props.showTask}
                                    filterLikeTask={this.props.filterLikeTask}
                                    devices={this.props.devices}
                                />
                            </div>
                        }
                    </div>
                ));
            }
        } else {
            return "";
        }
    }
}

export default GroupedTasks;