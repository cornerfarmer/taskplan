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
import View from "./View";

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            presets: [],
            tasks: [],
            showAbstract: true,
            activeTab: 0,
            sorting: [0, 0],
            sortingDescending: [true, true],
            selectedChoices: {},
            selectedTasks: [],
            presetFilterEnabled: true
        };
        this.updateTasks = this.updateTasks.bind(this);
        this.updatePresets = this.updatePresets.bind(this);
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.toggleShowAbstract = this.toggleShowAbstract.bind(this);
        this.showTab = this.showTab.bind(this);
        this.addPreset = this.addPreset.bind(this);
        this.newTask = this.newTask.bind(this);
        this.onChangeSorting = this.onChangeSorting.bind(this);
        this.switchSortingDirection = this.switchSortingDirection.bind(this);
        this.rerunTask = this.rerunTask.bind(this);
        this.closeEditors = this.closeEditors.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.presetEditor = React.createRef();
        this.choiceEditor = React.createRef();
        this.taskEditor = React.createRef();
        this.filterView = new View();
    }

    componentDidMount() {
        this.props.repository.onChange("tasks", this.updateTasks);
        this.props.repository.onChange("presets", this.updatePresets);
        this.props.repository.onAdd("tasks", this.addTask);
        this.props.repository.onRemove("tasks", this.removeTask);
        this.updatePresets(this.props.repository.presets);
        this.updateTasks(this.props.repository.tasks);
    }

    componentWillUnmount() {
        this.props.repository.removeOnChange("tasks", this.updateTasks);
        this.props.repository.removeOnChange("presets", this.updatePresets);
        this.props.repository.removeOnAdd("tasks", this.addTask);
        this.props.repository.removeOnRemove("tasks", this.removeTask);
    }

    addTask(task) {
        this.filterView.addTask(task);
        this.updateVisibleTasks();
    }

    removeTask(task) {
        this.filterView.removeTask(task);
        this.updateVisibleTasks();
    }

    updateVisibleTasks(selectedChoices=null, presetFilterEnabled=null) {
        if (selectedChoices === null)
            selectedChoices = this.state.selectedChoices;
        if (presetFilterEnabled === null)
            presetFilterEnabled = this.state.presetFilterEnabled;

        let selectedTasks;
        if (presetFilterEnabled) {
            selectedTasks = this.filterView.getSelectedTask(selectedChoices);
        } else {
            selectedTasks = Object.keys(this.state.tasks);
        }
        this.setState({
            selectedTasks: selectedTasks
        });
    }

    updatePresets(presets) {
        this.filterView.updatePresets(Object.values(presets));

        let selectedChoices = Object.assign({}, this.state.selectedChoices);

        for (const preset of Object.values(presets)) {
            if (!(preset.uuid in selectedChoices) && preset.choices.length > 0)
                selectedChoices[preset.uuid] = preset.choices[0];
        }

        this.setState({
            presets: Object.values(presets),
            selectedChoices: selectedChoices
        });
    }

    updateTasks(tasks) {
        this.filterView.updateTasks(tasks);

        this.setState({
            tasks: tasks
        });
    }

    toggleShowAbstract() {
        this.setState({
          showAbstract: !this.state.showAbstract,
        });
    }

    showTab(tab) {
        this.closeEditors();
        this.setState({
          activeTab: tab,
        });
    }

    closeEditors() {
        this.presetEditor.current.close();
        this.choiceEditor.current.close();
        this.taskEditor.current.close();
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

    onSelectionChange(preset, choice) {
        const selectedChoices = Object.assign({}, this.state.selectedChoices);

        selectedChoices[preset.uuid] = choice;

        this.updateVisibleTasks(selectedChoices);
        this.setState({
            selectedChoices: selectedChoices
        });
    }

    togglePresetFilter() {
        let presetFilterEnabled = !this.state.presetFilterEnabled;
        this.setState({
            presetFilterEnabled: presetFilterEnabled
        });
        this.updateVisibleTasks(null, presetFilterEnabled);
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
                        {this.state.activeTab === 1 &&
                            <span className="fas fa-sliders-h"onClick={() => this.togglePresetFilter()}></span>
                        }
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
                            editPresetFunc={this.presetEditor.current.open}
                            editChoiceFunc={this.choiceEditor.current.open}
                            newChoiceFunc={this.choiceEditor.current.new}
                        />
                    ))}
                </ul>
                <PresetEditor ref={this.presetEditor} closeEditors={this.closeEditors} />
                <ChoiceEditor ref={this.choiceEditor} closeEditors={this.closeEditors} />
                <div className="tab-toolbar" style={{'display': (this.state.activeTab === 0 ? 'flex' : 'none')}}>
                    <label>
                        <input type="checkbox" defaultChecked={this.state.showAbstract} onChange={this.toggleShowAbstract} />
                        <span>Show abstract presets</span>
                    </label>
                    <div className="buttons">
                        <div onClick={this.addPreset}>Add preset</div>
                    </div>
                </div>
                {this.state.activeTab === 1 && this.state.presetFilterEnabled &&
                    <PresetFilter presets={this.state.presets} selectedChoices={this.state.selectedChoices} onSelectionChange={this.onSelectionChange}/>
                }
                <ul className="tasks-tab" style={{'display': (this.state.activeTab === 1 ? 'block' : 'none')}}>
                    {this.state.selectedTasks.filter(uuid => uuid in this.state.tasks).map(uuid => this.state.tasks[uuid]).sort(function (a, b) {
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
                <TaskEditor ref={this.taskEditor} presets={this.state.presets} project_name={this.props.project.name} />
                <div className="tab-toolbar" style={{'display': (this.state.activeTab === 1 ? 'flex' : 'none')}}>
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


export default Project;
