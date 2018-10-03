import React from 'react';
import Scheduler from './Scheduler'
import ProjectManager from "./ProjectManager";
import FlashMessageManager from "./FlashMessageManager"
import ControlBar from "./ControlBar";
import ReconnectingEventSource from "reconnecting-eventsource";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.evtSource = new ReconnectingEventSource("/update");
    }

    render() {
        return (
            <div id="page">
                <FlashMessageManager evtSource={this.evtSource}/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <Scheduler evtSource={this.evtSource}/>
                        </div>
                        <div className="col-sm-6">
                            <ProjectManager evtSource={this.evtSource}/>
                        </div>
                    </div>
                </div>
                <ControlBar evtSource={this.evtSource}/>
            </div>
        );
    }
}

export default App;