import React from 'react';
import ConfigEditor from "./ConfigEditor";
import Preset from "./Preset";
import Option from "./Option";
import PresetFilter from "./PresetFilter";
import JsonEditor from "./JsonEditor";

class TaskEditor extends React.Component {
    constructor(props) {
        super(props);

        let selectedChoices = {};

        for (const preset of props.presets) {
            if (preset.choices.length > 0)
                selectedChoices[preset.uuid] = preset.choices[0].uuid;
        }

        this.state = {
            selectedChoices: selectedChoices,
            uuid_to_load: null,
            total_iterations: "",
            save_interval: "0",
            checkpoint_interval: "0",
            open: false
        };


        this.configEditor = React.createRef();
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.run = this.run.bind(this);
        this.new = this.new.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.onTotalIterationsChange = this.onTotalIterationsChange.bind(this);
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
                selectedChoices[preset.uuid] = preset.deprecated_choice.uuid;
            else
                selectedChoices[preset.uuid] = suitableChoice.uuid;
        }

        this.setState({
            selectedChoices: selectedChoices,
            open: true
        });
    }

    new() {
        let selectedChoices = Object.assign({}, this.state.selectedChoices);

        for (const preset of this.props.presets) {
            if (!(preset.uuid in selectedChoices))
                selectedChoices[preset.uuid] = preset.choices[0].uuid;
        }

        this.setState({
            selectedChoices: selectedChoices,
            open: true
        });
    }

    close() {
        this.setState({
            choice: null,
            open: false
        });

        this.props.onClose();
    }

    run() {
        var data = new FormData();

        var dataJson = {};
        dataJson['choices'] = this.state.selectedChoices;
        dataJson['config'] = {
            "save_interval": this.state.save_interval,
            "checkpoint_interval": this.state.checkpoint_interval
        };

        data.append("data", JSON.stringify(dataJson));

        var url = "/start/" + this.props.project_name + "/" + this.state.total_iterations;

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

    onSelectionChange(preset, choice) {
        const selectedChoices = Object.assign({}, this.state.selectedChoices);

        selectedChoices[preset.uuid] = choice.uuid;

        this.setState({
            selectedChoices: selectedChoices
        });
    }


    onTotalIterationsChange(event) {
        this.setState({
            total_iterations: event.target.value
        });
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

    render() {
        if (this.state.open) {
            return (
                <div className="task-editor editor">
                    <div className="header">Start task</div>
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
                    <PresetFilter presets={this.props.presets} selectedChoices={this.state.selectedChoices} onSelectionChange={this.onSelectionChange}/>
                    <ConfigEditor ref={this.configEditor} url={"/config/task/" + this.props.project_name} bases={Object.values(this.state.selectedChoices)} preview={true}/>
                    <div className="buttons">
                        <div onClick={this.run}>Run</div>
                        <div onClick={this.close}>Cancel</div>
                    </div>
                </div>
            );
        } else {
            return "";
        }
    }
}

export default TaskEditor;