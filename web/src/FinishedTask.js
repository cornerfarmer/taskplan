import React from 'react';
import Prompt from "./Prompt";

class FinishedTask extends React.Component {
    constructor(props) {
        super(props);

        this.promptRefs = React.createRef();
        this.promptExtraRefs = React.createRef();
        this.openDialog = this.openDialog.bind(this);
        this.openExtraDialog = this.openExtraDialog.bind(this);
        this.openLog = this.openLog.bind(this);
    }

    openDialog() {
        this.promptRefs.current.openDialog();
    }

    openExtraDialog() {
        this.promptExtraRefs.current.openDialog();
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
                        <span><span>Iterations:</span> {this.props.task.finished_iterations}</span>
                        <span><span>Started:</span> {this.props.task.creation_time.toShortStr()}</span>
                        <span><span>Finished:</span> {this.props.task.saved_time.toShortStr()}</span>
                    </div>
                </div>
                <div className="toolbar">
                    <div className="action" onClick={this.openDialog}>
                        <i className="fa fa-redo"></i>
                    </div>
                    <div className="action" onClick={this.openExtraDialog}>
                        <i className="fa fa-plus"></i>
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
                <Prompt ref={this.promptRefs} header="How many iterations?" text="Specify the number of iterations, you want the task to run:" url={"/start/" + this.props.task.project_name + "/" + this.props.task.preset_uuid}/>
                <Prompt ref={this.promptExtraRefs} defaultValue={this.props.task.total_iterations} header="Change total iterations?" text="Specify the new number of iterations, you want the task to run:" url={"/continue/" + this.props.task.uuid}/>
            </li>
        );
    }
}

export default FinishedTask;