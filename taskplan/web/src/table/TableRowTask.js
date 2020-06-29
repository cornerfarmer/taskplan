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

    componentDidMount() {
        if (this.props.task === null) {
            fetch("/task_details/" + this.props.uuid)
                .then(res => res.json())
                .then(
                    (result) => {
                    }
                )
        }
    }

    render() {
        if (this.props.task !== null) {
            return (
                <tr className="table-row">
                    {this.props.selectedCols.map(col => {
                        if (col === "name")
                            return <td className="table-col"><TaskName name={this.props.name} is_test={this.props.task.is_test}/></td>;
                        else if (col === "iterations")
                            return <td className="table-col">{this.props.task.finished_iterations}</td>;
                        else if (col === "saved")
                            return <td className="table-col">{this.props.task.saved_time.toShortStr()}</td>;
                        else if (col === "created")
                            return <td className="table-col">{this.props.task.creation_time.toShortStr()}</td>;
                        else if (col === "uuid")
                            return <td className="table-col">{this.props.task.uuid}</td>;
                        else
                            return <td className="table-col">{col in this.props.metrics ? this.props.metrics[col][2].toFixed(2) : "N/A"}</td>
                    })}
                </tr>
            );
        } else {
            return (
                <tr className="table-row" >
                    <td  colSpan={this.props.selectedCols.length}>Loading...</td>
                </tr>
            )
        }
    }
}

export default TableRowTask;