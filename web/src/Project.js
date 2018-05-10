import React from 'react';
import Preset from "./Preset";
import State from "./Global";
import FinishedTask from "./FinishedTask";
import PausedTask from "./PausedTask";
import PresetEditor from "./PresetEditor";

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            presets: [],
            tasks: [],
            showAbstract: false,
            activeTab: 0
        };
        this.presetChanged = this.presetChanged.bind(this);
        this.toggleShowAbstract = this.toggleShowAbstract.bind(this);
        this.showTab = this.showTab.bind(this);
        this.addPreset = this.addPreset.bind(this);
        this.presetEditor = React.createRef()
    }

    presetChanged(changedPreset) {
        const presets = this.state.presets.slice();

        const previousIndex = presets.findIndex(function (e) {
            return e.uuid === changedPreset.uuid
        });
        console.log(changedPreset);
        if (previousIndex >= 0) {
            presets[previousIndex] = changedPreset;
        } else {
            presets.push(changedPreset);
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

    render() {
        return (
            <div className="project">
                <div className="tabs">
                    <div className={this.state.activeTab === 0 ? "tab-active" : ""} onClick={() => this.showTab(0)}>New</div>
                    <div className={this.state.activeTab === 1 ? "tab-active" : ""} onClick={() => this.showTab(1)}>Paused</div>
                    <div className={this.state.activeTab === 2 ? "tab-active" : ""} onClick={() => this.showTab(2)}>Finished</div>
                </div>
                <ul className="presets" style={{'display': (this.state.activeTab === 0 ? 'block' : 'none')}}>
                    {this.state.presets.filter(preset => (!preset.abstract || this.state.showAbstract)).map(preset => (
                        <Preset
                            key={preset.uuid}
                            preset={preset}
                            editFunc={this.presetEditor.current.open}
                        />
                    ))}
                </ul>
                <PresetEditor ref={this.presetEditor}/>
                <div className="presets-toolbar" style={{'display': (this.state.activeTab === 0 ? 'flex' : 'none')}}>
                    <label>
                        <input type="checkbox" defaultChecked={this.state.showAbstract} onChange={this.toggleShowAbstract} />
                        <span>Show abstract presets</span>
                    </label>
                    <div className="buttons">
                        <div onClick={this.addPreset}>Add preset</div>
                    </div>
                </div>
                <ul className="paused-tasks" style={{'display': (this.state.activeTab === 1 ? 'block' : 'none')}}>
                    {this.state.tasks.filter(task => task.finished_iterations !== task.total_iterations).map(task => (
                        <PausedTask
                            key={task.uuid}
                            task={task}
                        />
                    ))}
                </ul>
                <ul className="finished-tasks" style={{'display': (this.state.activeTab === 2 ? 'block' : 'none')}}>
                    {this.state.tasks.filter(task => task.finished_iterations === task.total_iterations).map(task => (
                        <FinishedTask
                            key={task.uuid}
                            task={task}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}


export default Project;