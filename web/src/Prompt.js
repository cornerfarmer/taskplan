import React from 'react';

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
    }

    start() {
        this.setState({
            dialogOpen: false
        });
        fetch(this.props.url + "/" + this.state.inputValue)
            .then(res => res.json())
            .then(
                (result) => {

                },
                (error) => {

                }
            )
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

    render() {
        if (this.state.dialogOpen) {
            return (
                <div className="prompt-wrapper">
                    <div className="prompt">
                        <div className="prompt-header">{this.props.header}</div>
                        <div className="prompt-text">{this.props.text}</div>
                        <input autoFocus onFocus={(e) => {e.target.select()}} type="text" name="iterations" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} onKeyDown={this.onKeyDown} />
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