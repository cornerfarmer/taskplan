import React from 'react';
import Prompt from "./Prompt";

class PresetEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preset: null,
            config: ''
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.new = this.new.bind(this);
        this.onChange = this.onChange.bind(this);
        this.textarea = React.createRef();
    }

    open(preset) {
        var data = Object.assign({}, preset.data);
        delete data.uuid;

        this.setState({
            preset: preset,
            config: JSON.stringify(data, null, 2)
        });
    }

    new(project_name) {
        this.close();
        this.setState({
            preset: {name: 'New preset', project_name: project_name},
            config: JSON.stringify({config: {}}, null, 2)
        });
    }

    close() {
        this.setState({
            preset: null
        });
    }

    save() {
        var data = new FormData();
        data.append("data", this.state.config);

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
    

    onChange(e) {
        this.setState({
            config: e.target.value
        });
    }

    render() {
        if (this.state.preset !== null) {
            return (
                <div id="preset-editor" >
                    <div className="header">{this.state.preset.name}</div>
                    <textarea ref={this.textarea} value={this.state.config} onChange={this.onChange}/>
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