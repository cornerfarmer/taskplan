import React from 'react';

class PresetEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preset: null,
            name: ''
        };

        this.configEditor = React.createRef();
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.new = this.new.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
    }

    open(preset) {
        this.setState({
            preset: preset,
            name: preset.name
        });
    }

    new(project_name) {
        this.setState({
            preset: {name: 'New preset', project_name: project_name},
            name: ''
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

    render() {
        if (this.state.preset !== null) {
            return (
                <div className="preset-editor editor" >
                    <div className="header">{this.state.preset.name}</div>
                    <div className="field">
                        <label>Name:</label>
                        <input value={this.state.name} onChange={this.onNameChange} placeholder="<generate name>" />
                    </div>
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