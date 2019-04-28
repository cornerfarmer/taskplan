import React from 'react';
import State from './Global'
import Task from './Task'
import Prompt from "./Prompt";

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

    render() {
        return (
            <div id="scheduler">
                <h2>Running ({this.state.tasks.filter(task => task.state === State.RUNNING).length} / <span id="max-running-tasks" title="Adjust the maximum number of parallel running tasks" onClick={this.openMaxRunningDialog}>{this.state.max_running}</span>)</h2>
                <Prompt ref={this.openMaxRunningDialogRefs} defaultValue={this.state.max_running} header="Set maximum parallel tasks?" text="Specify the new number of tasks which can run in parallel:" url={"/change_max_running"}/>
                <ul className="tasks" id="tasks-running">
                    {this.state.tasks.filter(task => task.state === State.RUNNING).map((task, index) => (
                        <Task
                            key={task.uuid}
                            task={task}
                            index={index}
                        />
                    ))}
                </ul>
                <h2>Waiting ({this.state.tasks.filter(task => task.state === State.QUEUED).length})</h2>
                <ul className="tasks" id="tasks-queued">
                    {this.state.tasks.filter(task => task.state === State.QUEUED).sort(function(a,b) { return a.queue_index - b.queue_index }).map((task, index) => (
                        <Task
                            key={task.uuid}
                            task={task}
                            index={index}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}


export default Scheduler;