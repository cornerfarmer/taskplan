import React from 'react';
import Param from "./Param";
import ParamEditor from "./ParamEditor";
import ParamValueEditor from "./ParamValueEditor";
import ParamBatchEditor from "./ParamBatchEditor";
import ParamGroup from "./ParamGroup";

class ParamTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAbstract: true
        };
        this.toggleShowAbstract = this.toggleShowAbstract.bind(this);
        this.addParam = this.addParam.bind(this);
        this.addParamBatch = this.addParamBatch.bind(this);
        this.closeEditors = this.closeEditors.bind(this);
        this.paramEditor = React.createRef();
        this.paramBatchEditor = React.createRef();
        this.paramValueEditor = React.createRef();
    }

    toggleShowAbstract() {
        this.setState({
          showAbstract: !this.state.showAbstract,
        });
    }

    closeEditors() {
        this.paramEditor.current.close();
        this.paramBatchEditor.current.close();
        this.paramValueEditor.current.close();
    }

    addParam() {
        this.paramEditor.current.new();
    }

    addParamBatch() {
        this.paramBatchEditor.current.open();
    }

    addParamValue(param) {
        this.paramValueEditor.current.new(param);
    }

    render() {
        return (
            <div className="tab" style={{'display': (this.props.active ? 'flex' : 'none')}}>
                <ul className="params-tab" >
                    {this.props.paramSortingMode ?
                        this.props.params.sort((a, b) => a.sorting - b.sorting).map((param) => (
                            <Param
                                key={param.uuid}
                                param={param}
                                sortMode={true}
                                numberOfTasksPerParamValue={this.props.numberOfTasksPerParamValue}
                            />
                        ))
                        :
                        Object.keys(this.props.paramsByGroup).sort((a, b) => a.localeCompare(b)).map((group) => (
                            <ParamGroup
                                key={group}
                                params={this.props.paramsByGroup[group]}
                                group={group}
                                sorting={this.props.sorting[0]}
                                sortingDescending={this.props.sortingDescending[0]}
                                editParamFunc={this.paramEditor.current.open}
                                editParamValueFunc={this.paramValueEditor.current.open}
                                newParamValueFunc={this.paramValueEditor.current.new}
                                numberOfTasksPerParamValue={this.props.numberOfTasksPerParamValue}
                            />
                        ))
                    }
                </ul>
                <ParamEditor ref={this.paramEditor} closeEditors={this.closeEditors} />
                <ParamValueEditor ref={this.paramValueEditor} closeEditors={this.closeEditors} />
                <ParamBatchEditor ref={this.paramBatchEditor} closeEditors={this.closeEditors} />
                <div className="tab-toolbar">
                    <label>
                        <input type="checkbox" defaultChecked={this.state.showAbstract} onChange={this.toggleShowAbstract} />
                        <span>Show abstract parameter values</span>
                    </label>
                    <div className="buttons">
                        <div onClick={this.addParam}>Add parameter</div>
                        <div onClick={this.addParamBatch}>Add batch</div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ParamTab;
