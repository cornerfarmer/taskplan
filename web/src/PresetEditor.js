import React from 'react';
import ConfigEditor from "./ConfigEditor";

class PresetEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preset: null,
            name: '',
            base: '',
            abstract: false
        };

        this.configEditor = React.createRef();
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.new = this.new.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onBaseChange = this.onBaseChange.bind(this);
        this.onAbstractChange = this.onAbstractChange.bind(this);
    }

    open(preset, duplicate) {
        var wasOpen = this.state.preset !== null;

        if (duplicate) {
            this.setState({
                preset: {name: 'Duplicated ' + preset.name, project_name: preset.project_name, uuid: preset.uuid},
                name: 'Duplicated ' + preset.name,
                base: preset.base_uuid,
                abstract: preset.abstract
            });
        } else {
            this.setState({
                preset: preset,
                name: preset.name,
                base: preset.base_uuid,
                abstract: preset.abstract
            });
        }
        //if (wasOpen)
        //    this.jsonEditor.current.jsonEditor.set(data['config']);
    }

    new(project_name) {
        this.setState({
            preset: {name: 'New preset', project_name: project_name},
            name: '',
            base: this.props.default_preset,
            abstract: false
        });
    }

    close() {
        this.setState({
            preset: null
        });
    }

    save() {
        var data = new FormData();

        var dataJson = {};
        if (this.state.name !== "")
            dataJson['name'] = this.state.name;
        dataJson['base'] = this.state.base;
        if (this.state.abstract)
            dataJson['abstract'] = this.state.abstract;
        dataJson['config'] = this.configEditor.current.state.config;

        data.append("data", JSON.stringify(dataJson));

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
                    <ConfigEditor ref={this.configEditor} url={this.state.preset.uuid !== undefined ? "/config/preset/" + this.state.preset.project_name + "/" + this.state.preset.uuid : ""}/>
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