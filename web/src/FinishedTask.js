import React from 'react';
import Prompt from "./Prompt";

class FinishedTask extends React.Component {
    constructor(props) {
        super(props);

        this.promptRefs = React.createRef();
        this.openDialog = this.openDialog.bind(this);
    }

    openDialog() {
        this.promptRefs.current.openDialog();
    }

    render() {
        return (
            <li className="item">
                <div className="content">
                    <div className="title"><span className="try-number">{this.props.task.try}</span>{this.props.task.preset_name}</div>
                    <div className="footer">
                        <span><span>Iterations:</span> {this.props.task.finished_iterations}</span>
                        <span><span>Created:</span> {this.props.task.creation_time.toShortStr()}</span>
                        <span><span>Finished:</span> {this.props.task.saved_time.toShortStr()}</span>
                    </div>
                </div>
                <div className="toolbar">
                    <div className="action" onClick={this.openDialog}>
                        <i className="fa fa-redo"></i>
                    </div>
                </div>
                <Prompt ref={this.promptRefs} header="How many iterations?" text="Specify the number of iterations, you want the task to run:" url={"/start/" + this.props.task.project_name + "/" + this.props.task.preset_uuid}/>
            </li>
        );
    }
}

export default FinishedTask;