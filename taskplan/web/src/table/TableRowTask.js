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
                    {this.props.selectedCols.map((col, i) => (
                        <td className="table-col" style={i === 0 ? {"border-left": (this.props.intend + "px solid #d9d9d9")} : {}}>
                            {(() => {
                                if (col === "name")
                                    return <TaskName name={this.props.name} is_test={this.props.task.is_test}/>;
                                else if (col === "iterations")
                                    return this.props.task.finished_iterations;
                                else if (col === "saved")
                                    return this.props.task.saved_time.toShortStr();
                                else if (col === "created")
                                    return this.props.task.creation_time.toShortStr();
                                else if (col === "uuid")
                                    return this.props.task.uuid;
                                else
                                    return col in this.props.metrics ? this.props.metrics[col][2].toFixed(2) : "N/A";
                            })()}
                        </td>
                    ))}
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