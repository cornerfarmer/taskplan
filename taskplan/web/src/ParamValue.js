import React from 'react';
import ReassuringPrompt from "./ReassuringPrompt";

class ParamValue extends React.Component {
    constructor(props) {
        super(props);

        this.reassuringRemovePromptRefs = React.createRef();
    }

    render() {
        return (
            <li className={this.props.paramValue.abstract ? "item item-abstract item-param-value" : "item item-param-value"}>
                <div className="content">
                    <div className="title">{this.props.paramValue.name}</div>
                    <div className="footer">
                        {this.props.paramValue.base !== "" ? <span><span>Inherits from:</span> {this.props.paramValue.base}</span> : <span>-</span>}
                        <span><span>Created:</span> {this.props.paramValue.creation_time.toShortStr()}</span>
                    </div>
                </div>
                <div className="toolbar">
                    <div className="action" onClick={() => this.props.editFunc(this.props.paramValue, true, this.props.param, this.props.param.values)} title="Clone parameter value">
                        <i className="far fa-copy"></i>
                    </div>
                    <div className="action" onClick={() => this.props.editFunc(this.props.paramValue, false, this.props.param, this.props.param.values)} title="Edit parameter value">
                        <i className="fa fa-edit"></i>
                    </div>
                    <div className="dropdown">
                        <div className="action dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-ellipsis-h"></i>
                        </div>
                        <div className="dropdown-menu">
                            {this.props.removable ?
                                <div className="action" onClick={() => this.reassuringRemovePromptRefs.current.openDialog()} title="Remove parameter value">
                                    <i className="far fa-trash-alt"></i>
                                </div>
                                :
                                <div className="action action-disabled" title="Parameter value cannot be removed, as there are tasks using it.">
                                    <i className="far fa-trash-alt"></i>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <ReassuringPrompt ref={this.reassuringRemovePromptRefs} header="Really want to delete?" text="Do you really want to remove this parameter value?" url={"/remove_param_value/" + this.props.paramValue.uuid}/>
            </li>
        );
    }
}

export default ParamValue;