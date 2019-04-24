import React from 'react';
import Choice from "./Choice";

class Preset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hideChoices: true
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
                <div className="header">
                    <div className="title" onClick={() => this.toggleHideChoices()}>{this.props.preset.name}</div>
                    <div className="toolbar">
                        <div className="action" onClick={() => this.props.newChoiceFunc(this.props.preset, this.props.choices)} title="New choice">
                            <i className="fas fa-plus"></i>
                        </div>
                        <div className="action" onClick={() => this.props.editPresetFunc(this.props.preset)} title="Edit preset">
                            <i className="fa fa-edit"></i>
                        </div>
                    </div>
                </div>
                {!this.state.hideChoices &&
                    <ul>
                        {this.props.choices.sort((a, b) => {
                            return a.name.localeCompare(b.name);
                        }).map(choice => (
                            <Choice
                                key={choice.uuid}
                                choice={choice}
                                preset={this.props.preset}
                                choices={this.props.choices}
                                editFunc={this.props.editChoiceFunc}
                            />
                        ))}
                    </ul>
                }
            </li>
        );
    }
}

export default Preset;