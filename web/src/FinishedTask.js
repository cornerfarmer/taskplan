import React from 'react';

class FinishedTask extends React.Component {
    constructor(props) {
        super(props);
        this.restart = this.restart.bind(this);
    }

    restart() {
        fetch("/start/" + this.props.task.project_name + "/" + this.props.task.preset_uuid)
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
                        <span>Iterations: {this.props.task.finished_iterations}</span>
                        <span>Created: {this.props.task.creation_time.toShortStr()}</span>
                        <span>Finished: {this.props.task.saved_time.toShortStr()}</span>
                    </div>
                </div>
                <div className="toolbar">
                    <div className="action" onClick={this.restart}>
                        <i className="fa fa-redo"></i>
                    </div>
                </div>
            </li>
        );
    }
}

export default FinishedTask;