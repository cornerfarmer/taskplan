import React from 'react';


class ParamFilterParam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            extended: false
        };

        this.mapValueToValues = this.mapValueToValues.bind(this);
        this.calcParamValueName = this.calcParamValueName.bind(this);
    }

    calcParamValueName(paramValue, args) {
        let name = paramValue.name;
        for (let i = 0; i < args.length; i++) {
            name = name.replace("$T" + i + "$", args[i]);
        }
        return name;
    }

    calcParamValueClasses(param, value) {
        let classes = "param-value ";
        if (this.props.selectMultiple) {
            const paramValue = [value.uuid, ...value.args];
            if (!(param.uuid in this.props.selectedParamValues) || (param.uuid in this.props.selectedParamValues && this.props.selectedParamValues[param.uuid].findIndex(selection => selection.length === paramValue.length && selection.every((value, index) => value === paramValue[index])) !== -1))
                classes += "param-value-selected ";
        } else {
            if (param.uuid in this.props.selectedParamValues && this.props.selectedParamValues[param.uuid][0] === value.uuid && (!("resolvedName" in value) || this.calcParamValueName(value, this.props.selectedParamValues[param.uuid].slice(1)) === value.resolvedName))
                classes += "param-value-selected ";
        }
        if (param.default_param_value.uuid === value.uuid)
            classes += "param-value-default ";
        return classes;
    }

    mapValueToValues(paramValue) {
        let paramValues = [];
        if (!paramValue.isTemplate)
            paramValues.push({"uuid": paramValue.uuid, "name": paramValue.name, "resolvedName": paramValue.name, "numberOfTasks": this.props.numberOfTasksPerParamValue && paramValue.uuid in this.props.numberOfTasksPerParamValue ? this.props.numberOfTasksPerParamValue[paramValue.uuid].length : 0, "args": []});
        else if (paramValue.uuid in this.props.numberOfTasksPerParamValue) {
            let numbersPerArg = {};
            for (let task of this.props.numberOfTasksPerParamValue[paramValue.uuid]) {
                const name = this.calcParamValueName(paramValue, task[1]);
                if (!(name in numbersPerArg))
                    numbersPerArg[name] = [0, task[1]];
                numbersPerArg[name][0]++;
            }

            for (let name in numbersPerArg)
                paramValues.push({"uuid": paramValue.uuid, "name": paramValue.name, "resolvedName": name, "numberOfTasks": numbersPerArg[name][0], "args": numbersPerArg[name][1]});
        }
        return paramValues;
    }

    render() {
        return (
            <div key={this.props.param.uuid} className="param">
                <div className="param-name" onClick={() => this.setState({extended: !this.state.extended})}>
                    {this.props.param.name}
                </div>
                {this.state.extended &&
                    <div className="param-values-wrapper">
                        <div className="param-values">
                            {this.props.param.values.sort((a, b) => {
                                return a.name.localeCompare(b.name);
                            }).map(paramValue =>
                                !paramValue.isTemplate || !this.props.useTemplateFields ?
                                this.mapValueToValues(paramValue).map(value => (
                                        <div key={value.uuid} className={this.calcParamValueClasses(this.props.param, value)} onClick={() => this.props.toggleSelection(this.props.param, value, value.args)}>
                                            <React.Fragment>
                                                {value.resolvedName}
                                                {this.props.numberOfTasksPerParamValue &&
                                                <span className="task-numbers">{value.numberOfTasks}</span>
                                                }
                                            </React.Fragment>
                                        </div>
                                    )
                                ):(
                                 <div key={paramValue.uuid} className={this.calcParamValueClasses(this.props.param, paramValue)} onClick={() => this.props.toggleSelection(this.props.param, paramValue, [this.props.getParamValueArg(this.props.param, paramValue)])}>
                                    <React.Fragment>
                                        {paramValue.name.split("$T0$")[0]}
                                        <input value={this.props.getParamValueArg(this.props.param, paramValue)} style={{"width": Math.max(10, (10 * (this.props.getParamValueArg(this.props.param, paramValue)).toString().length)) + "px"}} onChange={(evt) => this.onParamValueArgChange(this.props.param, paramValue, evt)}/>
                                        {paramValue.name.split("$T0$")[1]}
                                    </React.Fragment>
                                </div>
                                )
                            )}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

class ParamFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paramValueArguments: {}
        };
        this.onParamValueArgChange = this.onParamValueArgChange.bind(this);
        this.getParamValueArg = this.getParamValueArg.bind(this);
    }


    onParamValueArgChange(param, value, evt) {
        const paramValueArguments = Object.assign({}, this.state.paramValueArguments);

        paramValueArguments[value.uuid] = evt.target.value;
        this.props.toggleSelection(param, value, evt.target.value);

        this.setState({
            paramValueArguments: paramValueArguments
        });
    }

    getParamValueArg(param, value) {
        if (param.uuid in this.props.selectedParamValues && this.props.selectedParamValues[param.uuid].length > 1) {
            if (!(value.uuid in this.state.paramValueArguments) || this.state.paramValueArguments[value.uuid] !== this.props.selectedParamValues[param.uuid][1]) {
                const paramValueArguments = Object.assign({}, this.state.paramValueArguments);

                paramValueArguments[value.uuid] = this.props.selectedParamValues[param.uuid][1];

                this.setState({
                    paramValueArguments: paramValueArguments
                });
            }

            return this.props.selectedParamValues[param.uuid][1];
        } else if (value.uuid in this.state.paramValueArguments)
            return this.state.paramValueArguments[value.uuid];
        else if (value.template_defaults.length > 0)
            return value.template_defaults[0];
        else
            return null;
    }

    render() {
        return (
            <div className="param-filter">
                {Object.keys(this.props.paramsByGroup).sort((a, b) => a.localeCompare(b)).map((group) => (
                    <div key={group} className="param-group">
                        {group !== "" &&
                        <div className="group-header" onClick={() => this.toggleHideParamValues()}>
                            <div className="title">{group}</div>
                        </div>
                        }
                        <div className="params">
                            <div className="params">
                                {this.props.paramsByGroup[group].sort((a, b) => a.name.localeCompare(b.name)).map(param => (
                                    <ParamFilterParam
                                        param={param}
                                        useTemplateFields={this.props.useTemplateFields}
                                        toggleSelection={this.props.toggleSelection}
                                        selectedParamValues={this.props.selectedParamValues}
                                        getParamValueArg={this.getParamValueArg}
                                        numberOfTasksPerParamValue={this.props.numberOfTasksPerParamValue}
                                        selectMultiple={this.props.selectMultiple}
                                        />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default ParamFilter;