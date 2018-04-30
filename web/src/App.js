import React from 'react';
import Scheduler from './Scheduler'
import ProjectManager from "./ProjectManager";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.evtSource = new EventSource("/update");
    }

    render() {
        return (
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
        );
    }
}

export default App;