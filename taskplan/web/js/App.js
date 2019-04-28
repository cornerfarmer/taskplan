import React from 'react';
import Scheduler from './Scheduler'
import ProjectManager from "./ProjectManager";
import FlashMessageManager from "./FlashMessageManager"
import ControlBar from "./ControlBar";
import ReconnectingEventSource from "reconnecting-eventsource";
import Repository from "./Repository";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.evtSource = new ReconnectingEventSource("/update", {});
        this.repository = new Repository(this.evtSource)
    }

    render() {
        return (
            <div id="page">
                <FlashMessageManager evtSource={this.evtSource}/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <Scheduler evtSource={this.evtSource} repository={this.repository}/>
                        </div>
                        <div className="col-sm-6">
                            <ProjectManager repository={this.repository}/>
                        </div>
                    </div>
                </div>
                <ControlBar evtSource={this.evtSource}/>
            </div>
        );
    }
}

export default App;;