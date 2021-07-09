import React from 'react';
import ConfigEditor from "./ConfigEditor";

class Prompt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            inputValue: this.props.defaultValue,
            device: null
        };

        this.configEditor = React.createRef();
        this.start = this.start.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onDeviceChange = this.onDeviceChange.bind(this);
    }

    start() {
        this.setState({
            dialogOpen: false
        });
        if (this.props.url) {
            if (this.props.paramEditor) {
                var data = new FormData();
                data.append("data", JSON.stringify(this.configEditor.current.state.config));

                fetch(this.props.url,
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
            } else {
                fetch(this.props.url + (this.props.devices ? "/" + this.state.device : "") + "/" + this.state.inputValue)
                    .then(res => res.json())
                    .then(
                        (result) => {

                        },
                        (error) => {

                        }
                    )
            }
        } else {
            this.props.onSend(this.state.inputValue);
        }
    }

    onDeviceChange(event) {
        this.setState({
            device: event.target.value
        });
    }

    openDialog() {
        this.setState({
            dialogOpen: true,
            device: (this.props.devices ? this.props.devices[0].uuid : null)
        });
    }

    closeDialog() {
        this.setState({
            dialogOpen: false
        });
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    onKeyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.start();
        }
        if (e.keyCode === 27) {
            e.preventDefault();
            this.closeDialog();
        }
    }

    onChange(data) {
        this.setState({
            inputValue: data
        });
    }

    render() {
        if (this.state.dialogOpen) {
            return (
                <div className="prompt-wrapper">
                    <div className= {this.props.paramEditor ? 'prompt param-prompt' : 'prompt'}>
                        <div className="prompt-header">{this.props.header}</div>
                        <div className="prompt-text">{this.props.text}</div>
                        {!this.props.paramEditor &&
                            <input autoFocus onFocus={(e) => {e.target.select()}} type="text" name="iterations" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} onKeyDown={this.onKeyDown} />
                        }
                        {this.props.paramEditor &&
                            <ConfigEditor ref={this.configEditor} url={this.props.paramEditorUrl} />
                        }
                        {this.props.devices &&
                            <select value={this.state.device} onChange={this.onDeviceChange}>
                                {this.props.devices.map(device => (
                                    <option value={device.uuid}>{device.name}</option>
                                ))}
                            </select>
                        }
                        <div className="buttons">
                            <div onClick={this.start}>Ok</div>
                            <div onClick={this.closeDialog}>Cancel</div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return "";
        }
    }
}

export default Prompt;