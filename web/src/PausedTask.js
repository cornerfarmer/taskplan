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
                <div className="content">
                    <div className="title"><span className="try-number">{this.props.task.try}</span>{this.props.task.preset_name}</div>
                    <div className="footer">
                        <span><span>Iterations:</span> {this.props.task.finished_iterations} / {this.props.task.total_iterations}</span>
                        <span><span>Created:</span> {this.props.task.creation_time.toShortStr()}</span>
                        <span><span>Paused:</span> {this.props.task.saved_time.toShortStr()}</span>
                    </div>
                </div>
                <div className="toolbar">
                    <div className="action" onClick={this.continue}>
                        <i className="fa fa-play"></i>
                    </div>
                </div>
            </li>
        );
    }
}

export default PausedTask;