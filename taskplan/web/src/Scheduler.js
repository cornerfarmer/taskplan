import React from 'react';
import Device from "./Device";
import State from "./Global";

class Scheduler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            max_running: 1
        };

        this.props.evtSource.addEventListener("SCHEDULER_OPTIONS", (e) => {
            const options = JSON.parse(e.data);
            this.setState({
                max_running: options.max_running
            });
        });

        this.openMaxRunningDialogRefs = React.createRef();
        this.updateTasks = this.updateTasks.bind(this);
        this.openMaxRunningDialog = this.openMaxRunningDialog.bind(this);
        this.connectDevice = this.connectDevice.bind(this);
    }

    static refreshRunTime(task) {
        task.run_time = parseInt((Date.now() - task.start_time) / 1000);
    }

    componentDidMount() {
        var pm = this;
        this.timerID = setInterval(
            function() {
                const tasks = pm.state.tasks.slice();
                tasks.filter(task => task.state === State.RUNNING).forEach(task => Scheduler.refreshRunTime(task));
                pm.setState({
                    tasks: tasks
                });
            },
            1000
        );
        this.props.repository.onChange("tasks", this.updateTasks);
        this.updateTasks(this.props.repository.tasks);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
        this.props.repository.removeOnChange("tasks", this.updateTasks);
    }

    updateTasks(tasks) {
        this.setState({
            tasks: Object.values(tasks).filter(task => task.state === State.RUNNING || task.state === State.QUEUED)
        });
    }

    openMaxRunningDialog() {
        this.openMaxRunningDialogRefs.current.openDialog();
    }

    connectDevice(device) {
        fetch("/connect_device/" + device.uuid)
            .then(res => res.json())
            .then(
                (result) => {
                }
            )
    }

    render() {
        return (
            <div id="scheduler">
                 {this.props.devices.map(device => (
                    <Device device={device} tasks={this.state.tasks.filter(task => task.device === device.uuid)} />
                ))}
            </div>
        );
    }
}


export default Scheduler;