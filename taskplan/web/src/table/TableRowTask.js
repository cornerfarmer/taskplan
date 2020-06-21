import React from 'react';
import {TaskName} from "../Task";

class TableRowTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: true
        };

        this.toggleCollapsed = this.toggleCollapsed.bind(this);
    }

    toggleCollapsed() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render() {
        return (
          <tr className="table-row">
              <td className="table-col"><TaskName name={this.props.name} is_test={this.props.task.is_test}/></td>
              <td className="table-col">{this.props.task.finished_iterations}</td>
              {this.props.metric_superset.map(name => (
                  <td className="table-col">{name in this.props.metrics ? this.props.metrics[name][2].toFixed(2) : "N/A"}</td>
              ))}
          </tr>
        );
    }
}

export default TableRowTask;