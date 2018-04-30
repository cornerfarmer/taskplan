import React from 'react';
import Preset from "./Preset";

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            presets: []
        };
        this.presetChanged = this.presetChanged.bind(this);
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

    render() {
        return (
            <div className="project">
                <div className="tabs">
                    <div>New</div>
                    <div>Paused</div>
                    <div>Finished</div>
                </div>
                <ul className="presets">
                    {this.state.presets.map(preset => (
                        <Preset
                            key={preset.uuid}
                            preset={preset}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}


export default Project;