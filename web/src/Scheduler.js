import React from 'react';
import State from './Global'
import Task from './Task'

class Scheduler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };

        var pm = this;
        this.props.evtSource.addEventListener("TASK_CHANGED", function (e) {
            const tasks = pm.state.tasks.slice();
            const changedTask = JSON.parse(e.data);

            const previousIndex = tasks.findIndex(function (e) {
                return e.uuid === changedTask.uuid
            });

            if (changedTask.state === State.RUNNING || changedTask.state === State.QUEUED) {
                if (changedTask.state === State.RUNNING) {
                    changedTask.start_time = new Date(changedTask.start_time * 1000);
                    pm.refreshRunTime(changedTask);
                    changedTask.total_time = parseInt(changedTask.mean_iteration_time * changedTask.total_iterations);
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

    render() {
        return (
            <div id="scheduler">
                <h1>TaskPlan</h1>
                <h2>Running ({this.state.tasks.filter(task => task.state === State.RUNNING).length} / 0)</h2>
                <ul className="tasks">
                    {this.state.tasks.filter(task => task.state === State.RUNNING).map((task, index) => (
                        <Task
                            key={task.uuid}
                            task={task}
                            index={index}
                        />
                    ))}
                </ul>
                <h2>Waiting ({this.state.tasks.filter(task => task.state === State.QUEUED).length})</h2>
                <ul className="tasks">
                    {this.state.tasks.filter(task => task.state === State.QUEUED).map((task, index) => (
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