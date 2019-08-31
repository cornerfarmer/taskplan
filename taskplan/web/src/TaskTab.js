import React from 'react';
import PausedTask from "./PausedTask";
import TaskEditor from "./TaskEditor";

class TaskTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.newTask = this.newTask.bind(this);
        this.rerunTask = this.rerunTask.bind(this);
        this.closeEditors = this.closeEditors.bind(this);
        this.paramValueToName = this.paramValueToName.bind(this);
        this.taskEditor = React.createRef();
    }

    closeEditors() {
        this.taskEditor.current.close();
    }

    newTask() {
        this.taskEditor.current.new();
    }

    rerunTask(task) {
        this.taskEditor.current.open(task);
    }

    paramValueToName(paramValue) {
        let paramValueName = paramValue[1].name;
        for (let i = 2; i < paramValue.length; i++)
            paramValueName = paramValueName.replace("$T" + (i - 2) + "$", paramValue[i]);
        return paramValueName;
    };

    render() {
        return (
            <div className="tab" style={{'display': (this.props.active ? 'flex' : 'none')}}>
                <ul className="tasks-tab" >
                    {this.props.selectedTasks.filter(uuid => uuid in this.props.tasks).map(uuid => this.props.tasks[uuid]).sort((a, b) => {
                        let s;
                        switch(this.props.sorting[1]) {
                            case 0:
                                s = a.saved_time - b.saved_time; break;
                            case 1:

                                for (let i = 0; i < Math.min(a.nameParamValues.length, b.nameParamValues.length); i++) {
                                    s = this.paramValueToName(a.nameParamValues[i]).localeCompare(this.paramValueToName(b.nameParamValues[i]));
                                    if (s !== 0)
                                        break;
                                }
                                if (s === 0)
                                    s = b.nameParamValues.length - a.nameParamValues.length;
                                break;
                            case 2:
                                s = a.creation_time - b.creation_time; break;
                            case 3:
                                s = a.finished_iterations - b.finished_iterations; break;
                            case 4:
                                s = a.start_time - b.start_time; break;
                        }
                        if (s === 0)
                            s = a.try - b.try;
                        if (this.props.sortingDescending[1])
                            s *= -1;
                        return s;
                    }).map(task => (
                        <PausedTask
                            rerunTask={this.rerunTask}
                            key={task.uuid}
                            task={task}
                            showTask={this.props.showTask}
                            highlight={task.uuid === this.props.highlightedTask}
                            filterLikeTask={this.props.filterLikeTask}
                            devices={this.props.devices}
                        />
                    ))}
                </ul>
                <TaskEditor devices={this.props.devices} ref={this.taskEditor} params={this.props.params} paramsByGroup={this.props.paramsByGroup} project_name={this.props.project.name} />
                <div className="tab-toolbar">
                    <label>
                    </label>
                    <div className="buttons">
                        <div onClick={this.newTask}>New task</div>
                    </div>
                </div>
            </div>
        );
    }
}


export default TaskTab;
