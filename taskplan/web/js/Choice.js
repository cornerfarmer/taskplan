import React from 'react';

class Choice extends React.Component {
    constructor(props) {
        super(props);

        this.remove = this.remove.bind(this);
    }

    remove() {
        fetch("/remove_choice/" + this.props.choice.project_name + "/" + this.props.choice.uuid)
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
            <li className={this.props.choice.abstract ? "item item-abstract item-choice" : "item item-choice"}>
                <div className="content">
                    <div className="title">{this.props.choice.name}</div>
                    <div className="footer">
                        {this.props.choice.base !== "" ? <span><span>Inherits from:</span> {this.props.choice.base}</span> : <span>-</span>}
                        <span><span>Created:</span> {this.props.choice.creation_time.toShortStr()}</span>
                    </div>
                </div>
                <div className="toolbar">
                    <div className="action" onClick={() => this.props.editFunc(this.props.choice, true, this.props.preset, this.props.preset.choices)} title="Clone choice">
                        <i className="far fa-copy"></i>
                    </div>
                    <div className="action" onClick={() => this.props.editFunc(this.props.choice, false, this.props.preset, this.props.preset.choices)} title="Edit choice">
                        <i className="fa fa-edit"></i>
                    </div>
                    <div className="dropdown">
                        <div className="action dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-ellipsis-h"></i>
                        </div>
                        <div className="dropdown-menu">
                            {this.props.removable ?
                                <div className="action" onClick={this.remove} title="Remove choice">
                                    <i className="far fa-trash-alt"></i>
                                </div>
                                :
                                <div className="action action-disabled" title="Choice cannot be removed, as there are tasks using it.">
                                    <i className="far fa-trash-alt"></i>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

export default Choice;