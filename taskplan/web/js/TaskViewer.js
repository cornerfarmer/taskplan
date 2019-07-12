import React from 'react';
import ConfigEditor from "./ConfigEditor";
import {TaskName} from "./Task";

class TaskViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            task: null,
            selectedChoices: {}
        };

        this.configEditor = React.createRef();
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.extractCheckpoint = this.extractCheckpoint.bind(this);
    }

    open(task) {
        let selectedChoices = {};
        for (const preset of this.props.presets) {
            let suitableChoice = null;
            for (const choice of task.choices) {
                if (choice.preset === preset.uuid) {
                    suitableChoice = choice;
                    break;
                }
            }

            if (suitableChoice === null)
                selectedChoices[preset.uuid] = preset.deprecated_choice.name;
            else
                selectedChoices[preset.uuid] = suitableChoice.name;
        }

        this.setState({
            task: task,
            selectedChoices: selectedChoices
        });
    }

    close() {
        this.setState({
            task: null
        });
    }

    extractCheckpoint(i) {
        fetch("/extract_checkpoint/" + this.state.task.uuid + "/" + i)
        .then(res => res.json())
        .then(
            (result) => {
            },
            (error) => {

            }
        );
    }

    render() {
        if (this.state.task !== null) {
            return (
                <div className="task-viewer slide-editor editor" >
                    <div className="header">Task details<i class="fas fa-times" onClick={this.close}></i></div>
                    <div className="title"><span className="try-number">{this.state.task.try}</span><TaskName nameChoices={this.state.task.nameChoices}/></div>
                    <div className="metadata">
                        <div><span>Iterations:</span> {this.state.task.finished_iterations} / {this.state.task.total_iterations}</div>
                        <div><span>Started:</span> {this.state.task.creation_time.toShortStr()}</div>
                        <div><span>Paused:</span> {this.state.task.saved_time.toShortStr()} {this.state.task.had_error == true && <span className="task-error">(Error)</span>}</div>
                    </div>
                    <ConfigEditor ref={this.configEditor} url={"/config/task_timestep/" + this.state.task.uuid + "/0"} bases={[]} preview={true}/>
                    <h2>Presets</h2>
                    <div className="presets">
                        {this.props.presets.sort((a, b) => {
                            return a.name.localeCompare(b.name);
                        }).map(preset => (
                            <div><span>{preset.name}:</span>{this.state.selectedChoices[preset.uuid]}</div>
                        ))}
                    </div>
                    <h2>Checkpoints</h2>
                    <div className="checkpoints">
                        {this.state.task.checkpoints.length > 0 ?
                                this.state.task.checkpoints.map((checkpoint, i) => (
                                    <div>
                                        <span className="iteration">{checkpoint.finished_iterations}</span>
                                        <span className="time">{checkpoint.time.toShortStr()}</span>
                                        <div className="action" onClick={() => this.extractCheckpoint(i)} title="Add task based on checkpoint">
                                            <i className="fas fa-arrow-right"></i>
                                        </div>
                                    </div>
                                ))
                            :
                            <span>No checkpoints exist</span>
                        }
                    </div>
                </div>
            );
        } else {
            return "";
        }
    }
}

export default TaskViewer;