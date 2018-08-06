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

        var pm = this;
        this.props.evtSource.addEventListener("TASK_CHANGED", function (e) {
            const tasks = pm.state.tasks.slice();
            const changedTask = JSON.parse(e.data);

            const previousIndex = tasks.findIndex(function (e) {
                return e.uuid === changedTask.uuid
            });
            console.log(changedTask);

            if (changedTask.state === State.RUNNING || changedTask.state === State.QUEUED) {
                if (changedTask.state === State.RUNNING) {
                    if (previousIndex >= 0) {
                        if (changedTask.finished_iterations !== tasks[previousIndex].finished_iterations) {
                            changedTask.mean_iteration_time = (changedTask.iteration_update_time - (tasks[previousIndex].iteration_update_time === 0 ? changedTask.start_time : tasks[previousIndex].iteration_update_time)) / (changedTask.finished_iterations - tasks[previousIndex].finished_iterations);
                            changedTask.total_time = parseInt(changedTask.iteration_update_time - changedTask.start_time + changedTask.mean_iteration_time * (changedTask.total_iterations - changedTask.finished_iterations));
                        } else {
                            changedTask.mean_iteration_time = tasks[previousIndex].mean_iteration_time;
                            changedTask.total_time = tasks[previousIndex].total_time;
                        }
                    }
                    changedTask.start_time_timestamp = changedTask.start_time;
                    changedTask.start_time = new Date(changedTask.start_time * 1000);
                    pm.refreshRunTime(changedTask);
                }

                if (previousIndex >= 0) {
                    tasks[previousIndex] = changedTask;
                } else {
                    tasks.push(changedTask);
                }

                pm.setState({
                    tasks: tasks
                });
            } else if (previousIndex !== -1) {
                tasks.splice(previousIndex, 1);
                pm.setState({
                    tasks: tasks
                });
            }
        });

        this.props.evtSource.addEventListener("TASK_REMOVED", function (e) {
            const tasks = pm.state.tasks.slice();
            const changedTask = JSON.parse(e.data);

            const index = tasks.findIndex(function (e) {
                return e.uuid === changedTask.uuid;
            });

            if (index > 0)
                tasks.splice(index, 1);

            pm.setState({
                tasks: tasks
            });
        });

        this.props.evtSource.addEventListener("SCHEDULER_OPTIONS", function (e) {
            const options = JSON.parse(e.data);
            pm.setState({
                max_running: options.max_running
            });
        });

        this.openMaxRunningDialogRefs = React.createRef();
        this.openMaxRunningDialog = this.openMaxRunningDialog.bind(this);
    }

    refreshRunTime(task) {
        task.run_time = parseInt((Date.now() - task.start_time) / 1000);
    }

    componentDidMount() {
        var pm = this;
        this.timerID = setInterval(
            function() {
                const tasks = pm.state.tasks.slice();
                tasks.filter(task => task.state === State.RUNNING).forEach(task => pm.refreshRunTime(task));
                pm.setState({
                    tasks: tasks
                });
            },
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
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