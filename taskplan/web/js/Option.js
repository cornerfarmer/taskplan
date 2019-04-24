import React from 'react';

class Option extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="field">
                <label>{this.props.preset.name}:</label>
                <select value={this.props.selection} onChange={(e) => this.props.onSelectionChangeFunc(this.props.preset, e)}>
                    {this.props.preset.choices.map(choice => (
                        <option value={choice.uuid}>{choice.name}</option>
                    ))}
                </select>
            </div>
        );
    }
}

export default Option;