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
            collapsed: {}
        };

        this.toggleCollapsed = this.toggleCollapsed.bind(this);
    }

    toggleCollapsed(group) {
        let collapsed = Object.assign({}, this.state.collapsed);

        if (!(group in collapsed))
            collapsed[group] = true;
        else
            collapsed[group] = !collapsed[group];

        this.setState({
            collapsed: collapsed
        })
    }

    render() {
        if (Object.values(this.props.tasks).length > 0) {
            if (this.props.tasks instanceof Array) {
                //console.log(this.props.tasks);
                return this.props.tasks.map((tasks, i) => (
                        <CollapsedTasks
                            tasks={tasks}
                            key={tasks[0] !== null ? tasks[0].uuid : i}
                            rerunTask={this.props.rerunTask}
                            editTask={this.props.editTask}
                            showTask={this.props.showTask}
                            filterLikeTask={this.props.filterLikeTask}
                            devices={this.props.devices}
                            detailCol={this.props.detailCol}
                            highlightedTask={this.props.highlightedTask}
                        />
                    ));
            } else {
                return Object.keys(this.props.tasks).sort((a, b) => a.localeCompare(b)).map((group) => (
                    <div key={group} className="param-group">
                        <div className="group-header" onClick={() => this.toggleCollapsed(group)}>
                            <div className="title">
                                {(!(group in this.state.collapsed) || !this.state.collapsed[group])
                                    ?
                                    <i className="fas fa-caret-down"></i>
                                    :
                                    <i className="fas fa-caret-right"></i>
                                }
                                {group}
                            </div>
                        </div>
                        {(!(group in this.state.collapsed) || !this.state.collapsed[group]) &&
                            <div className="group-tasks">
                                <GroupedTasks
                                    tasks={this.props.tasks[group]}
                                    rerunTask={this.props.rerunTask}
                                    editTask={this.props.editTask}
                                    showTask={this.props.showTask}
                                    filterLikeTask={this.props.filterLikeTask}
                                    devices={this.props.devices}
                                    detailCol={this.props.detailCol}
                                    highlightedTask={this.props.highlightedTask}
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