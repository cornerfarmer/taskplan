import React from 'react';
import Choice from "./Choice";
import State from "./Global";
import PresetGroup from "./PresetGroup";
import ReassuringPrompt from "./ReassuringPrompt";

class Preset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hideChoices: true
        };

        this.toggleHideChoices = this.toggleHideChoices.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.reassuringRemovePromptRefs = React.createRef();
        this.presetRef = React.createRef();
        this.dragEnterCounter = 0
    }

    toggleHideChoices() {
        this.setState({
            hideChoices: !this.state.hideChoices
        });
    }

    onDragStart(e) {
        e.dataTransfer.setData("text/plain", this.props.preset.uuid);
    }

    onDragOver(e) {
        if (this.props.sortMode && this.props.preset.uuid !== e.dataTransfer.getData("text/plain")) {
            e.preventDefault();
        }
    }

    onDrop(e) {
        if (this.props.sortMode && this.props.preset.uuid !== e.dataTransfer.getData("text/plain")) {
            e.preventDefault();
            fetch("/reorder_preset/" + this.props.project_name + "/" + e.dataTransfer.getData("text/plain") + "/" + this.props.preset.sorting)
            .then(res => res.json())
            .then(
                (result) => {

                },
                (error) => {

                }
            );

            this.dragEnterCounter = 0;
            this.presetRef.current.className = "item item-preset";
        }
    }

    onDragEnter(e) {
        if (this.props.sortMode && this.props.preset.uuid !== e.dataTransfer.getData("text/plain")) {
            e.preventDefault();
            this.presetRef.current.className = "item item-preset on-drag-over";
            this.dragEnterCounter++;
        }
    }

    onDragLeave(e) {
        if (this.props.sortMode && this.props.preset.uuid !== e.dataTransfer.getData("text/plain")) {
            e.preventDefault();
            this.dragEnterCounter--;
            if (this.dragEnterCounter === 0)
                this.presetRef.current.className = "item item-preset";
        }
    }


    render() {
        return (
            <li ref={this.presetRef} className="item item-preset" onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} onDrop={this.onDrop} onDragStart={this.onDragStart} draggable={this.props.sortMode ? "true" : "false"}>
                <div className="header" onClick={() => this.toggleHideChoices()}>
                    <div className="title">{this.props.preset.name}</div>
                    {!this.props.sortMode ?
                        <div className="toolbar">
                            <div className="action" onClick={(e) => {this.props.newChoiceFunc(this.props.preset, this.props.preset.choices); e.stopPropagation();}} title="New choice">
                                <i className="fas fa-plus"></i>
                            </div>
                            <div className="action" onClick={(e) => {this.props.editPresetFunc(this.props.preset); e.stopPropagation();}} title="Edit preset">
                                <i className="fa fa-edit"></i>
                            </div>
                            {this.props.preset.choices.length === 0 ?
                                <div className="action" onClick={() => this.reassuringRemovePromptRefs.current.openDialog()} title="Remove preset">
                                    <i className="far fa-trash-alt"></i>
                                </div>
                                :
                                <div className="action action-disabled" title="Preset cannot be removed, as it still has choices.">
                                    <i className="far fa-trash-alt"></i>
                                </div>
                            }
                        </div>
                        :
                        <div className="toolbar">
                            <div className="grip-icon">
                                <i className="fas fa-bars"></i>
                            </div>
                        </div>
                    }
                </div>
                {!this.state.hideChoices && !this.props.sortMode &&
                    <ul>
                        {this.props.preset.choices.sort((a, b) => {
                            return a.name.localeCompare(b.name);
                        }).map(choice => (
                            <Choice
                                key={choice.uuid}
                                choice={choice}
                                preset={this.props.preset}
                                editFunc={this.props.editChoiceFunc}
                                removable={!(choice.uuid in this.props.numberOfTasksPerChoice) || this.props.numberOfTasksPerChoice[choice.uuid].length === 0}
                            />
                        ))}
                    </ul>
                }
                <ReassuringPrompt ref={this.reassuringRemovePromptRefs} header="Really want to delete?" text="Do you really want to remove this preset?" url={"/remove_preset/" + this.props.preset.project_name + "/" + this.props.preset.uuid}/>
            </li>
        );
    }
}

export default Preset;