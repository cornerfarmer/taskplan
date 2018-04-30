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
            <li className="preset">
                <div className="header">
                    <div className="toolbar">
                        <div className="action" onClick={this.start}>
                            <i className="fa fa-play"></i>
                        </div>
                    </div>
                    <div className="title">{this.props.preset.name}</div>
                </div>
                <div className="footer">Inherits from: {this.props.preset.base}</div>
            </li>
        );
    }
}

export default Preset;