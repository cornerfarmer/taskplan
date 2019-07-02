import React from 'react';
import Preset from "./Preset";
import State from "./Global";
import FinishedTask from "./FinishedTask";
import PausedTask from "./PausedTask";
import PresetEditor from "./PresetEditor";
import ChoiceEditor from "./ChoiceEditor";
import TaskEditor from "./TaskEditor";
import TaskView from "./TaskView";
import PresetFilter from "./PresetFilter";
import View from "./View";
import PresetBatchEditor from "./PresetBatchEditor";

class PresetTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAbstract: true
        };
        this.toggleShowAbstract = this.toggleShowAbstract.bind(this);
        this.addPreset = this.addPreset.bind(this);
        this.addPresetBatch = this.addPresetBatch.bind(this);
        this.closeEditors = this.closeEditors.bind(this);
        this.presetEditor = React.createRef();
        this.presetBatchEditor = React.createRef();
        this.choiceEditor = React.createRef();
    }

    toggleShowAbstract() {
        this.setState({
          showAbstract: !this.state.showAbstract,
        });
    }

    closeEditors() {
        this.presetEditor.current.close();
        this.presetBatchEditor.current.close();
        this.choiceEditor.current.close();
    }

    addPreset() {
        this.presetEditor.current.new(this.props.project.name);
    }

    addPresetBatch() {
        this.presetBatchEditor.current.open();
    }

    addChoice(preset) {
        this.choiceEditor.current.new(preset);
    }

    render() {
        return (
            <div className="tab" style={{'display': (this.props.active ? 'flex' : 'none')}}>
                <ul className="presets-tab" >
                    {this.props.presets.filter(preset => (!preset.abstract || this.state.showAbstract)).sort((a, b) => {
                        let s;
                        switch(this.props.sorting[0]) {
                            case 0:
                                s = a.creation_time - b.creation_time; break;
                            case 1:
                                s = a.name.localeCompare(b.name); break;
                            case 2:
                                s = a.started_tries - b.started_tries; break;
                        }
                        if (s === 0)
                            s = a.base.localeCompare(b.base);
                        if (this.props.sortingDescending[0])
                            s *= -1;
                        return s;
                    }).map(preset => (
                        <Preset
                            key={preset.uuid}
                            preset={preset}
                            editPresetFunc={this.presetEditor.current.open}
                            editChoiceFunc={this.choiceEditor.current.open}
                            newChoiceFunc={this.choiceEditor.current.new}
                        />
                    ))}
                </ul>
                <PresetEditor ref={this.presetEditor} closeEditors={this.closeEditors} />
                <ChoiceEditor ref={this.choiceEditor} closeEditors={this.closeEditors} />
                <PresetBatchEditor ref={this.presetBatchEditor} closeEditors={this.closeEditors} project_name={this.props.project.name} />
                <div className="tab-toolbar">
                    <label>
                        <input type="checkbox" defaultChecked={this.state.showAbstract} onChange={this.toggleShowAbstract} />
                        <span>Show abstract presets</span>
                    </label>
                    <div className="buttons">
                        <div onClick={this.addPreset}>Add preset</div>
                        <div onClick={this.addPresetBatch}>Add batch</div>
                    </div>
                </div>
            </div>
        );
    }
}


export default PresetTab;
