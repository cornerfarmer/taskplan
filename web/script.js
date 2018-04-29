var State = {
    INIT: 0,
    QUEUED: 1,
    RUNNING: 2,
    STOPPED: 3
};


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
                <i className="fas fa-pause"></i><span>Pause</span>
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

            if (changedTask.state === State.RUNNING) {
                changedTask.start_time = new Date(changedTask.start_time * 1000);

                pm.refreshRunTime(changedTask);
                changedTask.total_time = parseInt(changedTask.mean_iteration_time * changedTask.total_iterations);
            }

            const previousIndex = tasks.findIndex(function (e) {
                return e.uuid === changedTask.uuid
            });
            console.log(changedTask);
            if (previousIndex >= 0) {
                tasks[previousIndex] = changedTask;
            } else {
                tasks.push(changedTask);
            }

            pm.setState({
                tasks: tasks
            });
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

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

