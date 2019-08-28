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
        this.choicePresetToName = this.choicePresetToName.bind(this);
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

    choicePresetToName(choicePreset) {
        let choice_name = choicePreset[1].name;
        for (let i = 2; i < choicePreset.length; i++)
            choice_name = choice_name.replace("$T" + (i - 2) + "$", choicePreset[i]);
        return choice_name;
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

                                for (let i = 0; i < Math.min(a.nameChoices.length, b.nameChoices.length); i++) {
                                    s = this.choicePresetToName(a.nameChoices[i]).localeCompare(this.choicePresetToName(b.nameChoices[i]));
                                    if (s !== 0)
                                        break;
                                }
                                if (s === 0)
                                    s = b.nameChoices.length - a.nameChoices.length;
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
                <TaskEditor devices={this.props.devices} ref={this.taskEditor} presets={this.props.presets} presetsByGroup={this.props.presetsByGroup} project_name={this.props.project.name} />
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
