import React from 'react';
import ParamFilter from "./ParamFilter";
import ParamSelection from "./ParamSelection";

class ParamViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.paramCollapseSelection = React.createRef();
        this.paramGroupSelection = React.createRef();
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        this.setState({
            open: true
        });
    }

    close() {
        this.setState({
            open: false
        });
    }

    render() {
        if (this.state.open) {
            return (
                <div className="param-viewer slide-editor editor" >
                    <div className="header">Parameter filter<i className="fas fa-times" onClick={this.close}></i></div>
                    <label>
                        <input type="checkbox" checked={this.props.paramFilterEnabled} onChange={() => this.props.toggleParamFilter()} />
                        <span>Enabled</span>
                    </label>
                    <ParamFilter selectMultiple={true} paramsByGroup={this.props.paramsByGroup} selectedParamValues={this.props.selectedParamValues} toggleSelection={this.props.toggleSelection}/>

                    <div className="header">Collapsing</div>
                    <div className="params-to-collapse param-filter">
                       {this.props.collapsedParams.map(param_uuid => this.props.params.find(p => p.uuid === param_uuid)).map(param => (
                           <div className="param-name">{param.name} <i className="fas fa-times" onClick={() => this.props.removeParamCollapse(param)}></i></div>
                        ))}
                    </div>
                    <ParamSelection header="Select param to collapse" ref={this.paramCollapseSelection} paramsByGroup={this.props.paramsByGroup} onSelect={this.props.addParamCollapse}/>
                    <div className="buttons">
                        <div onClick={() => this.paramCollapseSelection.current.openDialog()}>Add</div>
                    </div>

                    <div className="header">Grouping</div>
                    <div className="params-to-group param-filter">
                       {this.props.groupedParams.map(params => (
                           <div className="param-name">
                               {params.map(param_uuid => this.props.params.find(p => p.uuid === param_uuid)).map(param => param.name)}
                               <i className="fas fa-times" onClick={() => this.props.removeParamGroup(params)}></i>
                           </div>
                       ))}
                    </div>
                    <ParamSelection header="Select params to group" selectMultiple={true} ref={this.paramGroupSelection} paramsByGroup={this.props.paramsByGroup} onSelect={this.props.addParamGroup}/>
                    <div className="buttons">
                        <div onClick={() => this.paramGroupSelection.current.openDialog()}>Add</div>
                    </div>
                </div>
            );
        } else {
            return "";
        }
    }
}

export default ParamViewer;