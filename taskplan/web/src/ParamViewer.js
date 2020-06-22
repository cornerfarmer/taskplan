import React from 'react';
import ParamFilter from "./ParamFilter";
import ParamSelection from "./ParamSelection";


class Column extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.colRef = React.createRef();
        this.onDragStart = this.onDragStart.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.getClassName = this.getClassName.bind(this);
        this.dragEnterCounter = 0
    }

    getClassName() {
        return this.props.isDummy ? "table-col-dummy" : "table-col-entry";
    }

    onDragStart(e) {
        e.dataTransfer.setData("text/plain", this.props.col);
    }

    onDragOver(e) {
        e.preventDefault();
    }

    onDrop(e) {
        if (this.props.allowDrop) {
            e.preventDefault();
            this.props.addCol(e.dataTransfer.getData("text/plain"), this.props.col);

            this.dragEnterCounter = 0;
            this.colRef.current.className = this.getClassName();
        }
    }

    onDragEnter(e) {
        if (this.props.allowDrop) {
            e.preventDefault();
            this.colRef.current.className = this.getClassName() + " on-drag-over";
            this.dragEnterCounter++;
        }
    }

    onDragLeave(e) {
        if (this.props.allowDrop) {
            e.preventDefault();
            this.dragEnterCounter--;
            if (this.dragEnterCounter === 0)
                this.colRef.current.className = this.getClassName();
        }
    }

    render() {
        return (
            <div className={this.getClassName()} ref={this.colRef} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} onDrop={this.onDrop} onDragStart={this.onDragStart} draggable={"true"}>
                {!this.props.isDummy &&
                    <React.Fragment>
                        <div>{this.props.col}</div>
                        {this.props.removeCol && <i className="fas fa-times" onClick={() => this.props.removeCol(this.props.col)}></i>}
                    </React.Fragment>
                }
            </div>
        );
    }

}

class ParamViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open == true,
            filterSaveName: "",
            viewPath: ""
        };

        this.paramCollapseSelection = React.createRef();
        this.paramGroupSelection = React.createRef();
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.saveFilter = this.saveFilter.bind(this);
        this.deleteFilter = this.deleteFilter.bind(this);
        this.handleFilterSaveNameChange = this.handleFilterSaveNameChange.bind(this);
        this.handleViewPathChange = this.handleViewPathChange.bind(this);
        this.addView = this.addView.bind(this);
    }

    open() {
        this.setState({
            open: true
        });
    }

    close() {
        this.setState({
            open: false
        });
    }

    handleFilterSaveNameChange(event) {
        this.setState({
            filterSaveName: event.target.value
        });
    }


    saveFilter() {
        if (this.state.filterSaveName !== "") {
            this.props.saveFilter(this.state.filterSaveName);
        }
    }

    handleViewPathChange(event) {
        this.setState({
            viewPath: event.target.value
        });
    }


    addView() {
        if (this.state.viewPath !== "") {
            this.props.addView(this.state.viewPath);
        }
    }

    deleteFilter(name) {
        var data = new FormData();
        var dataJson = {};
        dataJson['name'] = name;

        data.append("data", JSON.stringify(dataJson));

        fetch("delete_filter", {
            method: "POST",
            body: data
        })
    }

    deleteView(path) {
        var data = new FormData();
        var dataJson = {};
        dataJson['path'] = path;

        data.append("data", JSON.stringify(dataJson));

        fetch("delete_view", {
            method: "POST",
            body: data
        })
    }




    render() {
        if (this.state.open) {
            return (
                <div className="param-viewer slide-editor editor" style={this.props.style}>
                    <div className="header">Save / Load</div>
                    <div className="params-to-group param-filter">
                       {Object.keys(this.props.saved_filters).map(savedFilterName => (
                           <div className="param-name">
                               <div onClick={() => this.props.loadFilter(this.props.saved_filters[savedFilterName])}>
                                {savedFilterName}
                               </div>
                               <i className="fas fa-times" onClick={() => this.deleteFilter(savedFilterName)}></i>
                           </div>
                       ))}
                    </div>
                    <input type="text" name="filterSaveName" value={this.state.filterSaveName} onChange={this.handleFilterSaveNameChange} />
                    <div className="buttons">
                        <div onClick={this.saveFilter}>Save</div>
                    </div>

                    {!this.props.hideViews &&
                        <React.Fragment>
                            <div className="header">Filesystem</div>
                            <div className="params-to-group param-filter">
                               {Object.keys(this.props.views).map(path => (
                                   <div className="param-name">
                                       <div onClick={() => this.props.loadFilter(this.props.views[path])}>
                                        {path}
                                       </div>
                                       <i className="fas fa-times" onClick={() => this.deleteView(path)}></i>
                                   </div>
                               ))}
                            </div>
                            <input type="text" name="viewPath" value={this.state.viewPath} onChange={this.handleViewPathChange} />
                            <div className="buttons">
                                <div onClick={this.addView}>Add</div>
                            </div>
                        </React.Fragment>
                    }

                    <div className="header">Parameter filter<i className="fas fa-times" onClick={this.close}></i></div>
                    <label>
                        <input type="checkbox" checked={this.props.paramFilterEnabled} onChange={() => this.props.toggleParamFilter()} />
                        <span>Enabled</span>
                    </label>
                    <ParamFilter selectMultiple={true} paramsByGroup={this.props.paramsByGroup} selectedParamValues={this.props.selectedParamValues} toggleSelection={this.props.toggleSelection}/>

                    <div className="header">Collapsing</div>
                    <div className="params-to-collapse param-filter">
                       {this.props.collapsedParams.map(param_uuid => this.props.params.find(p => p.uuid === param_uuid)).map(param => (
                           <div className="param-name">{param.name} <i className="fas fa-times" onClick={() => this.props.removeParamCollapse(param)}></i></div>
                        ))}
                    </div>
                    <ParamSelection header="Select param to collapse" ref={this.paramCollapseSelection} paramsByGroup={this.props.paramsByGroup} onSelect={this.props.addParamCollapse}/>
                    <div className="buttons">
                        <div onClick={() => this.paramCollapseSelection.current.openDialog()}>Add</div>
                    </div>

                    <div className="header">Grouping</div>
                    <div className="params-to-group param-filter">
                       {this.props.groupedParams.map(params => (
                           <div className="param-name">
                               {params.map(param_uuid => this.props.params.find(p => p.uuid === param_uuid)).map(param => param.name).join(" / ")}
                               <i className="fas fa-times" onClick={() => this.props.removeParamGroup(params)}></i>
                           </div>
                       ))}
                    </div>
                    <ParamSelection header="Select params to group" selectMultiple={true} ref={this.paramGroupSelection} paramsByGroup={this.props.paramsByGroup} onSelect={this.props.addParamGroup}/>
                    <div className="buttons">
                        <div onClick={() => this.paramGroupSelection.current.openDialog()}>Add</div>
                    </div>


                    {this.props.selectedCols !== undefined &&
                        <React.Fragment>
                            <div className="header">Columns</div>
                            <div className="table-cols">
                                <div className="table-col">
                                    <div className="table-col-header">Used:</div>
                                    {this.props.selectedCols.map(col => (
                                        <Column
                                            col={col}
                                            allowDrop={true}
                                            removeCol={this.props.removeCol}
                                            addCol={this.props.addCol}
                                        />
                                    ))}
                                    <Column
                                        col={null}
                                        allowDrop={true}
                                        removeCol={this.props.removeCol}
                                        addCol={this.props.addCol}
                                        isDummy={true}
                                    />
                                </div>
                                <div className="table-col">
                                    <div className="table-col-header">Not used:</div>
                                    {this.props.allCols.filter(col => (this.props.selectedCols.findIndex(x => x === col) === -1)).map(col => (
                                        <Column
                                            col={col}
                                        />
                                    ))}
                                </div>
                            </div>
                        </React.Fragment>
                    }
                </div>
            );
        } else {
            return "";
        }
    }
}

export default ParamViewer;