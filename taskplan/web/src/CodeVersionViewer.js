import React from 'react';

class CodeVersionViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            choices: {},
            newName: ""
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onNewNameChange = this.onNewNameChange.bind(this);
        this.addCodeVersion = this.addCodeVersion.bind(this);
        this.selectCodeVersion = this.selectCodeVersion.bind(this);
        this.selectCodeVersion = this.selectCodeVersion.bind(this);
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

    onNewNameChange(event) {
        this.setState({
            newName: event.target.value
        });
    }

    addCodeVersion() {
        fetch("/add_code_version/" + this.props.project_name + "/" + this.state.newName)
        .then(res => res.json())
        .then(
            (result) => {

            },
            (error) => {

            }
        );


        this.setState({
            newName: ""
        });
    }

    selectCodeVersion(code_version) {
        fetch("/select_code_version/" + this.props.project_name + "/" + code_version)
        .then(res => res.json())
        .then(
            (result) => {

            },
            (error) => {

            }
        );
    }

    findCodeVersionInTree(tree, code_version_uuid) {
        if (tree.uuid === code_version_uuid) {
            return tree;
        } else {
            for (let child of tree.children) {
                const found = this.findCodeVersionInTree(child, code_version_uuid);
                if (found !== null)
                    return found;
            }
        }
        return null;
    }

    selectBranch(codeVersion, child_index) {
        let choices = Object.assign({}, this.state.choices);

        choices[codeVersion.uuid] = child_index;

        this.setState({
            choices: choices
        })
    }

    render() {
        if (this.state.open && this.props.codeVersionTree !== null) {
            let selectedNode = this.findCodeVersionInTree(this.props.codeVersionTree, this.props.currentCodeVersion);
            let choicesToSelected = {};
            while (selectedNode.base !== null) {
                if (selectedNode.base.children.length > 0)
                    choicesToSelected[selectedNode.base.uuid] = selectedNode.base.children.findIndex(x => x === selectedNode);
                selectedNode = selectedNode.base;
            }

            let codeVersions = [{"version": this.props.codeVersionTree,  "child_index": 0, "total_children": 1}];
            let currentCodeVersion = this.props.codeVersionTree;
            while (currentCodeVersion.children.length > 0) {
                let index = 0;
                if (currentCodeVersion.uuid in this.state.choices) {
                    index = this.state.choices[currentCodeVersion.uuid];
                } else if (currentCodeVersion.uuid in choicesToSelected) {
                    index = choicesToSelected[currentCodeVersion.uuid];
                }

                codeVersions.push({"version": currentCodeVersion.children[index], "child_index": index, "total_children": currentCodeVersion.children.length});
                currentCodeVersion = currentCodeVersion.children[index];
            }

            return (
                <div className="code-version-viewer slide-editor editor" >
                    <div className="header">Code versions<i class="fas fa-times" onClick={this.close}></i></div>
                    <div className="code-versions">
                        {codeVersions.map((entry, i) => (
                            <div>
                                <div className="code-version-row">
                                    {entry.child_index > 0 ?
                                        <div className="code-version-branch-arrow" onClick={() => this.selectBranch(entry.version.base, entry.child_index - 1)}>
                                            <i className="fas fa-chevron-left"></i>
                                        </div>
                                        :
                                        <div className="code-version-branch-arrow">
                                        </div>
                                    }
                                    <div className={this.props.currentCodeVersion === entry.version.uuid ? "code-version current-code-version" : "code-version"} onClick={() => this.selectCodeVersion(entry.version.uuid)}>
                                        <div className="name">{entry.version.name}</div>
                                        <div className="time">{entry.version.time.toShortStr()}</div>
                                    </div>
                                    {entry.child_index < entry.total_children - 1 ?
                                        <div className="code-version-branch-arrow" onClick={() => this.selectBranch(entry.version.base, entry.child_index + 1)}>
                                            <i className="fas fa-chevron-right"></i>
                                        </div>
                                        :
                                        <div className="code-version-branch-arrow">
                                        </div>
                                    }
                                </div>
                                {i < codeVersions.length - 1 &&
                                    <div className="arrow">
                                        <i className="fas fa-long-arrow-alt-down"></i>
                                    </div>
                                }
                            </div>
                            )
                        )}
                    </div>
                    <div style={{"flex": "1 1 0"}}></div>
                    <div className="header">Add code version</div>
                    <div className="field">
                        <label>Name:</label>
                        <input value={this.state.newName} onChange={this.onNewNameChange} />
                    </div>
                    <div className="buttons">
                        <div onClick={this.addCodeVersion}>Add</div>
                    </div>
                </div>
            );
        } else {
            return "";
        }
    }
}

export default CodeVersionViewer;