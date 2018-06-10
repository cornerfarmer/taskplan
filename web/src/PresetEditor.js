import React from 'react';
import Prompt from "./Prompt";
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import ace from 'brace';
import 'brace/mode/json';

class PresetEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preset: null,
            config: '',
            mode: 'code',
            name: '',
            base: '',
            abstract: false
        };

        this.jsonEditor = React.createRef();
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.new = this.new.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onModeChange = this.onModeChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onBaseChange = this.onBaseChange.bind(this);
        this.onAbstractChange = this.onAbstractChange.bind(this);
    }

    open(preset, duplicate) {
        var data = Object.assign({}, preset.data);
        delete data.uuid;
        delete data.creation_time;
        var wasOpen = this.state.preset !== null;

        if (duplicate) {
            this.setState({
                preset: {name: 'Duplicated ' + preset.name, project_name: preset.project_name},
                config: data['config'],
                name: 'Duplicated ' + preset.name,
                base: preset.data.base,
                abstract: preset.abstract
            });
        } else {
            this.setState({
                preset: preset,
                config: data['config'],
                name: preset.name,
                base: preset.data.base,
                abstract: preset.abstract
            });
        }
        if (wasOpen)
            this.jsonEditor.current.jsonEditor.set(data['config']);
    }

    new(project_name) {
        var wasOpen = this.state.preset !== null;

        this.setState({
            preset: {name: 'New preset', project_name: project_name},
            config: {},
            name: '',
            base: this.props.default_preset,
            abstract: false
        });

        if (wasOpen)
            this.jsonEditor.current.jsonEditor.set({});
    }

    close() {
        this.setState({
            preset: null
        });

    }

    save() {
        var data = new FormData();
        data.append("data", JSON.stringify({'name': this.state.name, 'base': this.state.base, 'abstract': this.state.abstract, 'config': this.state.config}));

        var url = "";
        if (this.state.preset.uuid)
            url = "/edit/" + this.state.preset.project_name + "/" + this.state.preset.uuid;
        else
            url = "/add/" + this.state.preset.project_name;

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
    

    onChange(data) {
        this.setState({
            config: data
        });
    }

    onModeChange(mode) {
        this.setState({
            mode: mode
        });
    }

    onNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    onBaseChange(event) {
        this.setState({
            base: event.target.value
        });
    }

    onAbstractChange(event) {
        this.setState({
            abstract: event.target.value
        });
    }

    render() {
        if (this.state.preset !== null) {
            return (
                <div id="preset-editor" >
                    <div className="header">{this.state.preset.name}</div>
                    <div className="field">
                        <label>Name:</label>
                        <input value={this.state.name} onChange={this.onNameChange} placeholder="<generate name>" />
                    </div>
                    <div className="field">
                        <label>Base:</label>
                        <select value={this.state.base} onChange={this.onBaseChange} >
                            {this.props.presets.map(preset => (
                                <option value={preset.uuid}>{preset.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="field">
                        <label>Abstract:</label>
                        <input checked={this.state.abstract} onChange={this.onAbstractChange} type="checkbox" />
                    </div>
                    <Editor ref={this.jsonEditor} mode={this.state.mode} allowedModes={['code', 'tree']} value={this.state.config} onModeChange={this.onModeChange} onChange={this.onChange} ace={ace} history={true} />
                    <div className="buttons">
                        <div onClick={this.save}>Save</div>
                        <div onClick={this.close}>Cancel</div>
                    </div>
                </div>
            );
        } else {
            return "";
        }
    }
}

export default PresetEditor;