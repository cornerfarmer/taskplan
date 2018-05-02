import React from 'react';

class PausedTask extends React.Component {
    constructor(props) {
        super(props);
        this.continue = this.continue.bind(this);
    }

    continue() {
        fetch("/continue/" + this.props.task.uuid)
            .then(res => res.json())
            .then(
                (result) => {

                },
                (error) => {

                }
            )
    }

    render() {
        return (
            <li className="item">
                <div className="header">
                    <div className="toolbar">
                        <div className="action" onClick={this.continue}>
                            <i className="fa fa-play"></i>
                        </div>
                    </div>
                    <div className="title">{this.props.task.preset_name}</div>
                </div>
                <div className="footer">
                    Iterations: {this.props.task.finished_iterations} / {this.props.task.total_iterations}
                </div>
            </li>
        );
    }
}

export default PausedTask;