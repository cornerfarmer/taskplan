import React from 'react';
import ConfigEditor from "./ConfigEditor";

class ParamSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            selectedParams: []
        };

        this.configEditor = React.createRef();
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.selectParam = this.selectParam.bind(this);
        this.sendSelection = this.sendSelection.bind(this);
    }

    selectParam(param) {
        if (this.props.selectMultiple) {
             let selectedParams = this.state.selectedParams.slice();

             let index = selectedParams.indexOf(param);
             if (index === -1) {
                 selectedParams.push(param);
             } else {
                 selectedParams.splice(index, 1);
             }

             this.setState({selectedParams: selectedParams});
        } else {
            this.props.onSelect(param);
            this.closeDialog();
        }
    }

    openDialog() {
        this.setState({
            dialogOpen: true,
            device: (this.props.devices ? this.props.devices[0].uuid : null),
            selectedParams: []
        });
    }

    closeDialog() {
        this.setState({
            dialogOpen: false
        });
    }

    sendSelection() {
        this.props.onSelect(this.state.selectedParams);
        this.closeDialog();
    }

    render() {
        if (this.state.dialogOpen) {
            return (
                <div className="prompt-wrapper">
                    <div className= {this.props.paramEditor ? 'prompt param-prompt' : 'prompt'}>
                        <div className="prompt-header">{this.props.header}</div>
                            <div className="param-filter">
                                {Object.keys(this.props.paramsByGroup).sort((a, b) => a.localeCompare(b)).map((group) => (
                                    <div key={group} className="param-group">
                                        {group !== "" &&
                                        <div className="group-header" onClick={() => this.toggleHideParamValues()}>
                                            <div className="title">{group}</div>
                                        </div>
                                        }
                                        <div className="params">
                                            <div className="params">
                                                {this.props.paramsByGroup[group].sort((a, b) => a.name.localeCompare(b.name)).filter(param => param.values.length > 0).map(param => (
                                                    <div key={param.uuid} className="param">
                                                        <div className="param-name param-name-collapsed" onClick={() => this.selectParam(param)}>
                                                            {param.name} {this.state.selectedParams.indexOf(param) !== -1 && " Selected"}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {this.props.selectMultiple &&
                                <div className="buttons">
                                    <div onClick={this.sendSelection}>Ok</div>
                                    <div onClick={this.closeDialog}>Cancel</div>
                                </div>
                            }
                        </div>
                    </div>
            );
        } else {
            return "";
        }
    }
}

export default ParamSelection;