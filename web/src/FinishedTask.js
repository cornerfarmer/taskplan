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
                <div className="header">
                    <div className="toolbar">
                        <div className="action" onClick={this.restart}>
                            <i className="fa fa-redo"></i>
                        </div>
                    </div>
                    <div className="title">{this.props.task.preset_name}</div>
                </div>
                <div className="footer">
                    Iterations: {this.props.task.finished_iterations}
                </div>
            </li>
        );
    }
}

export default FinishedTask;