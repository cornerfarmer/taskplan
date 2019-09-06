import React from 'react';
import ConfigEditor from "./ConfigEditor";
import ParamFilter from "./ParamFilter";
import $ from "jquery";

class TaskEditor extends React.Component {
    constructor(props) {
        super(props);

        let selectedParamValues = {};

        for (const param of props.params) {
            if (param.values.length > 0)
                selectedParamValues[param.uuid] = [param.values[0].uuid];
        }

        this.state = {
            selectedParamValues: selectedParamValues,
            uuid_to_load: null,
            total_iterations: "",
            save_interval: "0",
            checkpoint_interval: "0",
            open: false,
            command: "",
            commandHint: "",
            isTest: false,
            device: null
        };


        this.configEditor = React.createRef();
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.run = this.run.bind(this);
        this.new = this.new.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.onTotalIterationsChange = this.onTotalIterationsChange.bind(this);
        this.onCheckpointIntervalChange = this.onCheckpointIntervalChange.bind(this);
        this.onSaveIntervalChange = this.onSaveIntervalChange.bind(this);
        this.copyCommand = this.copyCommand.bind(this);
        this.onIsTestChange = this.onIsTestChange.bind(this);
        this.onDeviceChange = this.onDeviceChange.bind(this);
        this.wrapperRef = React.createRef();
        this.commandInput = React.createRef();
    }

    open(task) {

        let selectedParamValues = Object.assign({}, this.state.selectedParamValues);

        for (const param of this.props.params) {
            let suitableParamValue = null;
            let args = [];
            for (const value of task.paramValues) {
                if (value[0].param === param.uuid) {
                    suitableParamValue = value[0];
                    args = value.slice(1);
                    break;
                }
            }

            if (suitableParamValue === null)
                selectedParamValues[param.uuid] = [param.deprecated_param_value.uuid, ...param.deprecated_param_value.template_deprecated];
            else
                selectedParamValues[param.uuid] = [suitableParamValue.uuid, ...args];
        }

        this.setState({
            selectedParamValues: selectedParamValues,
            open: true,
            isTest: task.is_test,
            device: this.state.device === null ? this.props.devices[0].uuid : this.state.device,
            total_iterations: task.total_iterations
        }, () => this.updateCommand(selectedParamValues));
    }

    new() {
        let selectedParamValues = Object.assign({}, this.state.selectedParamValues);

        for (const param of this.props.params) {
            if (!(param.uuid in selectedParamValues))
                selectedParamValues[param.uuid] = [param.default_param_value.uuid, ...param.default_param_value.template_defaults];
        }

        this.setState({
            selectedParamValues: selectedParamValues,
            open: true,
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

        var dataJson = {};
        dataJson['params'] = this.state.selectedParamValues;
        dataJson['config'] = {
            "save_interval": parseInt(this.state.save_interval),
            "checkpoint_interval": parseInt(this.state.checkpoint_interval)
        };
        dataJson['device'] = this.state.device;

        data.append("data", JSON.stringify(dataJson));

        var url = "/" + (this.state.isTest ? "test" : "start") + "/" + this.props.project_name + "/" + this.state.total_iterations;

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

        selectedParamValues[param.uuid] = [value.uuid];
        selectedParamValues[param.uuid] = selectedParamValues[param.uuid].concat(arg);

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
        });
    }

    onCheckpointIntervalChange(event) {
        this.setState({
            checkpoint_interval: event.target.value
        });
    }

    updateCommand(selectedParamValues = null, total_iterations = null) {
        if (selectedParamValues === null)
            selectedParamValues = this.state.selectedParamValues;
        if (total_iterations === null)
            total_iterations = this.state.total_iterations;
        let paramValues = "";

        for (const param of this.props.params) {
            if (param.uuid in selectedParamValues) {
                paramValues += param.uuid + " " + selectedParamValues[param.uuid][0];
                for (let i = 1; i < selectedParamValues[param.uuid].length; i++)
                    paramValues += ":\"" + selectedParamValues[param.uuid][i] + "\"";
                paramValues += " ";
            }
        }

        if (total_iterations !== "") {
            this.setState({
                command: "taskplan " + (this.state.isTest ? "test " : "start ") + this.props.project_name + " " + total_iterations + " " + paramValues,
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

    render() {
        return (
            <div ref={this.wrapperRef} style={{'display': (this.state.open ? 'block' : 'none')}}>
                <div className="task-editor slide-editor editor">
                    <div className="header">Start task<i className="fas fa-times" onClick={this.close}></i></div>
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
                    <div className="field">
                        <label>Is test:</label>
                        <input checked={this.state.isTest} onChange={this.onIsTestChange} type="checkbox" />
                    </div>
                    <ParamFilter selectMultiple={false} paramsByGroup={this.props.paramsByGroup} selectedParamValues={this.state.selectedParamValues} toggleSelection={this.onSelectionChange} useTemplateFields={true}/>
                    <ConfigEditor ref={this.configEditor} url={"/config/task/" + this.props.project_name} bases={Object.values(this.state.selectedParamValues)} preview={true} />
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
                        <input className="command" ref={this.commandInput} onClick={this.copyCommand} data-toggle="tooltip" data-placement="bottom" data-original-title={this.state.commandHint} value={this.state.command} readOnly={true} />
                    </div>
                    <div className="buttons">
                        <div onClick={this.run}>Run</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskEditor;