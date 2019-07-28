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
import PresetTab from "./PresetTab";
import TaskTab from "./TaskTab";
import PresetGroup from "./PresetGroup";
import PresetViewer from "./PresetViewer";

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            presets: [],
            presetsByGroup: {},
            tasks: [],
            activeTab: 0,
            sorting: [0, 0],
            sortingDescending: [true, true],
            selectedChoices: {},
            selectedTasks: [],
            presetFilterEnabled: false,
            presetSortingMode: false
        };
        this.updateTasks = this.updateTasks.bind(this);
        this.updatePresets = this.updatePresets.bind(this);
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.toggleShowAbstract = this.toggleShowAbstract.bind(this);
        this.showTab = this.showTab.bind(this);
        this.onChangeSorting = this.onChangeSorting.bind(this);
        this.switchSortingDirection = this.switchSortingDirection.bind(this);
        this.openPresetViewer = this.openPresetViewer.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.togglePresetFilter = this.togglePresetFilter.bind(this);
        this.togglePresetSortingMode = this.togglePresetSortingMode.bind(this);
        this.filterView = new View(true);
        this.presetViewerRef = React.createRef();
    }

    componentDidMount() {
        this.props.repository.onChange("tasks", this.updateTasks);
        this.props.repository.onChange("presets", this.updatePresets);
        this.props.repository.onAdd("tasks", this.addTask);
        this.props.repository.onRemove("tasks", this.removeTask);
        this.updatePresets(this.props.repository.presets);
        for (let key in this.props.repository.tasks)
            this.addTask(this.props.repository.tasks[key]);
    }

    componentWillUnmount() {
        this.props.repository.removeOnChange("tasks", this.updateTasks);
        this.props.repository.removeOnChange("presets", this.updatePresets);
        this.props.repository.removeOnAdd("tasks", this.addTask);
        this.props.repository.removeOnRemove("tasks", this.removeTask);
    }

    addTask(task) {
        if (task.project_name === this.props.project.name && !task.is_test) {
            this.filterView.addTask(task);
        }

        let tasks = Object.assign({}, this.state.tasks);
        tasks[task.uuid] = task;
        this.setState({
            tasks: tasks
        });

        this.updateVisibleTasks();
    }

    removeTask(task) {
        if (task.project_name === this.props.project.name && !task.is_test) {
            this.filterView.removeTask(task);
        }
        this.updateVisibleTasks();
    }

    updateVisibleTasks(selectedChoices=null, presetFilterEnabled=null) {
        if (selectedChoices === null)
            selectedChoices = this.state.selectedChoices;
        if (presetFilterEnabled === null)
            presetFilterEnabled = this.state.presetFilterEnabled;

        let selectedTasks;
        if (presetFilterEnabled) {
            selectedTasks = this.filterView.getSelectedTask(selectedChoices, this.props.project.current_code_version);
        } else {
            selectedTasks = Object.keys(this.state.tasks).filter(task => this.state.tasks[task].version === this.props.project.current_code_version);
        }
        this.setState({
            selectedTasks: selectedTasks
        });
    }

    updatePresets(presets) {
        this.filterView.updatePresets(Object.values(presets));

        let selectedChoices = Object.assign({}, this.state.selectedChoices);

        let presetsByGroup = {};
        for (const preset of Object.values(presets)) {
            if (!(preset.uuid in selectedChoices) && preset.choices.length > 0)
                selectedChoices[preset.uuid] = preset.choices[0];

            const group = preset.group.length > 0 ? preset.group[0] : '';
            if (!(group in presetsByGroup))
                presetsByGroup[group] = [];
            presetsByGroup[group].push(preset);
        }

        this.setState({
            presets: Object.values(presets),
            selectedChoices: selectedChoices,
            presetsByGroup: presetsByGroup
        });
    }

    updateTasks(tasks) {
        for (let key in tasks) {
            if (tasks[key].project_name === this.props.project.name)
                this.filterView.updateTask(tasks[key]);
        }

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
        this.setState({
          activeTab: tab,
        });
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.project.current_code_version !== this.props.project.current_code_version)
            this.updateVisibleTasks();
    }

    openPresetViewer() {
        this.props.closeViewer();
        this.presetViewerRef.current.open();
    }

    togglePresetSortingMode() {
        this.setState({
            presetSortingMode: !this.state.presetSortingMode
        });
    }

    render() {
        return (
            <div className="project" style={this.props.visible ? {} : {display: 'none'}}>
                <div className="tabs">
                    <div className={this.state.activeTab === 0 ? "tab-active" : ""} onClick={() => this.showTab(0)}>Presets</div>
                    <div className={this.state.activeTab === 1 ? "tab-active" : ""} onClick={() => this.showTab(1)}>Tasks</div>
                </div>
                <div className="sorting">
                        {this.state.activeTab === 0 &&
                            <div>
                                <span onClick={this.togglePresetSortingMode} className={"fas fa-sort"}></span>
                            </div>
                        }
                        {this.state.activeTab === 1 &&
                            <div>
                                <label>Sorting:</label>
                                <select value={this.state.sorting[1]} onChange={this.onChangeSorting}>
                                    <option value="0">Finished</option>
                                    <option value="1">Name</option>
                                    <option value="2">Created</option>
                                    <option value="3">Iterations</option>
                                </select>
                                <span onClick={this.switchSortingDirection} className={this.state.sortingDescending[this.state.activeTab] ? "fa fa-sort-amount-down" : "fa fa-sort-amount-up"}></span>

                                <span className="fas fa-sliders-h"onClick={this.openPresetViewer}></span>
                            </div>
                        }
                </div>
                <PresetTab
                    active={this.state.activeTab === 0}
                    presetsByGroup={this.state.presetsByGroup}
                    sorting={this.state.sorting}
                    project={this.props.project}
                    sortingDescending={this.state.sortingDescending}
                    presetSortingMode={this.state.presetSortingMode}
                    presets={this.state.presets}
                />
                <TaskTab
                    active={this.state.activeTab === 1}
                    presets={this.state.presets}
                    project={this.props.project}
                    tasks={this.state.tasks}
                    selectedTasks={this.state.selectedTasks}
                    selectedChoices={this.state.selectedChoices}
                    presetFilterEnabled={this.state.presetFilterEnabled}
                    sorting={this.state.sorting}
                    sortingDescending={this.state.sortingDescending}
                    onSelectionChange={this.onSelectionChange}
                    showTask={this.props.showTask}
                    presetsByGroup={this.state.presetsByGroup}
                />
                <PresetViewer ref={this.presetViewerRef} presetsByGroup={this.state.presetsByGroup} selectedChoices={this.state.selectedChoices} onSelectionChange={this.onSelectionChange} togglePresetFilter={this.togglePresetFilter} presetFilterEnabled={this.state.presetFilterEnabled}/>
            </div>
        );
    }
}


export default Project;
