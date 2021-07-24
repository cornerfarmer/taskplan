import React from 'react';


class ParamFilterParam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.mapValueToValues = this.mapValueToValues.bind(this);
        this.calcParamValueName = this.calcParamValueName.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
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
        if (!this.props.useTemplateFields) {
            let paramValues = [];
            for (let name in paramValue.number_of_tasks)
                paramValues.push({"uuid": paramValue.uuid, "name": paramValue.name, "resolvedName": name, "numberOfTasks": paramValue.number_of_tasks[name][0], "args": paramValue.number_of_tasks[name][1]});
            return paramValues;
        } else {
            return [{"uuid": paramValue.uuid, "name": paramValue.name, "resolvedName": paramValue.name, "numberOfTasks": null, "args": []}];
        }
    }

    toggleAll(evt) {
        this.props.toggleSelection(this.props.param, null, []);
        evt.stopPropagation();
    }

    getSelectedValues() {
        if (!(this.props.param.uuid in this.props.selectedParamValues))
            return ["All"];
        else if (this.props.selectedParamValues[this.props.param.uuid].length === 0)
            return ["None"];
        else {
            let selectedParamValues = this.props.selectedParamValues[this.props.param.uuid];
            if (!this.props.selectMultiple)
                selectedParamValues = [selectedParamValues];

            let values = [];
            for (let selection of selectedParamValues) {
                const paramValue = this.props.param.values.find(value => value.uuid === selection[0]);
                values.push(this.calcParamValueName(paramValue, selection.slice(1)));
            }
            return values;
        }
    }

    render() {
        return (
            <div key={this.props.param.uuid} className="param" style={this.props.spaceBelow && {"margin-bottom": "5px"}}>
                <div className={this.props.expanded ? "param-name param-name-expanded" : "param-name param-name-collapsed"} onClick={() => this.props.toggleExpandedParam(this.props.param.uuid)}>
                    {this.props.param.name}

                    {this.props.expanded ?
                        this.props.selectMultiple &&
                        <span className={!(this.props.param.uuid in this.props.selectedParamValues) ? "all-button all-button-activated" : "all-button"} onClick={this.toggleAll}>
                            All
                        </span>
                        :
                        <span className="param-value-hints">
                            {this.getSelectedValues().map(paramValue =>
                                <span className="param-value-hint">
                                    {paramValue}
                                </span>
                            )}
                        </span>
                    }
                </div>
                {this.props.expanded &&
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
                                                {value.numberOfTasks !== null && <span className="task-numbers">{value.numberOfTasks}</span>}
                                            </React.Fragment>
                                        </div>
                                    )
                                ):(
                                 <div key={paramValue.uuid} className={this.calcParamValueClasses(this.props.param, paramValue)} onClick={() => this.props.toggleSelection(this.props.param, paramValue, [this.props.getParamValueArg(this.props.param, paramValue)])}>
                                    <React.Fragment>
                                        {paramValue.name.split("$T0$")[0]}
                                        <input value={this.props.getParamValueArg(this.props.param, paramValue)} style={{"width": Math.max(10, (10 * (this.props.getParamValueArg(this.props.param, paramValue)).toString().length)) + "px"}} onChange={(evt) => this.props.onParamValueArgChange(this.props.param, paramValue, evt)}/>
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
            paramValueArguments: {},
            expandedParam: null
        };
        this.onParamValueArgChange = this.onParamValueArgChange.bind(this);
        this.getParamValueArg = this.getParamValueArg.bind(this);
        this.toggleExpandedParam = this.toggleExpandedParam.bind(this);
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

    toggleExpandedParam(param) {
        this.setState({
            expandedParam: param === this.state.expandedParam ? null : param
        })
    }

    render() {
        let tagsParam = null;

        if (this.props.tags !== undefined && this.props.tags.length > 0) {
            tagsParam = {
                "uuid": "tags",
                "name": "tags",
                "deprecated_param_value": this.props.tags[0],
                "default_param_value": this.props.tags[0],
                "values": []
            };
            tagsParam["values"] = [];
            for (const tag of this.props.tags) {
                tagsParam["values"].push({"name": tag, "uuid": tag, "number_of_tasks": {[tag]: [null, []]}});
            }
        }

        let versionsParam = null;
        if (this.props.codeVersions !== undefined && this.props.codeVersions.length > 0) {
            versionsParam = {
                "uuid": "versions",
                "name": "versions",
                "deprecated_param_value": "test",
                "default_param_value": "test",
                "values": []
            };
            versionsParam["values"] = [];
            for (const version of this.props.codeVersions) {
                versionsParam["values"].push({"name": version, "uuid": version, "number_of_tasks": {[version]: [null, []]}});
            }
        }

        return (
            <React.Fragment>
                {versionsParam !== null &&
                    <div className="param-filter">
                    <ParamFilterParam
                        param={versionsParam}
                        useTemplateFields={this.props.useTemplateFields}
                        toggleSelection={this.props.toggleSelection}
                        selectedParamValues={this.props.selectedParamValues}
                        getParamValueArg={this.getParamValueArg}
                        selectMultiple={this.props.selectMultiple}
                        expanded={"versions" === this.state.expandedParam}
                        toggleExpandedParam={this.toggleExpandedParam}
                        onParamValueArgChange={this.onParamValueArgChange}
                    />
                    </div>
                }
                {tagsParam !== null &&
                    <div className="param-filter">
                    <ParamFilterParam
                        param={tagsParam}
                        useTemplateFields={this.props.useTemplateFields}
                        toggleSelection={this.props.toggleSelection}
                        selectedParamValues={this.props.selectedParamValues}
                        getParamValueArg={this.getParamValueArg}
                        selectMultiple={this.props.selectMultiple}
                        expanded={"tags" === this.state.expandedParam}
                        toggleExpandedParam={this.toggleExpandedParam}
                        onParamValueArgChange={this.onParamValueArgChange}
                        />
                    </div>
                }
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
                                {this.props.paramsByGroup[group].sort((a, b) => a.name.localeCompare(b.name)).filter(param => (param.values.length > 0 && (this.props.paramVisibility === undefined || !(param.uuid in this.props.paramVisibility) || this.props.paramVisibility[param.uuid]))).map(param => (
                                    <ParamFilterParam
                                        param={param}
                                        useTemplateFields={this.props.useTemplateFields}
                                        toggleSelection={this.props.toggleSelection}
                                        selectedParamValues={this.props.selectedParamValues}
                                        getParamValueArg={this.getParamValueArg}
                                        selectMultiple={this.props.selectMultiple}
                                        expanded={param.uuid === this.state.expandedParam}
                                        toggleExpandedParam={this.toggleExpandedParam}
                                        onParamValueArgChange={this.onParamValueArgChange}
                                        />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </React.Fragment>
        );
    }
}

export default ParamFilter;