import React from 'react';
import Project from "./Project";
import CodeVersionViewer from "./CodeVersionViewer";
import TaskViewer from "./TaskViewer";

class ProjectManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codeVersionTree: null,
            highlightedTask: null
        };
        this.gotoTB = this.gotoTB.bind(this);
        this.addVersion = this.addVersion.bind(this);
        this.addCodeVersions = this.addCodeVersions.bind(this);
        this.openTaskViewer = this.openTaskViewer.bind(this);
        this.openCodeVersionViewer = this.openCodeVersionViewer.bind(this);
        this.closeViewer = this.closeViewer.bind(this);
        this.reload = this.reload.bind(this);
        this.promptRefs = React.createRef();
        this.codeVersionViewerRef = React.createRef();
        this.taskViewerRef = React.createRef();


        this.props.evtSource.addEventListener("PROJECT_CHANGED", (e) => {
            const data = JSON.parse(e.data);
            this.setState({
                current_code_version: data.current_code_version,
                tensorboard_port: data.tensorboard_port
            });
        });
    }

    componentDidMount() {
        this.props.repository.onAdd("codeVersions", this.addCodeVersions);
        for (let codeVersion in this.props.repository.codeVersions)
            this.addCodeVersions(this.props.repository.codeVersions[codeVersion]);
    }

    componentWillUnmount() {
        this.props.repository.removeOnAdd("codeVersions", this.addCodeVersions);
    }

    addCodeVersions(codeVersion) {
        let newNode = {
            "uuid": codeVersion.uuid,
            "name": codeVersion.name,
            "base": codeVersion.base,
            "time": codeVersion.time,
            "children": []
        };
        let codeVersionTree = this.state.codeVersionTree;
        if (codeVersionTree === null) {
            codeVersionTree = newNode;
            this.setState({
                codeVersionTree: codeVersionTree
            });
        } else {
            this.insertCodeVersionNode(codeVersionTree, newNode);
            this.setState({
                codeVersionTree: codeVersionTree
            });
        }
    }

    insertCodeVersionNode(root, newNode) {
        if (root.uuid === newNode.base) {
            root.children.push(newNode);
            newNode.base = root;
        } else {
            for (let child of root.children) {
                this.insertCodeVersionNode(child, newNode);
            }
        }
    }

    updateCodeVersionNode(root, newNode) {
        if (root.uuid === newNode.uuid) {
            root.name = newNode.name;
            root.time = newNode.time;
        } else {
            for (let child of root.children) {
                this.updateCodeVersionNode(child, newNode);
            }
        }
    }

    gotoTB() {
        if (this.state.tensorboard_port === -1) {
             fetch("/tensorboard")
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result !== -1) {
                            window.open("//" + window.location.hostname + ":" + result, '_blank');
                        }
                    },
                    (error) => {

                    }
                )
        } else {
            window.open("//" + window.location.hostname + ":" + this.state.tensorboard_port,'_blank');
        }
    }

    addVersion() {
        this.promptRefs.current.openDialog();
    }

    closeViewer() {
        this.codeVersionViewerRef.current.close();
        this.taskViewerRef.current.close();
    }

    openTaskViewer(task) {
        this.closeViewer();
        this.taskViewerRef.current.open(task);
    }

    openCodeVersionViewer() {
        this.closeViewer();
        this.codeVersionViewerRef.current.open();
    }

    highlightTask(task) {
        this.setState({
            highlightedTask: task.uuid
        });
        setTimeout(() => {
            this.setState({
                highlightedTask: null
            });
        }, 1500);
    }

    reload() {
        fetch("/reload")
            .then(res => res.json())
            .then(
                (result) => {

                },
                (error) => {

                }
            );
    }

    render() {
        return (
            <div id="project-manager">
                <div id="projects-toolbar">
                    {this.state.current_code_version in this.props.repository.codeVersions &&
                        <span id="project-toolbar">
                            <div id="code-version" title="Add new code version" onClick={this.openCodeVersionViewer}>{this.props.repository.codeVersions[this.state.current_code_version].name}</div>
                            <div id="tb-link" onClick={this.gotoTB} title="Start and open tensorboard">TB</div>
                            <div id="reload-tasks" onClick={this.reload} title="Reload tasks">
                                <i className="fas fa-sync-alt"></i>
                            </div>
                        </span>
                    }
                </div>
                <div id="projects">
                    <Project
                        repository={this.props.repository}
                        showTask={this.openTaskViewer}
                        closeViewer={this.closeViewer}
                        highlightedTask={this.state.highlightedTask}
                        devices={this.props.devices}
                        current_code_version={this.state.current_code_version}
                    />
                </div>
                {this.state.codeVersionTree !== null &&
                    <CodeVersionViewer
                        ref={this.codeVersionViewerRef}
                        codeVersionTree={this.state.codeVersionTree}
                        currentCodeVersion={this.state.current_code_version}
                    />
                }
                <TaskViewer ref={this.taskViewerRef} repository={this.props.repository} codeVersions={this.props.repository.codeVersions} />
            </div>
        );
    }
}


export default ProjectManager;