import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

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

        this.state = {
            noConnection: true
        };

        this.evtSource = new ReconnectingEventSource("/update", {});
        this.repository = new Repository(this.evtSource);
        this.projectManagerRef = React.createRef();

        this.refreshConnectionState = this.refreshConnectionState.bind(this);

        this.evtSource.onerror = this.refreshConnectionState;
        this.evtSource.onopen = this.refreshConnectionState;

        this.state.noConnection = (this.evtSource.readyState === 0);
    }

    refreshConnectionState() {        this.setState({
            noConnection: this.evtSource.readyState === 0
        });
    }

    render() {
        return (
            <div id="page">
                <FlashMessageManager evtSource={this.evtSource} noConnection={this.state.noConnection}/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <Scheduler evtSource={this.evtSource} repository={this.repository} highlightTask={(task) => this.projectManagerRef.current.highlightTask(task)}/>
                        </div>
                        <div className="col-sm-4">
                            <ProjectManager ref={this.projectManagerRef} repository={this.repository}/>
                        </div>
                    </div>
                </div>
                <ControlBar evtSource={this.evtSource}/>
            </div>
        );
    }
}

export default App;