import React from 'react';
import State from "./Global";
import Prompt from "./Prompt";


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

        return <div className="time">{renderTime(props.run_time)} / {renderTime(props.total_time)}</div>;
    } else {
        return <div className="time">{props.index + 1}</div>
    }
}

function TaskProgress(props) {
    if (props.state === State.RUNNING && props.total_subtasks > 1) {
        var style = {width: Math.min(1, props.finished_subtasks / props.total_subtasks) * 100 + '%'};
        return <div className="progress" style={style}></div>;
    } else {
        return "";
    }
}

function SubTaskProgress(props) {
    if (props.state === State.RUNNING) {
        var style = {width: (props.mean_iteration_time > 0 ? Math.min(1, ((props.run_time + props.start_time - props.iteration_update_time) / props.mean_iteration_time + props.finished_iterations) / props.total_iterations) * 100 : 0) + '%'};
        return <div className="progress" style={style}></div>;
    } else {
        return "";
    }
}

class TaskToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.pause = this.pause.bind(this);
        this.cancel = this.cancel.bind(this);
        this.runNow = this.runNow.bind(this);
        this.openExtraDialog = this.openExtraDialog.bind(this);
        this.openPresetDialog = this.openPresetDialog.bind(this);
        this.promptExtraRefs = React.createRef();
        this.promptPresetRefs = React.createRef();
        this.openLog = this.openLog.bind(this);
    }

    pause() {
        fetch("/pause/" + this.props.task.uuid)
            .then(res => res.json())
            .then(
                (result) => {

                },
                (error) => {

                }
            )
    }

    cancel() {
        fetch("/cancel/" + this.props.task.uuid)
            .then(res => res.json())
            .then(
                (result) => {

                },
                (error) => {

                }
            )
    }

    runNow() {
        fetch("/run_now/" + this.props.task.uuid)
            .then(res => res.json())
            .then(
                (result) => {

                },
                (error) => {

                }
            )
    }

    openExtraDialog() {
        this.promptExtraRefs.current.openDialog();
    }

    openPresetDialog() {
        this.promptPresetRefs.current.openDialog();
    }

    openLog() {
        window.open("/log/" + this.props.task.uuid, '_blank');
    }

    render() {
        return (
            <div className="toolbar">
                {this.props.task.state === State.RUNNING &&
                    <span>
                        <div className="action" onClick={this.pause}>
                            <i className="fa fa-pause"></i><span>Pause</span>
                        </div>
                        < div className="action" onClick={this.openExtraDialog}>
                            <i className="fa fa-edit"></i><span>Change</span>
                        </div>
                        <div className="action" onClick={this.openLog}>
                            <i className="far fa-file-alt"></i><span>Log</span>
                        </div>
                        < div className="action" onClick={this.openPresetDialog}>
                            <i className="fas fa-code"></i><span>Config</span>
                        </div>
                    </span>
                }
                {this.props.task.state === State.QUEUED &&
                    <span>
                        <div className="action" onClick={this.runNow}>
                            <i className="fas fa-exclamation-triangle"></i><span>Run now!</span>
                        </div>
                        < div className="action" onClick={this.openExtraDialog}>
                            <i className="fa fa-edit"></i><span>Change</span>
                        </div>
                        <div className="action" onClick={this.cancel}>
                            <i className="fas fa-times"></i><span>Cancel</span>
                        </div>
                        < div className="action" onClick={this.openPresetDialog}>
                            <i className="fas fa-code"></i><span>Config</span>
                        </div>
                    </span>
                }
                <Prompt ref={this.promptExtraRefs} defaultValue={this.props.task.total_iterations} header="Change total iterations?" text="Specify the new number of iterations, you want the task to run:" url={"/change/" + this.props.task.uuid}/>
                <Prompt ref={this.promptPresetRefs} presetEditor={true} presetEditorUrl={"/config/task_timestep/" + this.props.task.uuid} header="Change config?" text="Specify the new configuration which will be used on the fly:" url={"/adjust_task_preset/" + this.props.task.uuid}/>
            </div>
        );
    }
}

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.projectName = React.createRef();
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.taskRef = React.createRef();
        this.dragEnterCounter = 0
    }

    onMouseDown(e) {
        this.target = e.target;
    }

    onDragStart(e) {
        if (this.projectName.current.contains(this.target)) {
            e.dataTransfer.setData("text/plain", this.props.task.uuid);
        } else {
            e.preventDefault();
        }
    }

    onDragOver(e) {
        if (this.props.task.state === State.QUEUED && this.props.task.uuid !== e.dataTransfer.getData("text/plain")) {
            e.preventDefault();
        }
    }

    onDrop(e) {
        if (this.props.task.state === State.QUEUED && this.props.task.uuid !== e.dataTransfer.getData("text/plain")) {
            e.preventDefault();
            fetch("/reorder/" + e.dataTransfer.getData("text/plain") + "/" + this.props.index)
            .then(res => res.json())
            .then(
                (result) => {

                },
                (error) => {

                }
            );

            this.dragEnterCounter = 0;
            this.taskRef.current.className = "task";
        }
    }

    onDragEnter(e) {
        if (this.props.task.state === State.QUEUED && this.props.task.uuid !== e.dataTransfer.getData("text/plain")) {
            e.preventDefault();
            this.taskRef.current.className = "task on-drag-over";
            this.dragEnterCounter++;
        }
    }

    onDragLeave(e) {
        if (this.props.task.state === State.QUEUED && this.props.task.uuid !== e.dataTransfer.getData("text/plain")) {
            e.preventDefault();
            this.dragEnterCounter--;
            if (this.dragEnterCounter === 0)
                this.taskRef.current.className = "task";
        }
    }

    render() {
        return (
            <li ref={this.taskRef} className="task" onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} onDrop={this.onDrop} onDragStart={this.onDragStart} onMouseDown={this.onMouseDown} draggable={this.props.task.state === State.QUEUED ? "true" : "false"} >
                <div className="content">
                    <div className="header">
                        <div className="project-name" ref={this.projectName}>{this.props.task.project_name}</div>
                        <div className="status">
                            <TaskStatus index={this.props.index} state={this.props.task.state} total_time={this.props.task.total_time} run_time={this.props.task.run_time}/>
                            <div className="iterations">{this.props.task.finished_iterations} / {this.props.task.total_iterations}</div>
                        </div>
                    </div>
                    <TaskProgress state={this.props.task.state} total_subtasks={this.props.task.total_subtasks} finished_subtasks={this.props.task.finished_subtasks} />
                    <SubTaskProgress state={this.props.task.state} total_iterations={this.props.task.total_iterations} run_time={this.props.task.run_time} start_time={this.props.task.start_time_timestamp} mean_iteration_time={this.props.task.mean_iteration_time} finished_iterations={this.props.task.finished_iterations} iteration_update_time={this.props.task.iteration_update_time}/>
                    <div className="preset-name"><span className="try-number">{this.props.task.try}</span>{this.props.task.preset_name}</div>
                </div>
                <TaskToolbar task={this.props.task}/>
            </li>
        );
    }
}

export default Task;