import React from 'react';
import ConfigEditor from "./ConfigEditor";
import Preset from "./Preset";
import Option from "./Option";
import PresetFilter from "./PresetFilter";
import JsonEditor from "./JsonEditor";
import $ from "jquery";

class TaskEditor extends React.Component {
    constructor(props) {
        super(props);

        let selectedChoices = {};

        for (const preset of props.presets) {
            if (preset.choices.length > 0)
                selectedChoices[preset.uuid] = [preset.choices[0].uuid];
        }

        this.state = {
            selectedChoices: selectedChoices,
            uuid_to_load: null,
            total_iterations: "",
            save_interval: "0",
            checkpoint_interval: "0",
            open: false,
            command: "",
            commandHint: "",
            isTest: false
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
        this.wrapperRef = React.createRef();
        this.commandInput = React.createRef();
    }

    open(task) {

        let selectedChoices = Object.assign({}, this.state.selectedChoices);

        for (const preset of this.props.presets) {
            let suitableChoice = null;
            for (const choice of task.choices) {
                if (choice.preset === preset.uuid) {
                    suitableChoice = choice;
                    break;
                }
            }

            if (suitableChoice === null)
                selectedChoices[preset.uuid] = [preset.deprecated_choice.uuid];
            else
                selectedChoices[preset.uuid] = [suitableChoice.uuid];
        }

        this.setState({
            selectedChoices: selectedChoices,
            open: true,
            isTest: task.is_test
        });
        this.updatecommand(selectedChoices);
    }

    new() {
        let selectedChoices = Object.assign({}, this.state.selectedChoices);

        for (const preset of this.props.presets) {
            if (!(preset.uuid in selectedChoices))
                selectedChoices[preset.uuid] = [preset.default_choice.uuid];
        }

        this.setState({
            selectedChoices: selectedChoices,
            open: true
        });
        this.updatecommand(selectedChoices);
    }

    close() {
        this.setState({
            choice: null,
            open: false
        });
    }

    run() {
        var data = new FormData();

        var dataJson = {};
        dataJson['choices'] = this.state.selectedChoices;
        dataJson['config'] = {
            "save_interval": parseInt(this.state.save_interval),
            "checkpoint_interval": parseInt(this.state.checkpoint_interval)
        };

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

    onSelectionChange(preset, choice, arg=null) {
        const selectedChoices = Object.assign({}, this.state.selectedChoices);

        selectedChoices[preset.uuid] = [choice.uuid];
        if (arg !== null)
            selectedChoices[preset.uuid].push(arg);

        this.setState({
            selectedChoices: selectedChoices
        });
        this.updatecommand(selectedChoices);
    }


    onTotalIterationsChange(event) {
        this.setState({
            total_iterations: event.target.value
        });
        this.updatecommand(null, event.target.value);
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

    updatecommand(selectedChoices = null, total_iterations = null) {
        if (selectedChoices === null)
            selectedChoices = this.state.selectedChoices;
        if (total_iterations === null)
            total_iterations = this.state.total_iterations;
        let choices = "";

        for (const preset of this.props.presets) {
            if (preset.uuid in selectedChoices)
                choices += preset.uuid + " " + selectedChoices[preset.uuid][0] + " ";
        }

        if (total_iterations !== "") {
            this.setState({
                command: "taskplan " + (this.state.isTest ? "test " : "start ") + this.props.project_name + " " + total_iterations + " " + choices,
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
        }, () => this.updatecommand());
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
                    <PresetFilter presetsByGroup={this.props.presetsByGroup} selectedChoices={this.state.selectedChoices} onSelectionChange={this.onSelectionChange} useTemplateFields={true}/>
                    <ConfigEditor ref={this.configEditor} url={"/config/task/" + this.props.project_name} bases={Object.values(this.state.selectedChoices)} preview={true} />
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