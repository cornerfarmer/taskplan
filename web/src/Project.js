import React from 'react';
import Preset from "./Preset";
import State from "./Global";

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            presets: [],
            showAbstract: false,
            activeTab: 0
        };
        this.presetChanged = this.presetChanged.bind(this);
        this.toggleShowAbstract = this.toggleShowAbstract.bind(this);
        this.showTab = this.showTab.bind(this);
    }

    presetChanged(changedPreset) {
        const presets = this.state.presets.slice();

        const previousIndex = presets.findIndex(function (e) {
            return e.uuid === changedPreset.uuid
        });
        console.log(changedPreset);
        if (previousIndex >= 0) {
            presets[previousIndex] = changedPreset;
        } else {
            presets.push(changedPreset);
        }

        this.setState({
            presets: presets
        });
    }

    toggleShowAbstract() {
        this.setState({
          showAbstract: !this.state.showAbstract,
        });
    }

    showTab(tab) {
        this.setState({
          activeTab: tab,
        });
    }

    render() {
        return (
            <div className="project">
                <div className="tabs">
                    <div className={this.state.activeTab === 0 && "tab-active"} onClick={() => this.showTab(0)}>New</div>
                    <div className={this.state.activeTab === 1 && "tab-active"} onClick={() => this.showTab(1)}>Paused</div>
                    <div className={this.state.activeTab === 2 && "tab-active"} onClick={() => this.showTab(2)}>Finished</div>
                </div>
                <ul className="presets" style={{'display': (this.state.activeTab === 0 ? 'block' : 'none')}}>
                    {this.state.presets.filter(preset => (!preset.abstract || this.state.showAbstract)).map(preset => (
                        <Preset
                            key={preset.uuid}
                            preset={preset}
                        />
                    ))}
                </ul>
                <div className="presets-toolbar" style={{'display': (this.state.activeTab === 0 ? 'block' : 'none')}}>
                    <label>
                        <input type="checkbox" defaultChecked={this.state.showAbstract} onChange={this.toggleShowAbstract} />
                        Show abstract presets
                    </label>
                </div>
            </div>
        );
    }
}


export default Project;