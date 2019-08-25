import React from 'react';
import State from './Global'
import Task from './Task'
import Prompt from "./Prompt";

class Device extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            max_running: 1,
            showQueue: false
        };

        this.openMaxRunningDialog = this.openMaxRunningDialog.bind(this);
        this.connect = this.connect.bind(this);
    }

    openMaxRunningDialog() {
        this.openMaxRunningDialogRefs.current.openDialog();
    }

    connect() {
        fetch("/connect_device/" + this.props.device.uuid)
            .then(res => res.json())
            .then(
                (result) => {
                }
            )
    }

    render() {
        return (
            <div className="device">
                <div className="header">
                    <span>{this.props.device.name}</span>
                    {this.props.device.is_connected === 0 &&
                        <div className="action" onClick={this.connect}>
                            Connect
                        </div>
                    }
                    {this.props.device.is_connected === 1 &&
                        <div className="action" onClick={this.disconnect}>
                            Disconnect
                        </div>
                    }
                    <div onClick={() => this.props.hideDevice(this.props.device)}>
                        <i className="fas fa-times"></i>
                    </div>
                </div>

                <div className="body">
                    {this.props.device.is_connected !== 0 &&
                        <ul className="tasks" id="tasks-running">
                            {this.props.tasks.filter(task => task.state === State.RUNNING).length === 0 &&
                            <li className="mock-task">
                                Idle
                            </li>
                            }
                            {this.props.tasks.filter(task => task.state === State.RUNNING).map((task, index) => (
                                <Task
                                    key={task.uuid}
                                    task={task}
                                    index={index}
                                    highlightTask={this.props.highlightTask}
                                />
                            ))
                            }
                        </ul>
                    }

                    <div className="queue-header">
                        <div className="action" onClick={this.toggleQueue}>
                            {this.state.showQueue ?
                                <i className="fas fa-minus"></i>
                                :
                                <i className="fas fa-plus"></i>
                            }
                        </div>
                        Waiting ({this.props.tasks.filter(task => task.state === State.QUEUED).length})
                    </div>
                    {this.state.showQueue &&
                        <ul className="tasks" id="tasks-queued">
                            {this.props.tasks.filter(task => task.state === State.QUEUED).sort(function (a, b) {
                                return a.queue_index - b.queue_index
                            }).map((task, index) => (
                                <Task
                                    key={task.uuid}
                                    task={task}
                                    index={index}
                                    highlightTask={this.props.highlightTask}
                                />
                            ))}
                        </ul>
                    }
                </div>
            </div>
        );
    }
}


export default Device;