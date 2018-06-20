import React from 'react';
import ConfigEditor from "./ConfigEditor";

class PresetEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preset: null,
            name: '',
            base: '',
            abstract: false,
            dynamic: false,
            forceDynamic: false,
            uuid_to_load: null,
            task_uuid: null
        };

        this.configEditor = React.createRef();
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.new = this.new.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onBaseChange = this.onBaseChange.bind(this);
        this.onAbstractChange = this.onAbstractChange.bind(this);
        this.onDynamicChange = this.onDynamicChange.bind(this);
        this.onIsBaseDynamic = this.onIsBaseDynamic.bind(this);
    }

    open(preset, duplicate, task_uuid=null) {
        var wasOpen = this.state.preset !== null;

        if (duplicate) {
            this.setState({
                preset: {name: (task_uuid === null ? 'Duplicated ' : 'Rerun ') + preset.name, project_name: preset.project_name},
                name: (task_uuid === null ? 'Duplicated ' : 'Rerun ') + preset.name,
                base: preset.base_uuid,
                uuid_to_load: preset.uuid,
                abstract: preset.abstract,
                dynamic: preset.dynamic,
                forceDynamic: false,
                task_uuid: task_uuid
            });
        } else {
            this.setState({
                preset: preset,
                name: preset.name,
                base: preset.base_uuid,
                uuid_to_load: preset.uuid,
                abstract: preset.abstract,
                dynamic: preset.dynamic,
                forceDynamic: false,
                task_uuid: null
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
            abstract: false,
            dynamic: false,
            uuid_to_load: null,
            forceDynamic: false,
            task_uuid: null
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
        if (this.state.preset.uuid !== this.props.default_preset)
            dataJson['base'] = this.state.base;
        if (this.state.abstract)
            dataJson['abstract'] = this.state.abstract;
        if (this.state.dynamic)
            dataJson['dynamic'] = this.state.dynamic;
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
            abstract: event.target.checked
        });
    }

    onDynamicChange(event) {
        this.setState({
            dynamic: event.target.checked
        });
    }

    onIsBaseDynamic(isDynamic) {
        if (isDynamic) {
            this.setState({
                dynamic: true,
                forceDynamic: true
            });
        } else if (this.state.forceDynamic) {
            this.setState({
                dynamic: false,
                forceDynamic: false
            });
        }
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
                    {this.state.preset.uuid !== this.props.default_preset &&
                        <div className="field">
                            <label>Base:</label>
                            <select value={this.state.base} onChange={this.onBaseChange}>
                                {this.props.presets.filter(preset => preset.uuid !== this.state.uuid_to_load).map(preset => (
                                    <option value={preset.uuid}>{preset.name}</option>
                                ))}
                            </select>
                        </div>
                    }
                    <div className="field">
                        <label>Abstract:</label>
                        <input checked={this.state.abstract} onChange={this.onAbstractChange} type="checkbox" />
                    </div>
                    <div className="field">
                        <label>Dynamic:</label>
                        <input checked={this.state.dynamic} onChange={this.onDynamicChange} type="checkbox" disabled={this.state.forceDynamic} />
                    </div>
                    {this.state.task_uuid === null ? (
                            <ConfigEditor ref={this.configEditor} onDynamicChange={this.onIsBaseDynamic} url={"/config/preset/" + this.state.preset.project_name + "/" + this.state.base + (this.state.uuid_to_load !== null ? "/" + this.state.uuid_to_load : "")} base={this.state.base}/>
                        ) : (
                            <ConfigEditor ref={this.configEditor} onDynamicChange={this.onIsBaseDynamic} url={"/config/task/" + this.state.base + "/" + this.state.task_uuid}/>
                        )
                    }
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