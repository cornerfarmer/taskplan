
import React from 'react';
import PausedTask from "./PausedTask";

class PresetNode extends React.Component {
    render() {
        return (
            <div>
                <div>{this.props.presets[0].name}</div>
                <ul>
                    {Object.keys(this.props.tasksPerChoice).map(choiceUuid => (
                        <li>
                            <div>{this.props.presets[0].choices.find(choice => choice.uuid === choiceUuid).name}</div>
                            <Node presets={this.props.presets.slice(1)} tasks={this.props.tasksPerChoice[choiceUuid]} />
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
        let presets = this.props.presets.slice(0);
        let tasksPerChoice = {};
        while (presets.length > 0) {
            let preset = presets[0];
            if (preset.deprecated_choice === "")
                continue;

            tasksPerChoice = {};
            for (const task of this.props.tasks) {
                let choice = task.choices.find(e => e.preset === preset.uuid);
                if (choice === undefined)
                    choice = preset.deprecated_choice.uuid;
                else
                    choice = choice.uuid;

                if (!tasksPerChoice.hasOwnProperty(choice))
                    tasksPerChoice[choice] = [];
                tasksPerChoice[choice].push(task);
            }
            if (Object.keys(tasksPerChoice).length > 1)
                break;
            presets.shift();
        }

        if (presets.length > 0) {
            return <PresetNode tasksPerChoice={tasksPerChoice} presets={presets} />
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
            <Node presets={this.props.presets} tasks={this.props.tasks} />
        );
    }
}


export default TaskView;