import React from 'react';
import ConfigEditor from "./ConfigEditor";

class ChoiceEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choice: null,
            name: '',
            base: '',
            abstract: false,
            dynamic: false,
            forceDynamic: false,
            possible_base_choices: [],
            uuid_to_load: null,
            preset: null,
            templateDefaults: ""
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
        this.onTemplateChange = this.onTemplateChange.bind(this);
        this.onTemplateDefaultsChange = this.onTemplateDefaultsChange.bind(this);
    }

    open(choice, duplicate, preset, possible_base_choices) {
        this.props.closeEditors();
        if (duplicate) {
            this.setState({
                choice: {name: choice.name, project_name: choice.project_name},
                name: choice.name,
                base: choice.base_uuid,
                uuid_to_load: choice.uuid,
                abstract: choice.abstract,
                dynamic: choice.dynamic,
                template: choice.isTemplate,
                templateDefaults: choice.template_defaults,
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
                template: choice.isTemplate,
                templateDefaults: choice.template_defaults,
                forceDynamic: false,
                preset: preset,
                possible_base_choices: possible_base_choices
            });
        }
    }

    new(preset, possible_base_choices) {
        this.props.closeEditors();
        this.setState({
            choice: {name: 'New choice', project_name: preset.project_name},
            name: '',
            base: '',
            abstract: false,
            dynamic: false,
            uuid_to_load: null,
            forceDynamic: false,
            preset: preset,
            possible_base_choices: possible_base_choices
        });
    }

    close() {
        this.setState({
            choice: null
        });
    }

    save() {

        var data = new FormData();

        var dataJson = {};
        if (this.state.name !== "")
            dataJson['name'] = this.state.name;
        if (this.state.base !== '')
            dataJson['base'] = this.state.base;
        if (this.state.abstract)
            dataJson['abstract'] = this.state.abstract;
        if (this.state.dynamic)
            dataJson['dynamic'] = this.state.dynamic;
        if (this.state.template) {
            dataJson['isTemplate'] = this.state.template;
            dataJson['template_defaults'] = [this.state.templateDefaults];
        }
        dataJson['config'] = this.configEditor.current.state.config;

        data.append("data", JSON.stringify(dataJson));

        var url = "";
        if (this.state.choice.uuid)
            url = "/edit_choice/" + this.state.preset.project_name  + "/" + this.state.preset.uuid + "/" + this.state.choice.uuid;
        else
            url = "/add_choice/" + this.state.preset.project_name + "/" + this.state.preset.uuid;

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

    onTemplateChange(event) {
        this.setState({
            template: event.target.checked
        });
    }

    onTemplateDefaultsChange(event) {
        this.setState({
            templateDefaults: event.target.value
        });
    }

    render() {
        if (this.state.choice !== null) {
            return (
                <div className="choice-editor editor" >
                    <div className="header">{this.state.choice.name}</div>
                    <div className="field">
                        <label>Name:</label>
                        <input value={this.state.name} onChange={this.onNameChange}  required="required" />
                    </div>
                    <div className="field">
                        <label>Base:</label>
                        <select value={this.state.base} onChange={this.onBaseChange}>
                            <option value="">None</option>
                            {this.state.possible_base_choices.filter(choice => choice.uuid !== this.state.uuid_to_load).map(choice => (
                                <option value={choice.uuid}>{choice.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="field">
                        <label>Abstract:</label>
                        <input checked={this.state.abstract} onChange={this.onAbstractChange} type="checkbox" />
                    </div>
                    <div className="field">
                        <label>Dynamic:</label>
                        <input checked={this.state.dynamic} onChange={this.onDynamicChange} type="checkbox" disabled={this.state.forceDynamic} />
                    </div>
                    <div className="field">
                        <label>Template:</label>
                        <input checked={this.state.template} onChange={this.onTemplateChange} type="checkbox" />
                    </div>
                    {this.state.template &&
                    <div className="field">
                        <label>Template default:</label>
                        <input value={this.state.templateDefaults} onChange={this.onTemplateDefaultsChange} />
                    </div> }
                    <ConfigEditor ref={this.configEditor} onDynamicChange={this.onIsBaseDynamic} url={"/config/choice/" + this.state.choice.project_name + (this.state.uuid_to_load !== null ? "/" + this.state.uuid_to_load : "")} bases={[this.state.base]}/>
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

export default ChoiceEditor;