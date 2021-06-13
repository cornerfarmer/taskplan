import React from 'react';
import JsonEditor from './JsonEditor';

class MetricsViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            metrics: []
        };

        this.reload = this.reload.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.task.uuid !== this.props.task.uuid) {
            this.reload();
        }
    }


    componentDidMount() {
        this.reload();
    }

    reload() {
        this.setState({
            loading: true
        });


        fetch("/fetch_metrics/" + this.props.task.uuid)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    metrics: result,
                    loading: false
                });
            },
            (error) => {

            }
        )
    }


    render() {
        if (!this.state.loading)
            return (
                <React.Fragment>
                    <div className="params">Reload: <span className="fas fa-sync-alt" onClick={this.reload} style={{"cursor": "pointer"}}></span></div>
                    <div className="params">
                        {Object.keys(this.state.metrics).map(key => (
                            <div title={"iteration: " + this.state.metrics[key][0] + "\nsaved: " + (new Date(this.state.metrics[key][1] * 1000)).toShortStr()}><span>{key}:</span>{typeof this.state.metrics[key][2] === "number" ? this.state.metrics[key][2].toFixed(3) : this.state.metrics[key][2]}</div>
                        ))}
                    </div>
                </React.Fragment>
            );
        else
            return (
                <div className="params">Loading...</div>
            )
    }
}

export default MetricsViewer;