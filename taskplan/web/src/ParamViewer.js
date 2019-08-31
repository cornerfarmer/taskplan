import React from 'react';
import ParamFilter from "./ParamFilter";

class ParamViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.configEditor = React.createRef();
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
                    <ParamFilter paramsByGroup={this.props.paramsByGroup} numberOfTasksPerParamValue={this.props.numberOfTasksPerParamValue} selectedParamValues={this.props.selectedParamValues} onSelectionChange={this.props.onSelectionChange}/>
                </div>
            );
        } else {
            return "";
        }
    }
}

export default ParamViewer;