import React from 'react';
import Preset from "./Preset";
import State from "./Global";
import FinishedTask from "./FinishedTask";
import PausedTask from "./PausedTask";
import PresetEditor from "./PresetEditor";
import ChoiceEditor from "./ChoiceEditor";
import TaskEditor from "./TaskEditor";
import TaskView from "./TaskView";
import PresetFilter from "./PresetFilter";
import TaskViewer from "./TaskViewer";
import View from "./View";
import PresetTab from "./PresetTab";

class TaskTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.newTask = this.newTask.bind(this);
        this.rerunTask = this.rerunTask.bind(this);
        this.closeEditors = this.closeEditors.bind(this);
        this.showTask = this.showTask.bind(this);
        this.taskEditor = React.createRef();
        this.taskViewer = React.createRef();
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

    showTask(task) {
        this.taskViewer.current.open(task);
    }

    render() {
        return (
            <div className="tab" style={{'display': (this.props.active ? 'flex' : 'none')}}>
                {this.props.presetFilterEnabled &&
                    <PresetFilter presets={this.props.presets} selectedChoices={this.props.selectedChoices} onSelectionChange={this.props.onSelectionChange}/>
                }
                <ul className="tasks-tab" >
                    {this.props.selectedTasks.filter(uuid => uuid in this.props.tasks).map(uuid => this.props.tasks[uuid]).sort((a, b) => {
                        let s;
                        switch(this.props.sorting[1]) {
                            case 0:
                                s = a.saved_time - b.saved_time; break;
                            case 1:
                                s = a.preset_name.localeCompare(b.preset_name); break;
                            case 2:
                                s = a.creation_time - b.creation_time; break;
                            case 3:
                                s = a.finished_iterations - b.finished_iterations; break;
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
                            showTask={this.showTask}
                        />
                    ))}
                </ul>
                <TaskViewer ref={this.taskViewer} presets={this.props.presets} />
                <TaskEditor ref={this.taskEditor} presets={this.props.presets} project_name={this.props.project.name} />
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
