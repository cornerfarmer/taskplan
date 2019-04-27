
import React from 'react';
import PausedTask from "./PausedTask";

class TaskView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tree: {}
        };
    }

    render() {
        var project = this;
        var s;
        return (
            {this.state.tasks.filter(task => (!this.state.currentCodeVersionOnly || task.version === this.props.project.version)).sort(function (a, b) {
                switch(project.state.sorting[1]) {
                    case 0:
                        s = a.saved_time - b.saved_time; break;
                    case 1:
                        s = a.preset_name.localeCompare(b.preset_name); break;
                    case 2:
                        s = a.creation_time - b.creation_time; break;
                    case 3:
                        s = a.finished_iterations - b.finished_iterations; break;
                }
                if (s === 0)
                    s = a.try - b.try;
                if (project.state.sortingDescending[1])
                    s *= -1;
                return s;
            }).map(task => (
                <PausedTask
                    rerunTask={this.rerunTask}
                    key={task.uuid}
                    task={task}
                />
            ))}
        );
    }
}


export default TaskView;