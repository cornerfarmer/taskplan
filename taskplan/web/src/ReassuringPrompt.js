import React from 'react';

class ReassuringPrompt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false
        };

        this.execute = this.execute.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    execute() {
        this.setState({
            dialogOpen: false
        });

        fetch(this.props.url)
            .then(res => res.json())
            .then(
                (result) => {
                    if (this.props.onSuccess !== undefined)
                        this.props.onSuccess();
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

    render() {
        if (this.state.dialogOpen) {
            return (
                <div className="prompt-wrapper">
                    <div className='prompt'>
                        <div className="prompt-header">{this.props.header}</div>
                        <div className="prompt-text">{this.props.text}</div>
                        <div className="buttons">
                            <div onClick={this.execute}>Yes</div>
                            <div onClick={this.closeDialog}>No</div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return "";
        }
    }
}

export default ReassuringPrompt;