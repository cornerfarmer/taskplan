import React from 'react';
import ConfigEditor from "./ConfigEditor";
import {TaskName} from "./Task";
import PresetFilter from "./PresetFilter";

class PresetViewer extends React.Component {
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
                <div className="preset-viewer slide-editor editor" >
                    <div className="header">Preset filter<i className="fas fa-times" onClick={this.close}></i></div>
                    <label>
                        <input type="checkbox" checked={this.props.presetFilterEnabled} onChange={() => this.props.togglePresetFilter()} />
                        <span>Enabled</span>
                    </label>
                    <PresetFilter presetsByGroup={this.props.presetsByGroup} numberOfTasksPerChoice={this.props.numberOfTasksPerChoice} selectedChoices={this.props.selectedChoices} onSelectionChange={this.props.onSelectionChange}/>
                </div>
            );
        } else {
            return "";
        }
    }
}

export default PresetViewer;