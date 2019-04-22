import React from 'react';

class Choice extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className={this.props.choice.abstract ? "item item-abstract" : "item"}>
                <div className="content">
                    <div className="title">{this.props.choice.name}</div>
                    <div className="footer">
                        {this.props.choice.base !== "" ? <span><span>Inherits from:</span> {this.props.choice.base}</span> : <span>-</span>}
                        <span><span>Created:</span> {this.props.choice.creation_time.toShortStr()}</span>
                    </div>
                </div>
                <div className="toolbar">
                    <div className="action" onClick={() => this.props.editFunc(this.props.choice, true, this.props.preset, this.props.choices)} title="Clone choice">
                        <i className="far fa-copy"></i>
                    </div>
                    <div className="action" onClick={() => this.props.editFunc(this.props.choice, false, this.props.preset, this.props.choices)} title="Edit choice">
                        <i className="fa fa-edit"></i>
                    </div>
                    <div className="dropdown">
                        <div className="action dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-ellipsis-h"></i>
                        </div>
                        <div className="dropdown-menu">
                            <div className="action" onClick={() => this.props.editFunc(this.props.choice, false, this.props.preset, this.props.choices)} title="Edit choice">
                                <i className="fa fa-edit"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

export default Choice;