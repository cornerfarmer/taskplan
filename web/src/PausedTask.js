import React from 'react';

class PausedTask extends React.Component {
    constructor(props) {
        super(props);
        this.continue = this.continue.bind(this);
        this.finish = this.finish.bind(this);
        this.openLog = this.openLog.bind(this);
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

    finish() {
        fetch("/finish/" + this.props.task.uuid)
            .then(res => res.json())
            .then(
                (result) => {

                },
                (error) => {

                }
            )
    }

    openLog() {
        window.open("/log/" + this.props.task.uuid, '_blank');
    }

    render() {
        return (
            <li className="item">
                <div className="content">
                    <div className="title"><span className="try-number">{this.props.task.try}</span>{this.props.task.preset_name}</div>
                    <div className="footer">
                        <span><span>Iterations:</span> {this.props.task.finished_iterations} / {this.props.task.total_iterations}</span>
                        <span><span>Started:</span> {this.props.task.creation_time.toShortStr()}</span>
                        <span><span>Paused:</span> {this.props.task.saved_time.toShortStr()}</span>
                    </div>
                </div>
                <div className="toolbar">
                    <div className="action" onClick={this.continue}>
                        <i className="fa fa-play"></i>
                    </div>
                    <div className="action" onClick={this.finish}>
                        <i className="fas fa-flag-checkered"></i>
                    </div>
                    <div className="dropdown">
                        <div className="action dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                            <i className="fas fa-ellipsis-h"></i>
                        </div>
                        <div className="dropdown-menu">
                            <div className="action" onClick={this.openLog}>
                                <i className="far fa-file-alt"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

export default PausedTask;