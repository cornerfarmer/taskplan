import React from 'react';
import Option from "./Option";

class PresetFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.mapChoiceToChoices = this.mapChoiceToChoices.bind(this);
        this.calcChoiceName = this.calcChoiceName.bind(this);
    }

    calcChoiceName(choice, args) {
        let name = choice.name;
        for (let i = 0; i < args.length; i++) {
            name = name.replace("$T" + i + "$", args[i]);
        }
        return name;
    }

    calcChoiceClasses(preset, choice) {
        let classes = "choice ";
        if (preset.uuid in this.props.selectedChoices && this.props.selectedChoices[preset.uuid][0] === choice.uuid && (!("resolvedName" in choice) || this.calcChoiceName(choice, this.props.selectedChoices[preset.uuid].slice(1)) === choice.resolvedName))
            classes += "choice-selected ";
        if (preset.default_choice.uuid === choice.uuid)
            classes += "choice-default ";
        return classes;
    }

    mapChoiceToChoices(choice) {
        let choices = [];
        if (!choice.isTemplate)
            choices.push({"uuid": choice.uuid, "name": choice.name, "resolvedName": choice.name, "numberOfTasks": this.props.numberOfTasksPerChoice && choice.uuid in this.props.numberOfTasksPerChoice ? this.props.numberOfTasksPerChoice[choice.uuid].length : 0, "args": []});
        else if (choice.uuid in this.props.numberOfTasksPerChoice) {
            let numbersPerArg = {};
            for (let task of this.props.numberOfTasksPerChoice[choice.uuid]) {
                const name = this.calcChoiceName(choice, task.slice(1));
                if (!(name in numbersPerArg))
                    numbersPerArg[name] = [0, task.slice(1)];
                numbersPerArg[name][0]++;
            }

            for (let name in numbersPerArg)
                choices.push({"uuid": choice.uuid, "name": choice.name, "resolvedName": name, "numberOfTasks": numbersPerArg[name][0], "args": numbersPerArg[name][1]});
        }
        return choices;
    }

    render() {
        return (
            <div className="preset-filter">
                {Object.keys(this.props.presetsByGroup).sort((a, b) => a.localeCompare(b)).map((group) => (
                    <div key={group} className="preset-group">
                        {group !== "" &&
                        <div className="group-header" onClick={() => this.toggleHideChoices()}>
                            <div className="title">{group}</div>
                        </div>
                        }
                        <div className="presets">
                            {this.props.presetsByGroup[group].sort((a, b) => a.name.localeCompare(b.name)).map(preset => (
                                <div key={preset.uuid} className="preset">
                                    <div className="preset-name">
                                        {preset.name}
                                    </div>
                                    <div className="choices-wrapper">
                                        <div className="choices">
                                            {preset.choices.sort((a, b) => {
                                                return a.name.localeCompare(b.name);
                                            }).map(choice =>
                                                !choice.isTemplate || !this.props.useTemplateFields ?
                                                this.mapChoiceToChoices(choice).map(choice => (
                                                        <div key={choice.uuid} className={this.calcChoiceClasses(preset, choice)} onClick={() => this.props.onSelectionChange(preset, choice, choice.args)}>
                                                            <React.Fragment>
                                                                {choice.resolvedName}
                                                                {this.props.numberOfTasksPerChoice &&
                                                                <span className="task-numbers">{choice.numberOfTasks}</span>
                                                                }
                                                            </React.Fragment>
                                                        </div>
                                                    )
                                                ):(
                                                 <div key={choice.uuid} className={this.calcChoiceClasses(preset, choice, )} onClick={() => this.props.onSelectionChange(preset, choice, this.props.selectedChoices[preset.uuid][1])}>
                                                    <React.Fragment>
                                                        {choice.name.split("$T0$")[0]}
                                                        <input value={preset.uuid in this.props.selectedChoices ? this.props.selectedChoices[preset.uuid][1] : ""} style={{"width": Math.max(10, (10 * (preset.uuid in this.props.selectedChoices && this.props.selectedChoices[preset.uuid][1] !== undefined ? this.props.selectedChoices[preset.uuid][1] : "").length)) + "px"}} onChange={(evt) => this.props.onSelectionChange(preset, choice, evt.target.value)}/>
                                                        {choice.name.split("$T0$")[1]}
                                                    </React.Fragment>
                                                </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default PresetFilter;