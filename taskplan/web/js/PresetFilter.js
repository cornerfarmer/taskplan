import React from 'react';
import Option from "./Option";

class PresetFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    calcChoiceClasses(preset, choice) {
        let classes = "choice ";
        if (this.props.selectedChoices[preset.uuid] === choice.uuid)
            classes += "choice-selected ";
        if (preset.default_choice.uuid === choice.uuid)
            classes += "choice-default ";
        return classes;
    }

    render() {
        return (
            <div className="preset-filter">
                {Object.keys(this.props.presetsByGroup).sort((a, b) => a.localeCompare(b)).map((group) => (
                    <div key={group} className="preset-group">
                        {group !== ""  &&
                            <div className="group-header" onClick={() => this.toggleHideChoices()}>
                                <div className="title">{group}</div>
                            </div>
                        }
                        <div className="presets">
                            {this.props.presetsByGroup[group].sort((a, b) => a.name.localeCompare(b.name)).map(preset => (
                            <div key={preset.uuid} className="preset">
                                <div className="preset-name">
                                    {preset.name}
                                </div>
                                <div className="choices-wrapper">
                                    <div className="choices">
                                        {preset.choices.sort((a, b) => {
                                            return a.name.localeCompare(b.name);
                                        }).map(choice => (
                                            <div key={choice.uuid} className={this.calcChoiceClasses(preset, choice)} onClick={() => this.props.onSelectionChange(preset, choice)}>
                                                {choice.name}
                                                {this.props.numberOfTasksPerChoice &&
                                                    <span className="task-numbers">{choice.uuid in this.props.numberOfTasksPerChoice ? this.props.numberOfTasksPerChoice[choice.uuid] : 0}</span>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default PresetFilter;