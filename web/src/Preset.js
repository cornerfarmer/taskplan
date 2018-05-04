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
            <li className={this.props.preset.abstract ? "item item-abstract" : "item"}>
                <div className="content">
                    <div className="title">{this.props.preset.name}</div>
                    <div className="footer">
                        {this.props.preset.base !== "" ? <span><span>Inherits from:</span> {this.props.preset.base}</span> : <span>Default base preset</span>}
                        {!this.props.preset.abstract && <span><span>Started tries:</span> {this.props.preset.started_tries}</span>}
                    </div>
                </div>
                <div className="toolbar">
                    {!this.props.preset.abstract &&
                        <div className="action" onClick={this.start}>
                            <i className="fa fa-play"></i>
                        </div>
                    }
                </div>
            </li>
        );
    }
}

export default Preset;