import React from 'react';
import Prompt from "./Prompt";

class ControlBar extends React.Component {
    constructor(props) {
        super(props);

        this.openGlobalLog = this.openGlobalLog.bind(this);
    }

    openGlobalLog() {
        window.open("/log/", '_blank');
    }

    render() {
        return (
            <div id="controlbar">
                <div className="container">
                    <h1 id="title">
                        TaskPlan
                    </h1>
                    <div className="action" title="Pause all running tasks">
                        <i className="fa fa-pause"></i>
                    </div>
                    <div className="action" onClick={this.openGlobalLog} title="Open the global log">
                        <i className="far fa-file-alt"></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default ControlBar;