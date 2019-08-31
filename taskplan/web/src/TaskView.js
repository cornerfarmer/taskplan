import React from 'react';
import PausedTask from "./PausedTask";

class ParamNode extends React.Component {
    render() {
        return (
            <div>
                <div>{this.props.params[0].name}</div>
                <ul>
                    {Object.keys(this.props.tasksPerParamValue).map(paramValueUuid => (
                        <li>
                            <div>{this.props.params[0].values.find(value => value.uuid === paramValueUuid).name}</div>
                            <Node params={this.props.params.slice(1)} tasks={this.props.tasksPerParamValue[paramValueUuid]} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

class TasksNode extends React.Component {
    render() {
        return (
            <div>
                {this.props.tasks.map(task => (
                    <PausedTask
                        rerunTask={this.rerunTask}
                        key={task.uuid}
                        task={task}
                    />
                ))}
            </div>
        );
    }
}

class Node extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let params = this.props.params.slice(0);
        let tasksPerParamValue = {};
        while (params.length > 0) {
            let param = params[0];
            if (param.deprecated_param_value === "")
                continue;

            tasksPerParamValue = {};
            for (const task of this.props.tasks) {
                let value = task.paramValues.find(e => e.param === param.uuid);
                if (value === undefined)
                    value = param.deprecated_param_value.uuid;
                else
                    value = value.uuid;

                if (!tasksPerParamValue.hasOwnProperty(value))
                    tasksPerParamValue[value] = [];
                tasksPerParamValue[value].push(task);
            }
            if (Object.keys(tasksPerParamValue).length > 1)
                break;
            params.shift();
        }

        if (params.length > 0) {
            return <ParamNode tasksPerParamValue={tasksPerParamValue} params={params} />
        } else {
            return <TasksNode tasks={this.props.tasks}/>
        }
    }
}


class TaskView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Node params={this.props.params} tasks={this.props.tasks} />
        );
    }
}


export default TaskView;