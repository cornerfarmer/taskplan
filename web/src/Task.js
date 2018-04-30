import React from 'react';
import State from "./Global";


function TaskStatus(props) {
    if (props.state === State.RUNNING) {
        function pad(n) {
            n = parseInt(n);
            return (n < 10) ? ("0" + n) : n;
        }

        function renderTime(time) {
            if (time > 0)
                return pad(time / 60) + ":" + pad(time % 60);
            else
                return "--:--";
        }

        return <div className="status">{renderTime(props.run_time)} / {renderTime(props.total_time)}</div>;
    } else {
        return <div className="status">{props.index + 1}</div>
    }
}

function TaskProgress(props) {
    if (props.state === State.RUNNING) {
        var style = {width: (props.total_time > 0 ? props.run_time / props.total_time * 100 : 0) + '%'};
        return <div className="progress" style={style}></div>;
    } else {
        return "";
    }
}

function TaskToolbar(props) {
    return (
        <div className="toolbar">
            <div className="action">
                <i className="fa fa-pause"></i><span>Pause</span>
            </div>
        </div>
    );
}

class Task extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="task">
                <div className="content">
                    <div className="header">
                        <div className="project-name">{this.props.task.project_name}</div>
                        <TaskStatus index={this.props.index} state={this.props.task.state} total_time={this.props.task.total_time} run_time={this.props.task.run_time}/>
                    </div>
                    <TaskProgress state={this.props.task.state} total_time={this.props.task.total_time} run_time={this.props.task.run_time}/>
                    <div className="preset-name">{this.props.task.preset_name}</div>
                </div>
                <TaskToolbar/>
            </li>
        );
    }
}

export default Task;