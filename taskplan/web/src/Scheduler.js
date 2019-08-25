import React from 'react';
import Device from "./Device";
import State from "./Global";
import Prompt from "./Prompt";

class Scheduler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            max_running: 1,
            hiddenDevices: {}
        };

        this.props.evtSource.addEventListener("SCHEDULER_OPTIONS", (e) => {
            const options = JSON.parse(e.data);
            this.setState({
                max_running: options.max_running
            });
        });

        this.promptAddDeviceRefs = React.createRef();
        this.openMaxRunningDialogRefs = React.createRef();
        this.updateTasks = this.updateTasks.bind(this);
        this.openMaxRunningDialog = this.openMaxRunningDialog.bind(this);
        this.hideDevice = this.hideDevice.bind(this);
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

    hideDevice(device) {
        const hiddenDevices = Object.assign({}, this.state.hiddenDevices);

        hiddenDevices[device.uuid] = true;

        this.setState({
            hiddenDevices: hiddenDevices
        })
    }

    showDevice(device) {
        const hiddenDevices = Object.assign({}, this.state.hiddenDevices);

        hiddenDevices[device.uuid] = false;

        this.setState({
            hiddenDevices: hiddenDevices
        })
    }

    render() {
        return (
            <div id="scheduler">
                <div className="dropdown">
                    <div className="action" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        Add device
                    </div>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {this.props.devices.filter(device => (device.uuid in this.state.hiddenDevices) && this.state.hiddenDevices[device.uuid]).map(device => (
                            <div className="dropdown-item" onClick={() => this.showDevice(device)}>{device.name}</div>
                        ))}
                        {this.props.devices.filter(device => (device.uuid in this.state.hiddenDevices) && this.state.hiddenDevices[device.uuid]).length > 0 &&
                            <div className="dropdown-divider"></div>
                        }
                        <div className="dropdown-item" onClick={() => this.promptAddDeviceRefs.current.openDialog()}>Add new device</div>
                    </div>
                </div>
                <Prompt ref={this.promptAddDeviceRefs} header="Add new device" text="Specify the ip address and the port of the new device:" url={"/add_device"}/>

                <div className="mock-device"></div>
                 {this.props.devices.filter(device => !(device.uuid in this.state.hiddenDevices) || !this.state.hiddenDevices[device.uuid]).map(device => (
                    <Device device={device} tasks={this.state.tasks.filter(task => task.device === device.uuid)} hideDevice={this.hideDevice}/>
                ))}
                <div className="mock-device"></div>
            </div>
        );
    }
}


export default Scheduler;