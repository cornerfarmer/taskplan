import React from 'react';
import CollapsedTableTasks from "./CollapsedTableTasks";
import TableRowTask from "./TableRowTask";

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
                            selectedCols={this.props.selectedCols}
                            intend={this.props.intend}
                        />
                    ));
            } else {
                return Object.keys(this.props.tasks).sort((a, b) => a.localeCompare(b)).map((group) => (
                    <React.Fragment>
                        <tr className="group-header table-row" onClick={() => this.toggleCollapsed(group)}>
                            <td className="title" colSpan={this.props.selectedCols.length}>
                                {(!(group in this.state.collapsed) || !this.state.collapsed[group])
                                    ?
                                    <i className="fas fa-caret-down"></i>
                                    :
                                    <i className="fas fa-caret-right"></i>
                                }
                                {group}
                            </td>
                        </tr>
                        {(!(group in this.state.collapsed) || !this.state.collapsed[group]) &&
                            <GroupedTableTasks
                                tasks={this.props.tasks[group]}
                                selectedCols={this.props.selectedCols}
                                intend={this.props.intend + 5}
                            />
                        }
                    </React.Fragment>
                ));
            }
        } else {
            return "";
        }
    }
}

export default GroupedTableTasks;