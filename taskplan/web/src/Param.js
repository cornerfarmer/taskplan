import React from 'react';
import ParamValue from "./ParamValue";
import ReassuringPrompt from "./ReassuringPrompt";

class Param extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hideParamValues: true
        };

        this.toggleHideParamValues = this.toggleHideParamValues.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.reassuringRemovePromptRefs = React.createRef();
        this.paramRef = React.createRef();
        this.dragEnterCounter = 0
    }

    toggleHideParamValues() {
        this.setState({
            hideParamValues: !this.state.hideParamValues
        });
    }

    onDragStart(e) {
        e.dataTransfer.setData("text/plain", this.props.param.uuid);
    }

    onDragOver(e) {
        if (this.props.sortMode && this.props.param.uuid !== e.dataTransfer.getData("text/plain")) {
            e.preventDefault();
        }
    }

    onDrop(e) {
        if (this.props.sortMode && this.props.param.uuid !== e.dataTransfer.getData("text/plain")) {
            e.preventDefault();
            this.props.reorderParam(e.dataTransfer.getData("text/plain"), this.props.param.uuid);

            this.dragEnterCounter = 0;
            this.paramRef.current.className = "item item-param";
        }
    }

    onDragEnter(e) {
        if (this.props.sortMode && this.props.param.uuid !== e.dataTransfer.getData("text/plain")) {
            e.preventDefault();
            this.paramRef.current.className = "item item-param on-drag-over";
            this.dragEnterCounter++;
        }
    }

    onDragLeave(e) {
        if (this.props.sortMode && this.props.param.uuid !== e.dataTransfer.getData("text/plain")) {
            e.preventDefault();
            this.dragEnterCounter--;
            if (this.dragEnterCounter === 0)
                this.paramRef.current.className = "item item-param";
        }
    }


    render() {
        return (
            <li ref={this.paramRef} className="item item-param" onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} onDrop={this.onDrop} onDragStart={this.onDragStart} draggable={this.props.sortMode ? "true" : "false"}>
                <div className="header" onClick={() => this.toggleHideParamValues()}>
                    <div className="title">{this.props.sortMode ? this.props.param.name : this.props.param.name}</div>
                    {!this.props.sortMode ?
                        <div className="toolbar">
                            <div className="action" onClick={(e) => {this.props.newParamValueFunc(this.props.param, this.props.param.values); e.stopPropagation();}} title="New parameter value">
                                <i className="fas fa-plus"></i>
                            </div>
                            <div className="action" onClick={(e) => {this.props.editParamFunc(this.props.param); e.stopPropagation();}} title="Edit parameter">
                                <i className="fa fa-edit"></i>
                            </div>
                            {this.props.param.values.length === 0 ?
                                <div className="action" onClick={() => this.reassuringRemovePromptRefs.current.openDialog()} title="Remove parameter">
                                    <i className="far fa-trash-alt"></i>
                                </div>
                                :
                                <div className="action action-disabled" title="Parameter cannot be removed, as it still has values.">
                                    <i className="far fa-trash-alt"></i>
                                </div>
                            }
                        </div>
                        :
                        <div className="toolbar">
                            <div className="grip-icon">
                                <i className="fas fa-bars"></i>
                            </div>
                        </div>
                    }
                </div>
                {!this.state.hideParamValues && !this.props.sortMode &&
                    <ul>
                        {this.props.param.values.sort((a, b) => {
                            return a.name.localeCompare(b.name);
                        }).map(value => (
                            <ParamValue
                                key={value.uuid}
                                paramValue={value}
                                param={this.props.param}
                                editFunc={this.props.editParamValueFunc}
                                removable={!(value.uuid in this.props.numberOfTasksPerParamValue) || this.props.numberOfTasksPerParamValue[value.uuid].length === 0}
                            />
                        ))}
                    </ul>
                }
                <ReassuringPrompt ref={this.reassuringRemovePromptRefs} header="Really want to delete?" text="Do you really want to remove this parameter?" url={"/remove_param/" + this.props.param.project_name + "/" + this.props.param.uuid}/>
            </li>
        );
    }
}

export default Param;