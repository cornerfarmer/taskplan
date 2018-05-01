import React from 'react';

class Preset extends React.Component {
    constructor(props) {
        super(props);
        this.start = this.start.bind(this);
    }

    start() {
        fetch("/start/" + this.props.preset.project_name + "/" + this.props.preset.uuid)
            .then(res => res.json())
            .then(
                (result) => {

                },
                (error) => {

                }
            )
    }

    render() {
        return (
            <li className={this.props.preset.abstract ? "preset preset-abstract" : "preset"}>
                <div className="header">
                    <div className="toolbar">
                        {!this.props.preset.abstract &&
                            <div className="action" onClick={this.start}>
                                <i className="fa fa-play"></i>
                            </div>
                        }
                    </div>
                    <div className="title">{this.props.preset.name}</div>
                </div>
                <div className="footer">
                    {this.props.preset.base !== "" ? <span>Inherits from: {this.props.preset.base}</span> : <span>Default base preset</span>}
                </div>
            </li>
        );
    }
}

export default Preset;