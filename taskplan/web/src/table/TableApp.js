import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "@fortawesome/fontawesome-free/css/all.min.css"

import React from 'react';
import ReconnectingEventSource from "reconnecting-eventsource";
import Repository from "../Repository";
import Table from "./Table";
import Project from "../Project";


class TableApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            noConnection: true,
            devices: [],
            refreshRate: null,
            viewsLoaded: false
        };

        this.evtSource = new ReconnectingEventSource("/update", {});
        this.repository = new Repository(this.evtSource);
        this.projectManagerRef = React.createRef();

        this.refreshConnectionState = this.refreshConnectionState.bind(this);

        this.evtSource.onerror = this.refreshConnectionState;
        this.evtSource.onopen = this.refreshConnectionState;

        this.state.noConnection = (this.evtSource.readyState === 0);

        this.evtSource.addEventListener("PROJECT_CHANGED", (e) => {
            const data = JSON.parse(e.data);
            this.setState({
               // current_code_version: data.current_code_version,
               // tensorboard_port: data.tensorboard_port,
                views: data.views,
                viewsLoaded: true,
                refreshRate: parseInt(data.refreshRate),
                allTags: data.all_tags,
            });
        });
    }

    refreshConnectionState() {        this.setState({
            noConnection: this.evtSource.readyState === 0
        });
    }

    render() {
        return (
            <div id="page">
                <div className="container">
                    <div className="row">
                        {this.state.refreshRate !== null &&
                            <Table
                                repository={this.repository}
                                allTags={this.state.allTags}
                                refreshRate={this.state.refreshRate}
                                views={this.state.views}
                                viewsLoaded={this.state.viewsLoaded}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default TableApp;