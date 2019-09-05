import React from 'react';
import ConfigEditor from "./ConfigEditor";

class ParamValueEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paramValue: null,
            name: '',
            base: '',
            abstract: false,
            dynamic: false,
            forceDynamic: false,
            possible_base_param_values: [],
            uuid_to_load: null,
            param: null,
            templateDefaults: "",
            templateDeprecated: ""
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
        this.onTemplateDeprecatedChange = this.onTemplateDeprecatedChange.bind(this);
    }

    open(paramValue, duplicate, param, possible_base_param_values) {
        this.props.closeEditors();
        if (duplicate) {
            this.setState({
                paramValue: {name: paramValue.name, project_name: paramValue.project_name},
                name: paramValue.name,
                base: paramValue.base_uuid,
                uuid_to_load: paramValue.uuid,
                abstract: paramValue.abstract,
                dynamic: paramValue.dynamic,
                template: paramValue.isTemplate,
                templateDefaults: paramValue.template_defaults,
                templateDeprecated: paramValue.template_deprecated,
                forceDynamic: false,
                param: param,
                possible_base_param_values: possible_base_param_values
            });
        } else {
            this.setState({
                paramValue: paramValue,
                name: paramValue.name,
                base: paramValue.base_uuid,
                uuid_to_load: paramValue.uuid,
                abstract: paramValue.abstract,
                dynamic: paramValue.dynamic,
                template: paramValue.isTemplate,
                templateDefaults: paramValue.template_defaults,
                templateDeprecated: paramValue.template_deprecated,
                forceDynamic: false,
                param: param,
                possible_base_param_values: possible_base_param_values
            });
        }
    }

    new(param, possible_base_param_values) {
        this.props.closeEditors();
        this.setState({
            paramValue: {name: 'New parameter value', project_name: param.project_name},
            name: '',
            base: '',
            abstract: false,
            dynamic: false,
            uuid_to_load: null,
            forceDynamic: false,
            param: param,
            possible_base_param_values: possible_base_param_values
        });
    }

    close() {
        this.setState({
            paramValue: null
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
            dataJson['template_defaults'] = this.state.templateDefaults;
            dataJson['template_deprecated'] = this.state.templateDeprecated;
        }
        dataJson['config'] = this.configEditor.current.state.config;

        data.append("data", JSON.stringify(dataJson));

        var url = "";
        if (this.state.paramValue.uuid)
            url = "/edit_param_value/" + this.state.param.project_name  + "/" + this.state.param.uuid + "/" + this.state.paramValue.uuid;
        else
            url = "/add_param_value/" + this.state.param.project_name + "/" + this.state.param.uuid;

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
            templateDefaults: [event.target.value]
        });
    }

    onTemplateDeprecatedChange(event) {
        this.setState({
            templateDeprecated: [event.target.value]
        });
    }

    render() {
        if (this.state.paramValue !== null) {
            return (
                <div className="param-value-editor editor" >
                    <div className="header">{this.state.paramValue.name}</div>
                    <div className="field">
                        <label>Name:</label>
                        <input value={this.state.name} onChange={this.onNameChange}  required="required" />
                    </div>
                    <div className="field">
                        <label>Base:</label>
                        <select value={this.state.base} onChange={this.onBaseChange}>
                            <option value="">None</option>
                            {this.state.possible_base_param_values.filter(value => value.uuid !== this.state.uuid_to_load).map(paramValue => (
                                <option value={paramValue.uuid}>{paramValue.name}</option>
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
                        <input value={this.state.templateDefaults[0]} onChange={this.onTemplateDefaultsChange} />
                    </div> }
                    {this.state.template &&
                    <div className="field">
                        <label>Template deprecated:</label>
                        <input value={this.state.templateDeprecated[0]} onChange={this.onTemplateDeprecatedChange} />
                    </div> }
                    <ConfigEditor ref={this.configEditor} onDynamicChange={this.onIsBaseDynamic} url={"/config/param_value/" + this.state.paramValue.project_name + (this.state.uuid_to_load !== null ? "/" + this.state.uuid_to_load : "")} bases={[this.state.base]}/>
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

export default ParamValueEditor;