import React from 'react';
import ConfigEditor from "./ConfigEditor";
import Preset from "./Preset";
import Option from "./Option";

class TaskEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_choices: [],
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

    open(choice, duplicate, preset, possible_base_choices) {

        if (duplicate) {
            this.setState({
                choice: {name: choice.name, project_name: choice.project_name},
                name: choice.name,
                base: choice.base_uuid,
                uuid_to_load: choice.uuid,
                abstract: choice.abstract,
                dynamic: choice.dynamic,
                forceDynamic: false,
                preset: preset,
                possible_base_choices: possible_base_choices
            });
        } else {
            this.setState({
                choice: choice,
                name: choice.name,
                base: choice.base_uuid,
                uuid_to_load: choice.uuid,
                abstract: choice.abstract,
                dynamic: choice.dynamic,
                forceDynamic: false,
                preset: preset,
                possible_base_choices: possible_base_choices
            });
        }
    }

    new() {
        let selected_choices = {};

        for (const preset of this.props.presets) {
            if (preset.choices.length > 0)
                selected_choices[preset.uuid] = preset.choices[0].uuid;
        }

        this.setState({
            selected_choices: selected_choices,
            open: true
        });
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
        dataJson['choices'] = this.state.selected_choices;
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

    onSelectionChange(preset, event) {
        const selected_choices = Object.assign({}, this.state.selected_choices);

        selected_choices[preset.uuid] = event.target.value;

        this.setState({
            selected_choices: selected_choices
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
                        <input value={this.state.total_iterations} onChange={this.onTotalIterationsChange} />
                    </div>
                    <div className="field">
                        <label>Save interval:</label>
                        <input value={this.state.save_interval} onChange={this.onSaveIntervalChange} />
                    </div>
                    <div className="field">
                        <label>Checkpoint interval:</label>
                        <input value={this.state.checkpoint_interval} onChange={this.onCheckpointIntervalChange} />
                    </div>
                    {this.props.presets.filter(preset => preset.choices.length > 1).sort(function (a, b) {
                        return a.name.localeCompare(b.name);
                    }).map(preset => (
                        <Option
                            key={preset.uuid}
                            preset={preset}
                            selection={this.state.selected_choices[preset.uuid]}
                            onSelectionChangeFunc={this.onSelectionChange}
                        />
                    ))}
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