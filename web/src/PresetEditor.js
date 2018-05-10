import React from 'react';
import Prompt from "./Prompt";

class PresetEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preset: null
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.textarea = React.createRef();
    }

    open(preset) {
        this.setState({
            preset: preset
        });
    }

    close() {
        this.setState({
            preset: null
        });
    }

    save() {
        var data = new FormData();
        data.append("data", this.textarea.current.value);

        fetch("/edit/" + this.state.preset.project_name + "/" + this.state.preset.uuid,
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

    render() {
        if (this.state.preset !== null) {
            return (
                <div id="preset-editor" >
                    <div className="header">{this.state.preset.name}</div>
                    <textarea ref={this.textarea} defaultValue={JSON.stringify(this.state.preset.data, null, 2)} />
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