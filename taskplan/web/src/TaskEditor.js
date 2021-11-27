import React from 'react';
import ConfigEditor from "./ConfigEditor";
import ParamFilter from "./ParamFilter";
import $ from "jquery";
import TagsEdit from "./TagsEdit";
import Prompt from "./Prompt";

class TaskEditor extends React.Component {
    constructor(props) {
        super(props);

        let selectedParamValues = {0 : {}};

        for (const param of props.params) {
            if (param.values.length > 0)
                selectedParamValues[0][param.uuid] = [param.values[0].uuid];
        }

        this.state = {
            selectedParamValues: selectedParamValues,
            uuid_to_load: null,
            total_iterations: "",
            save_interval: "100",
            checkpoint_interval: "0",
            open: false,
            command: "",
            commandHint: "",
            isTest: false,
            device: null,
            tags: [],
            paramVisibility: {},
            current_iteration: 0,
            edit_task: null
        };


        this.configEditor = React.createRef();
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.run = this.run.bind(this);
        this.new = this.new.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.onTotalIterationsChange = this.onTotalIterationsChange.bind(this);
        this.onCheckpointIntervalChange = this.onCheckpointIntervalChange.bind(this);
        this.onSaveIntervalChange = this.onSaveIntervalChange.bind(this);
        this.copyCommand = this.copyCommand.bind(this);
        this.onIsTestChange = this.onIsTestChange.bind(this);
        this.onDeviceChange = this.onDeviceChange.bind(this);
        this.onParamVisibilityChanged = this.onParamVisibilityChanged.bind(this);
        this.addIteration = this.addIteration.bind(this);
        this.removeIteration = this.removeIteration.bind(this);
        this.changeIteration = this.changeIteration.bind(this);
        this.updateTags = this.updateTags.bind(this);
        this.wrapperRef = React.createRef();
        this.commandInput = React.createRef();
        this.promptNewIterRefs = React.createRef();
    }

    open(task, edit_task=null) {

        let selectedParamValues = {};

        for (const iteration in task.paramValues) {
            selectedParamValues[iteration] = {};
            for (const param of this.props.params) {
                if (param.values.length > 0) {
                    let suitableParamValue = null;
                    let args = [];
                    for (const value of task.paramValues[iteration]) {
                        if (value[0].param === param.uuid) {
                            suitableParamValue = value[0];
                            args = value.slice(1);
                            break;
                        }
                    }

                    if (suitableParamValue === null)
                        selectedParamValues[iteration][param.uuid] = [param.deprecated_param_value.uuid, ...param.deprecated_param_value.template_deprecated];
                    else
                        selectedParamValues[iteration][param.uuid] = [suitableParamValue.uuid, ...args];
                }
            }
        }

        this.setState({
            edit_task: edit_task,
            selectedParamValues: selectedParamValues,
            open: true,
            isTest: task.is_test,
            device: this.state.device === null ? this.props.devices[0].uuid : this.state.device,
            total_iterations: task.total_iterations,
            save_interval: task.save_interval,
            checkpoint_interval: task.checkpoint_interval,
            current_iteration: 0
        }, () => this.updateCommand(selectedParamValues));
    }


    edit(task) {
        this.open(task, task.uuid);
    }

    new() {
        let selectedParamValues = Object.assign({}, this.state.selectedParamValues);

        selectedParamValues["0"] = Object.assign({}, selectedParamValues["0"]);
        for (const param of this.props.params) {
            if (!(param.uuid in selectedParamValues["0"]) && param.values.length > 0)
                selectedParamValues["0"][param.uuid] = [param.default_param_value.uuid, ...param.default_param_value.template_defaults];
        }

        this.setState({
            selectedParamValues: selectedParamValues,
            open: true,
            edit_task: null,
            device: this.state.device === null ? this.props.devices[0].uuid : this.state.device
        });
        this.updateCommand(selectedParamValues);
    }

    close() {
        this.setState({
            param_value: null,
            open: false
        });
    }

    run() {
        var data = new FormData();

        let visibleParams = {};
        for (const iteration in this.state.selectedParamValues) {
            visibleParams[iteration] = {}
            for (const param of this.props.params) {
                if (param.uuid in this.state.selectedParamValues[iteration] && (!(param.uuid in this.state.paramVisibility) || this.state.paramVisibility[param.uuid])) {
                    visibleParams[iteration][param.uuid] = this.state.selectedParamValues[iteration][param.uuid];
                }
            }
        }

        var dataJson = {};
        dataJson['params'] = visibleParams;
        dataJson['config'] = {
            "save_interval": parseInt(this.state.save_interval),
            "checkpoint_interval": parseInt(this.state.checkpoint_interval)
        };
        dataJson['device'] = this.state.device;
        dataJson['tags'] = this.state.tags;

        data.append("data", JSON.stringify(dataJson));

        var url = "/" + (this.state.isTest ? "test" : "start") + "/" + this.state.total_iterations;

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

        this.close();
    }


    save() {
        var data = new FormData();

        let visibleParams = {};
        for (const iteration in this.state.selectedParamValues) {
            visibleParams[iteration] = {}
            for (const param of this.props.params) {
                if (param.uuid in this.state.selectedParamValues[iteration] && (!(param.uuid in this.state.paramVisibility) || this.state.paramVisibility[param.uuid])) {
                    visibleParams[iteration][param.uuid] = this.state.selectedParamValues[iteration][param.uuid];
                }
            }
        }

        var dataJson = {};
        dataJson['params'] = visibleParams;
        dataJson['config'] = {
            "save_interval": parseInt(this.state.save_interval),
            "checkpoint_interval": parseInt(this.state.checkpoint_interval)
        };

        data.append("data", JSON.stringify(dataJson));

        var url = "/edit_task/" + this.state.edit_task + "/" + this.state.total_iterations;

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

        this.close();
    }

    onSelectionChange(param, value, arg=[]) {
        const selectedParamValues = Object.assign({}, this.state.selectedParamValues);

        selectedParamValues[this.state.current_iteration] = Object.assign({}, selectedParamValues[this.state.current_iteration]);
        selectedParamValues[this.state.current_iteration][param.uuid] = [value.uuid];
        selectedParamValues[this.state.current_iteration][param.uuid] = selectedParamValues[this.state.current_iteration][param.uuid].concat(arg);

        this.setState({
            selectedParamValues: selectedParamValues
        });
        this.updateCommand(selectedParamValues);
    }


    onTotalIterationsChange(event) {
        this.setState({
            total_iterations: event.target.value
        });
        this.updateCommand(null, event.target.value);
    }

    onSaveIntervalChange(event) {
        this.setState({
            save_interval: event.target.value
        },() => this.updateCommand());
    }

    onCheckpointIntervalChange(event) {
        this.setState({
            checkpoint_interval: event.target.value
        },() => this.updateCommand());
    }

    updateCommand(selectedParamValues = null, total_iterations = null) {
        if (selectedParamValues === null)
            selectedParamValues = this.state.selectedParamValues;
        if (total_iterations === null)
            total_iterations = this.state.total_iterations;
        let paramValues = "";

        for (const iteration in this.state.selectedParamValues) {
            for (const param of this.props.params) {
                if (param.uuid in selectedParamValues[iteration] && (!(param.uuid in this.state.paramVisibility) || this.state.paramVisibility[param.uuid])) {
                    paramValues += param.uuid + " " + selectedParamValues[iteration][param.uuid][0];// iteration + ";" +
                    for (let i = 1; i < selectedParamValues[iteration][param.uuid].length; i++)
                        paramValues += ":\"" + selectedParamValues[iteration][param.uuid][i].replaceAll("\"", "\\\"") + "\"";
                    paramValues += " ";
                }
            }
            break;
        }

        let additionalProps = "";
        additionalProps += "--save " + (this.state.save_interval === "" ? "0" : this.state.save_interval);
        additionalProps += " --checkpoint " + (this.state.checkpoint_interval === "" ? "0" : this.state.checkpoint_interval);

        if (total_iterations !== "") {
            this.setState({
                command: "taskplan " + (this.state.isTest ? "test " : "start ") + total_iterations + " " + paramValues + " " + additionalProps,
                commandHint: "Click to copy"
            });
        } else {
            this.setState({
                command: "",
                commandHint: "Total iterations missing"
            });
        }
    }

    componentDidMount() {
        $(this.wrapperRef.current).find('[data-toggle="tooltip"]').tooltip();
    }

    componentDidUpdate() {
        $(this.wrapperRef.current).find('[data-toggle="tooltip"]').tooltip();
    }

    copyCommand() {
        this.commandInput.current.select();
        document.execCommand("copy");
        this.setState({
            commandHint: "Copied!"
        }, () => $(this.commandInput.current).tooltip('show'));
    }

    onIsTestChange(event) {
        this.setState({
            isTest: event.target.checked
        }, () => this.updateCommand());
    }

    onDeviceChange(event) {
        this.setState({
            device: event.target.value
        });
    }

    updateTags(tags) {
        this.setState({
            tags: tags
        });
    }

    onParamVisibilityChanged(paramVisibility) {
        this.setState({
            paramVisibility: paramVisibility
        })
    }

    addIteration(newIteration) {
        const selectedParamValues = Object.assign({}, this.state.selectedParamValues);

        selectedParamValues[newIteration] = {};
        for (const param of this.props.params) {
            selectedParamValues[newIteration][param.uuid] = [param.default_param_value.uuid, ...param.default_param_value.template_defaults];
        }

        this.setState({
            selectedParamValues: selectedParamValues,
            current_iteration: newIteration
        });
    }

    removeIteration(e, iteration) {
        e.stopPropagation();
        if (iteration === 0)
            return;

        const selectedParamValues = Object.assign({}, this.state.selectedParamValues);

        delete selectedParamValues[iteration];

        this.setState({
            current_iteration: 0,
            selectedParamValues: selectedParamValues
        });
    }
    
    changeIteration(iteration) {
        if (iteration in this.state.selectedParamValues) {
            this.setState({
                current_iteration: iteration
            });
        }
    }

    render() {
        return (
            <div ref={this.wrapperRef} style={{'display': (this.state.open ? 'block' : 'none')}}>
                <div className="task-editor slide-editor editor">
                    <div className="header">{this.state.edit_task === null ? "Start task" : "Edit task"}<i className="fas fa-times" onClick={this.close}></i></div>
                    <div className="field">
                        <label>Total iterations:</label>
                        <input value={this.state.total_iterations} onChange={this.onTotalIterationsChange} required="required" />
                    </div>
                    <div className="field">
                        <label>Save interval:</label>
                        <input value={this.state.save_interval} onChange={this.onSaveIntervalChange} required="required" />
                    </div>
                    <div className="field">
                        <label>Checkpoint interval:</label>
                        <input value={this.state.checkpoint_interval} onChange={this.onCheckpointIntervalChange} required="required" />
                    </div>
                    {this.state.edit_task === null &&
                        <div className="field">
                            <label>Is test:</label>
                            <input checked={this.state.isTest} onChange={this.onIsTestChange} type="checkbox"/>
                        </div>
                    }
                    <div className="iterations">
                        {Object.keys(this.state.selectedParamValues).map(iteration => (
                            <div className={"iteration " + (iteration == this.state.current_iteration ? "iteration-current" : "")} onClick={() => this.changeIteration(iteration)}>{iteration} {iteration > 0 && <i className="fas fa-times" onClick={(e) => this.removeIteration(e, iteration)}/>} </div>
                        ))}
                        <div className="new-iteration" onClick={() => this.promptNewIterRefs.current.openDialog()}>+</div>
                        <Prompt ref={this.promptNewIterRefs} defaultValue={""} header="New iteration?" text="New iteration" onSend={this.addIteration}/>
                    </div>
                    <ParamFilter selectMultiple={false} paramsByGroup={this.props.paramsByGroup} selectedParamValues={this.state.selectedParamValues[this.state.current_iteration]} toggleSelection={this.onSelectionChange} useTemplateFields={true} paramVisibility={this.state.paramVisibility[this.state.current_iteration]}/>
                    <ConfigEditor ref={this.configEditor} url={"/config/task"} onParamVisibilityChanged={this.onParamVisibilityChanged} bases={this.state.selectedParamValues} preview={true} />
                    {this.state.edit_task === null &&
                        <React.Fragment>
                            <div className="field">
                                <label>Device:</label>
                                <select value={this.state.device} onChange={this.onDeviceChange}>
                                    {this.props.devices.map(device => (
                                        <option value={device.uuid}>{device.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="field">
                                <label>Command:</label>
                                <input className="command" ref={this.commandInput} onClick={this.copyCommand} data-toggle="tooltip" data-placement="bottom" data-original-title={this.state.commandHint} value={this.state.command} readOnly={true}/>
                            </div>
                            <div className="field">
                            <label>Tags:</label>
                            <TagsEdit tags={this.state.tags} allTags={this.props.allTags} updateTags={this.updateTags} />
                            </div>
                        </React.Fragment>
                    }
                    <div className="buttons">
                        {this.state.edit_task === null ?
                            <div onClick={this.run}>Run</div>
                            :
                            <div onClick={this.save}>Save</div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskEditor;