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

        this.promptAddDeviceRefs = React.createRef();
        this.openMaxRunningDialogRefs = React.createRef();
        this.updateTasks = this.updateTasks.bind(this);
        this.openMaxRunningDialog = this.openMaxRunningDialog.bind(this);
        this.hideDevice = this.hideDevice.bind(this);
        this.shouldShowDevice = this.shouldShowDevice.bind(this);
    }

    componentDidMount() {
        this.props.repository.onChange("tasks", this.updateTasks);
        this.updateTasks(this.props.repository.tasks);
    }

    componentWillUnmount() {
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
        });

        fetch("/connect_device/" + device.uuid)
            .then(res => res.json())
            .then(
                (result) => {
                }
            )

    }

    shouldShowDevice(device) {
        return (device.uuid in this.state.hiddenDevices && !this.state.hiddenDevices[device.uuid]) || (!(device.uuid in this.state.hiddenDevices) && device.is_connected !== 0);
    }

    render() {
        return (
            <div id="scheduler">
                <div className="dropdown">
                    <div className="action" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        Add device
                    </div>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {this.props.devices.filter(device => !this.shouldShowDevice(device)).map(device => (
                            <div className="dropdown-item" onClick={() => this.showDevice(device)}>{device.name}</div>
                        ))}
                        {this.props.devices.filter(device => !this.shouldShowDevice(device)).length > 0 &&
                            <div className="dropdown-divider"></div>
                        }
                        <div className="dropdown-item" onClick={() => this.promptAddDeviceRefs.current.openDialog()}>Add new device</div>
                    </div>
                </div>
                <Prompt ref={this.promptAddDeviceRefs} header="Add new device" text="Specify the ip address and the port of the new device:" url={"/add_device"}/>

                <div className="mock-device"></div>
                 {this.props.devices.filter(this.shouldShowDevice).map(device => (
                    <Device device={device} tasks={this.state.tasks.filter(task => task.device === device.uuid)} hideDevice={this.hideDevice} highlightTask={this.props.highlightTask}/>
                ))}
                <div className="mock-device"></div>
            </div>
        );
    }
}


export default Scheduler;