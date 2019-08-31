import React from 'react';
import Param from "./Param";

class ParamGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hideParamValue: false
        };

        this.toggleHideParamValues = this.toggleHideParamValues.bind(this);
    }

    toggleHideParamValues() {
        this.setState({
            hideParamValue: !this.state.hideParamValue
        });
    }

  render() {
        return (
            <li className="item item-param">
                {this.props.group !== ""  &&
                    <div className="group-header" onClick={() => this.toggleHideParamValues()}>
                        <div className="title">{this.props.group}</div>
                    </div>
                }
                {!this.state.hideParamValue &&
                    <ul>
                        {this.props.params.sort((a, b) => a.name.localeCompare(b.name)).map(param => (
                            <Param
                                key={param.uuid}
                                param={param}
                                editParamFunc={this.props.editParamFunc}
                                editParamValueFunc={this.props.editParamValueFunc}
                                newParamValueFunc={this.props.newParamValueFunc}
                                numberOfTasksPerParamValue={this.props.numberOfTasksPerParamValue}
                            />
                        ))}
                </ul>
                }
            </li>
        );
    }
}

export default ParamGroup;