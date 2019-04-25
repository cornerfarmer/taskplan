import React from 'react';
import Preset from "./Preset";
import State from "./Global";
import FinishedTask from "./FinishedTask";
import PausedTask from "./PausedTask";
import PresetEditor from "./PresetEditor";
import ChoiceEditor from "./ChoiceEditor";
import TaskEditor from "./TaskEditor";

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            presets: [],
            tasks: [],
            showAbstract: true,
            currentCodeVersionOnly: true,
            activeTab: 0,
            sorting: [0, 0],
            sortingDescending: [true, true]
        };
        this.presetChanged = this.presetChanged.bind(this);
        this.choiceChanged = this.choiceChanged.bind(this);
        this.toggleShowAbstract = this.toggleShowAbstract.bind(this);
        this.toggleCurrentCodeVersionOnly = this.toggleCurrentCodeVersionOnly.bind(this);
        this.showTab = this.showTab.bind(this);
        this.addPreset = this.addPreset.bind(this);
        this.newTask = this.newTask.bind(this);
        this.onChangeSorting = this.onChangeSorting.bind(this);
        this.switchSortingDirection = this.switchSortingDirection.bind(this);
        this.rerunTask = this.rerunTask.bind(this);
        this.presetEditor = React.createRef();
        this.choiceEditor = React.createRef();
        this.taskEditor = React.createRef();
    }

    presetChanged(changedPreset) {
        const presets = this.state.presets.slice();

        const previousIndex = presets.findIndex(function (e) {
            return e.uuid === changedPreset.uuid
        });
        console.log(changedPreset);
        if (previousIndex >= 0) {
            changedPreset.choices = presets[previousIndex].choices;
            presets[previousIndex] = changedPreset;
        } else {
            changedPreset.choices = [];
            presets.push(changedPreset);
        }

        this.setState({
            presets: presets
        });
    }

    choiceChanged(changedChoice) {
        const presets = this.state.presets.slice();

        const preset = presets.find(function (e) {
            return e.uuid === changedChoice.preset
        });

        const previousIndex = preset.choices.findIndex(function (e) {
            return e.uuid === changedChoice.uuid
        });
        console.log(changedChoice);
        changedChoice.creation_time = new Date(changedChoice.creation_time * 1000);
        if (previousIndex >= 0) {
            preset.choices[previousIndex] = changedChoice;
        } else {
            preset.choices.push(changedChoice);
        }

        this.setState({
            presets: presets
        });
    }

    taskChanged(changedTask) {
        const tasks = this.state.tasks.slice();

        const previousIndex = tasks.findIndex(function (e) {
            return e.uuid === changedTask.uuid
        });

        if (changedTask.state === State.STOPPED) {
            changedTask.creation_time = new Date(changedTask.creation_time * 1000);
            changedTask.saved_time = new Date(changedTask.saved_time * 1000);

            if (previousIndex >= 0) {
                tasks[previousIndex] = changedTask;
            } else {
                tasks.push(changedTask);
            }

            this.setState({
                tasks: tasks
            });
        } else if (previousIndex !== -1) {
            tasks.splice(previousIndex, 1);
            this.setState({
                tasks: tasks
            });
        }
    }

    removeTask(taskUuid) {
        const tasks = this.state.tasks.slice();

        const index = tasks.findIndex(function (e) {
            return e.uuid === taskUuid
        });

        if (index >= 0)
            tasks.splice(index, 1);

        this.setState({
            tasks: tasks
        });
    }

    toggleCurrentCodeVersionOnly() {
        this.setState({
          currentCodeVersionOnly: !this.state.currentCodeVersionOnly,
        });
    }

    toggleShowAbstract() {
        this.setState({
          showAbstract: !this.state.showAbstract,
        });
    }

    showTab(tab) {
        this.setState({
          activeTab: tab,
        });
    }

    addPreset() {
        this.presetEditor.current.new(this.props.project.name);
    }

    addChoice(preset) {
        this.choiceEditor.current.new(preset);
    }

    newTask() {
        this.taskEditor.current.new();
    }

    onChangeSorting(e) {
        const sorting = this.state.sorting.slice();
        sorting[this.state.activeTab] = parseInt(e.target.value);
        this.setState({sorting: sorting});
    }

    switchSortingDirection() {
        const sortingDescending = this.state.sortingDescending.slice();
        sortingDescending[this.state.activeTab] = !sortingDescending[this.state.activeTab];
        this.setState({sortingDescending: sortingDescending});
    }

    rerunTask(task) {
        let preset = {'name': task.preset_name, 'project_name': task.project_name, 'base_uuid': this.props.project.default_preset, 'abstract': false, 'dynamic': task.preset_dynamic, 'uuid': ''};
        this.showTab(0);
        this.presetEditor.current.open(preset, true, task.uuid);
    }

    render() {
        var project = this;
        var s;
        return (
            <div className="project" style={this.props.visible ? {} : {display: 'none'}}>
                <div className="tabs">
                    <div className={this.state.activeTab === 0 ? "tab-active" : ""} onClick={() => this.showTab(0)}>Presets</div>
                    <div className={this.state.activeTab === 1 ? "tab-active" : ""} onClick={() => this.showTab(1)}>Tasks</div>
                </div>
                <div className="sorting">
                    <div>
                        <label>Sorting:</label>
                        {this.state.activeTab === 0 &&
                            <select value={this.state.sorting[0]} onChange={this.onChangeSorting}>
                                <option value="0">Created</option>
                                <option value="1">Name</option>
                                <option value="2">Tries</option>
                            </select>
                        }
                        {this.state.activeTab === 1 &&
                            <select value={this.state.sorting[1]} onChange={this.onChangeSorting}>
                                <option value="0">Finished</option>
                                <option value="1">Name</option>
                                <option value="2">Created</option>
                                <option value="3">Iterations</option>
                            </select>
                        }
                        <span onClick={this.switchSortingDirection} className={this.state.sortingDescending[this.state.activeTab] ? "fa fa-sort-amount-down" : "fa fa-sort-amount-up"}></span>
                    </div>
                </div>
                <ul className="presets-tab" style={{'display': (this.state.activeTab === 0 ? 'block' : 'none')}}>
                    {this.state.presets.filter(preset => (!preset.abstract || this.state.showAbstract)).sort(function (a, b) {
                        switch(project.state.sorting[0]) {
                            case 0:
                                s = a.creation_time - b.creation_time; break;
                            case 1:
                                s = a.name.localeCompare(b.name); break;
                            case 2:
                                s = a.started_tries - b.started_tries; break;
                        }
                        if (s === 0)
                            s = a.base.localeCompare(b.base);
                        if (project.state.sortingDescending[0])
                            s *= -1;
                        return s;
                    }).map(preset => (
                        <Preset
                            key={preset.uuid}
                            preset={preset}
                            choices={preset.choices}
                            editPresetFunc={this.presetEditor.current.open}
                            editChoiceFunc={this.choiceEditor.current.open}
                            newChoiceFunc={this.choiceEditor.current.new}
                        />
                    ))}
                </ul>
                <PresetEditor ref={this.presetEditor} />
                <ChoiceEditor ref={this.choiceEditor} />
                <TaskEditor ref={this.taskEditor} presets={this.state.presets} project_name={this.props.project.name} />
                <div className="tab-toolbar" style={{'display': (this.state.activeTab === 0 ? 'flex' : 'none')}}>
                    <label>
                        <input type="checkbox" defaultChecked={this.state.showAbstract} onChange={this.toggleShowAbstract} />
                        <span>Show abstract presets</span>
                    </label>
                    <div className="buttons">
                        <div onClick={this.addPreset}>Add preset</div>
                    </div>
                </div>
                <ul className="tasks-tab" style={{'display': (this.state.activeTab === 1 ? 'block' : 'none')}}>
                    {this.state.tasks.filter(task => (!this.state.currentCodeVersionOnly || task.version === this.props.project.version)).sort(function (a, b) {
                        switch(project.state.sorting[1]) {
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
                        if (project.state.sortingDescending[1])
                            s *= -1;
                        return s;
                    }).map(task => (
                        <PausedTask
                            rerunTask={this.rerunTask}
                            key={task.uuid}
                            task={task}
                        />
                    ))}
                </ul>
                <div className="tab-toolbar" style={{'display': (this.state.activeTab === 1 ? 'flex' : 'none')}}>
                    <label>
                        <input type="checkbox" defaultChecked={this.state.currentCodeVersionOnly} onChange={this.toggleCurrentCodeVersionOnly} />
                        <span>Show only tasks from current code version</span>
                    </label>
                    <div className="buttons">
                        <div onClick={this.newTask}>New task</div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Project;