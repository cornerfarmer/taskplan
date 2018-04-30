import React from 'react';
import Scheduler from './Scheduler'

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
                    </div>
                </div>
            </div>
        );
    }
}

export default App;