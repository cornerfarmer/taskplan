import React from 'react';
import CollapsedTableTasks from "./CollapsedTableTasks";

class GroupedTableTasks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: {}
        };

        this.toggleCollapsed = this.toggleCollapsed.bind(this);
    }

    toggleCollapsed(group) {
        let collapsed = Object.assign({}, this.state.collapsed);

        if (!(group in collapsed))
            collapsed[group] = true;
        else
            collapsed[group] = !collapsed[group];

        this.setState({
            collapsed: collapsed
        })
    }

    render() {
        if (Object.values(this.props.tasks).length > 0) {
            if (this.props.tasks instanceof Array) {
                console.log(this.props.tasks);
                return this.props.tasks.map((tasks, i) => (
                        <CollapsedTableTasks
                            tasks={tasks}
                            metric_superset={this.props.metric_superset}
                        />
                    ));
            } else {
                return Object.keys(this.props.tasks).sort((a, b) => a.localeCompare(b)).map((group) => (
                    <tr key={group} className="param-group">
                        <div className="group-header" onClick={() => this.toggleCollapsed(group)}>
                            <div className="title">
                                {(!(group in this.state.collapsed) || !this.state.collapsed[group])
                                    ?
                                    <i className="fas fa-caret-down"></i>
                                    :
                                    <i className="fas fa-caret-right"></i>
                                }
                                {group}
                            </div>
                        </div>
                        {(!(group in this.state.collapsed) || !this.state.collapsed[group]) &&
                            <GroupedTableTasks
                                tasks={this.props.tasks[group]}
                                metric_superset={this.props.metric_superset}
                            />
                        }
                    </tr>
                ));
            }
        } else {
            return "";
        }
    }
}

export default GroupedTableTasks;