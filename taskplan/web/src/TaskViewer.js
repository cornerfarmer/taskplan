import React from 'react';
import ConfigEditor from "./ConfigEditor";
import {TaskName} from "./Task";
import State from "./Global";

class TaskViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            task: null,
            selectedParamValues: {},
            notes: ""
        };

        this.configEditor = React.createRef();
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.updateTasks = this.updateTasks.bind(this);
        this.updateParams = this.updateParams.bind(this);
        this.extractCheckpoint = this.extractCheckpoint.bind(this);
        this.notesTextarea = React.createRef();
        this.updateNotes = this.updateNotes.bind(this);
        this.timer = null;
    }

    componentDidMount() {
        this.props.repository.onChange("tasks", this.updateTasks);
        this.props.repository.onChange("params", this.updateParams);
    }

    componentWillUnmount() {
        this.props.repository.removeOnChange("tasks", this.updateTasks);
        this.props.repository.removeOnChange("params", this.updateParams);
    }


    open(task) {
        let selectedParamValues = {};
        for (const param of this.state.params) {
            if (param.values.length > 0) {
                let suitableParamValue = null;
                let args = [];
                for (const value of task.paramValues) {
                    if (value[0].param === param.uuid) {
                        suitableParamValue = value[0];
                        args = value.slice(1);
                        break;
                    }
                }

                if (suitableParamValue === null) {
                    selectedParamValues[param.uuid] = param.deprecated_param_value.name;
                    args = param.deprecated_param_value.template_deprecated;
                } else {
                    selectedParamValues[param.uuid] = suitableParamValue.name;
                }
                for (let i = 0; i < args.length; i++)
                    selectedParamValues[param.uuid] = selectedParamValues[param.uuid].replace("$T" + (i) + "$", args[i]);
            }
        }

        this.setState({
            task: task,
            selectedParamValues: selectedParamValues,
            notes: task.notes
        });
    }

    updateTasks(tasks) {
        if (this.state.task !== null) {
            this.setState({
                task: this.state.task.uuid in tasks ? tasks[this.state.task.uuid] : null
            });
        }
    }

    updateParams(params) {
        this.setState({
            params: Object.values(params)
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


    updateNotes(evt) {
        const newValue = evt.target.value;
        const task_uuid = this.state.task.uuid;
        if (this.timer !== null)
            clearTimeout(this.timer);

        this.timer = setTimeout(() => {
            var data = new FormData();

            var dataJson = {};
            dataJson['notes'] = newValue;

            data.append("data", JSON.stringify(dataJson));

            var url = "set_task_notes/" + task_uuid;

            fetch(url,
                {
                    method: "POST",
                    body: data
                })
                .then(res => res.json())
                .then(
                    (result) => {

                    },
                    (error) => {

                    }
                );
        }, 1000);


        this.setState({
            notes: newValue
        });
    }

    render() {
        if (this.state.task !== null) {
            return (
                <div className="task-viewer slide-editor editor" >
                    <div className="header">Task details<i class="fas fa-times" onClick={this.close}></i></div>
                    <div className="title"><span className="try-number">{this.state.task.try}</span><TaskName task={this.state.task} /></div>
                    <div className="metadata">
                        <div>{this.state.task.uuid}</div>
                        <div><span>Status:</span> {this.state.task.state === State.RUNNING ? "Running" : (this.state.task.state === State.QUEUED ? "Queued": "Stopped")}</div>
                        <div><span>Iterations:</span> {this.state.task.finished_iterations} / {this.state.task.total_iterations}</div>
                        <div><span>Started:</span> {this.state.task.creation_time.toShortStr()}</div>
                        <div><span>Paused:</span> {this.state.task.saved_time.toShortStr()} {this.state.task.had_error == true && <span className="task-error">(Error)</span>}</div>
                        <div><span>Code version:</span> {this.props.codeVersions[this.state.task.version].name}</div>
                    </div>
                    <ConfigEditor ref={this.configEditor} url={"/config/existing_task/" + this.state.task.uuid} bases={[]} preview={true}/>
                    <h2>Notes:</h2>
                    <div className="notes">
                        <textarea ref={this.notesTextarea} value={this.state.notes} onChange={evt => this.updateNotes(evt)}/>
                    </div>
                    <h2>Parameters</h2>
                    <div className="params">
                        {this.state.params.sort((a, b) => {
                            return a.name.localeCompare(b.name);
                        }).map(param => (
                            <div><span>{param.name}:</span>{this.state.selectedParamValues[param.uuid]}</div>
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