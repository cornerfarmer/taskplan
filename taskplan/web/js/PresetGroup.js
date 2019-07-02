import React from 'react';
import Preset from "./Preset";

class PresetGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hideChoices: false
        };

        this.toggleHideChoices = this.toggleHideChoices.bind(this);
    }

    toggleHideChoices() {
        this.setState({
            hideChoices: !this.state.hideChoices
        });
    }

  render() {
        return (
            <li className="item item-preset">
                {this.props.group !== ""  &&
                    <div className="group-header" onClick={() => this.toggleHideChoices()}>
                        <div className="title">{this.props.group}</div>
                    </div>
                }
                {!this.state.hideChoices &&
                    <ul>
                        {this.props.presets.sort((a, b) => {
                            let s;
                            switch(this.props.sorting) {
                                case 0:
                                    s = a.creation_time - b.creation_time; break;
                                case 1:
                                    s = a.name.localeCompare(b.name); break;
                                case 2:
                                    s = a.started_tries - b.started_tries; break;
                            }
                            if (s === 0)
                                s = a.base.localeCompare(b.base);
                            if (this.props.sortingDescending)
                                s *= -1;
                            return s;
                        }).map(preset => (
                            <Preset
                                key={preset.uuid}
                                preset={preset}
                                editPresetFunc={this.props.editPresetFunc}
                                editChoiceFunc={this.props.editChoiceFunc}
                                newChoiceFunc={this.props.newChoiceFunc}
                            />
                        ))}
                </ul>
                }
            </li>
        );
    }
}

export default PresetGroup;