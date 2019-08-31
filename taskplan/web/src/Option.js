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
                <label>{this.props.param.name}:</label>
                <select value={this.props.selection} onChange={(e) => this.props.onSelectionChangeFunc(this.props.param, e)}>
                    {this.props.param.values.map(value => (
                        <option value={value.uuid}>{value.name}</option>
                    ))}
                </select>
            </div>
        );
    }
}

export default Option;