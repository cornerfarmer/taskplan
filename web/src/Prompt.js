import React from 'react';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import ace from 'brace';
import 'brace/mode/json';

class Prompt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            inputValue: this.props.defaultValue
        };

        this.start = this.start.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    start() {
        this.setState({
            dialogOpen: false
        });
        if (this.props.presetEditor) {
            var data = new FormData();
            data.append("data", JSON.stringify(this.state.inputValue));

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
            fetch(this.props.url + "/" + this.state.inputValue)
                .then(res => res.json())
                .then(
                    (result) => {

                    },
                    (error) => {

                    }
                )
        }
    }

    openDialog() {
        this.setState({
            dialogOpen: true
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
                    <div className= {this.props.presetEditor ? 'prompt preset-prompt' : 'prompt'}>
                        <div className="prompt-header">{this.props.header}</div>
                        <div className="prompt-text">{this.props.text}</div>
                        {!this.props.presetEditor &&
                            <input autoFocus onFocus={(e) => {e.target.select()}} type="text" name="iterations" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} onKeyDown={this.onKeyDown} />
                        }
                        {this.props.presetEditor &&
                            <Editor ref={this.jsonEditor} allowedModes={['code', 'tree']} mode='code' value={{}} onChange={this.onChange} ace={ace} history={true}/>
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