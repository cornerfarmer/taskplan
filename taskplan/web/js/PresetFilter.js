import React from 'react';
import Option from "./Option";

class PresetFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div className="preset-filter">
                {this.props.presets.filter(preset => Object.keys(preset.choices).length > 1).map(preset => (
                    <div className="preset">
                        <div className="preset-name">
                            {preset.name}
                        </div>
                        <div className="choices-wrapper">
                            <div className="choices">
                                {preset.choices.sort((a, b) => {
                                    return a.name.localeCompare(b.name);
                                }).map(choice => (
                                    <div className={this.props.selectedChoices[preset.uuid] === choice.uuid || this.props.selectedChoices[preset.uuid] === choice ? "choice choice-selected" : "choice"} onClick={() => this.props.onSelectionChange(preset, choice)}>{choice.name}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default PresetFilter;