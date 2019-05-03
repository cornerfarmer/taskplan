import React from 'react';

class PresetEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preset: null,
            name: '',
            deprecatedChoice: ''
        };

        this.configEditor = React.createRef();
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.new = this.new.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDeprecatedChoiceChange = this.onDeprecatedChoiceChange.bind(this);
    }

    open(preset) {
        this.props.closeEditors();
        this.setState({
            preset: preset,
            name: preset.name,
            deprecatedChoice: preset.deprecatedChoice
        });
    }

    new(project_name) {
        this.props.closeEditors();
        this.setState({
            preset: {name: 'New preset', project_name: project_name, choices: []},
            name: '',
            deprecatedChoice: ''
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
        dataJson['name'] = this.state.name;
        dataJson['deprecated_choice'] = this.state.deprecatedChoice;
        dataJson['config'] = {};

        data.append("data", JSON.stringify(dataJson));

        var url = "";
        if (this.state.preset.uuid)
            url = "/edit_preset/" + this.state.preset.project_name + "/" + this.state.preset.uuid;
        else
            url = "/add_preset/" + this.state.preset.project_name;

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

    onDeprecatedChoiceChange(event) {
        this.setState({
            deprecatedChoice: event.target.value
        });
    }

    render() {
        if (this.state.preset !== null) {
            return (
                <div className="preset-editor editor" >
                    <div className="header">{this.state.preset.name}</div>
                    <div className="field">
                        <label>Name:</label>
                        <input value={this.state.name} onChange={this.onNameChange} required="required" />
                    </div>
                    {this.state.preset.choices.length > 0 &&
                    <div className="field">
                        <label>Choice for deprecated tasks:</label>
                        <select value={this.state.deprecatedChoice} onChange={this.onDeprecatedChoiceChange}>
                            {this.state.preset.choices.map(choice => (
                                <option value={choice.uuid}>{choice.name}</option>
                            ))}
                        </select>
                    </div>
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