import React from 'react';
import Prompt from "./Prompt";

class Preset extends React.Component {
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
            <li className={this.props.preset.abstract ? "item item-abstract" : "item"}>
                <div className="content">
                    <div className="title">{this.props.preset.name}</div>
                    <div className="footer">
                        {this.props.preset.base !== "" ? <span><span>Inherits from:</span> {this.props.preset.base}</span> : <span>Default base preset</span>}
                        {!this.props.preset.abstract && <span><span>Started tries:</span> {this.props.preset.started_tries}</span>}
                        <span><span>Created:</span> {this.props.preset.creation_time.toShortStr()}</span>
                    </div>
                </div>
                <div className="toolbar">
                    {!this.props.preset.abstract &&
                        <div className="action" onClick={this.openDialog} title="Start new task from preset">
                            <i className="fa fa-play"></i>
                        </div>
                    }
                    <div className="action" onClick={() => this.props.editFunc(this.props.preset, true)} title="Clone preset">
                        <i className="far fa-copy"></i>
                    </div>
                    <div className="dropdown">
                        <div className="action dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-ellipsis-h"></i>
                        </div>
                        <div className="dropdown-menu">
                            <div className="action" onClick={() => this.props.editFunc(this.props.preset, false)} title="Edit preset">
                                <i className="fa fa-edit"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <Prompt ref={this.promptRefs} header="How many iterations?" text="Specify the number of iterations, you want the task to run:" url={"/start/" + this.props.preset.project_name + "/" + this.props.preset.uuid}/>
            </li>
        );
    }
}

export default Preset;