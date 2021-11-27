import React from 'react';
import Project from "./Project";
import CodeVersionViewer from "./CodeVersionViewer";
import TaskViewer from "./TaskViewer";

class ProjectManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codeVersionTree: null,
            highlightedTask: null,
            allTags: [],
            refreshRate: null,
            detailTaskUuid: null,
            tensorboard_ports: {},
            viewsLoaded: false
        };
        this.addVersion = this.addVersion.bind(this);
        this.openTaskViewer = this.openTaskViewer.bind(this);
        this.openCodeVersionViewer = this.openCodeVersionViewer.bind(this);
        this.closeViewer = this.closeViewer.bind(this);
        this.closeTaskViewer = this.closeTaskViewer.bind(this);
        this.reload = this.reload.bind(this);
        this.promptRefs = React.createRef();
        this.projectRef = React.createRef();
        this.codeVersionViewerRef = React.createRef();
        this.taskViewerRef = React.createRef();


        this.props.evtSource.addEventListener("PROJECT_CHANGED", (e) => {
            const data = JSON.parse(e.data);
            this.setState({
                current_commit_id: data.current_commit_id,
                views: data.views,
                viewsLoaded: true,
                tensorboard_ports: data.tensorboard_ports,
                config_path: data.config_path,
                allTags: data.all_tags,
                refreshRate: parseInt(data.refreshRate),
                codeVersions: data.code_versions
            });
        });
    }


    addVersion() {
        this.promptRefs.current.openDialog();
    }

    closeViewer() {
        this.codeVersionViewerRef.current.close();
        this.closeTaskViewer();
        this.projectRef.current.paramViewerRef.current.close();
        this.projectRef.current.taskTabRef.current.taskEditor.current.close();
    }

    openTaskViewer(task_uuid) {
        this.closeViewer();
        this.setState({
            detailTaskUuid: task_uuid
        })
    }
    closeTaskViewer(task) {
        this.setState({
            detailTaskUuid: null
        })
    }

    openCodeVersionViewer(commit_id) {
        this.closeViewer();
        this.codeVersionViewerRef.current.open(commit_id);
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
        this.projectRef.current.autoFilterUpdate = false;
        fetch("/reload")
            .then(res => res.json())
            .then(
                (result) => {
                    this.projectRef.current.filterHasUpdated();
                    this.projectRef.current.autoFilterUpdate = true;
                },
                (error) => {

                }
            );
    }

    editTask(task) {
        this.projectRef.current.editTask(task);
    }

    render() {
        return (
            <div id="project-manager">
                <div id="projects-toolbar">
                    <span id="project-toolbar">
                        <div id="code-version" title="Show code version" onClick={() => this.openCodeVersionViewer(this.state.current_commit_id)}>{this.state.current_commit_id === undefined ? "" : this.state.current_commit_id.substr(0,7)}</div>
                        <div id="reload-tasks" onClick={this.reload} title="Reload tasks">
                            <i className="fas fa-sync-alt"></i>
                        </div>
                        <a id="open-table" href="/table" target="_blank" title="Open table view in new tab">
                            <i className="fas fa-table"></i>
                        </a>
                    </span>
                </div>
                <div id="projects">
                    {this.state.refreshRate !== null &&
                        <Project
                            ref={this.projectRef}
                            repository={this.props.repository}
                            showTask={this.openTaskViewer}
                            closeViewer={this.closeViewer}
                            highlightedTask={this.state.detailTaskUuid}
                            devices={this.props.devices}
                            views={this.state.views}
                            viewsLoaded={this.state.viewsLoaded}
                            allTags={this.state.allTags}
                            codeVersions={this.state.codeVersions}
                            refreshRate={this.state.refreshRate}
                            tensorboard_ports={this.state.tensorboard_ports}
                        />
                    }
                </div>
                <CodeVersionViewer
                    ref={this.codeVersionViewerRef}
                    updateView={() => this.projectRef.current.filterHasUpdated()}
                />
                <TaskViewer ref={this.taskViewerRef} close={this.closeTaskViewer} detailTaskUuid={this.state.detailTaskUuid} repository={this.props.repository} allTags={this.state.allTags} openCodeVersionViewer={this.openCodeVersionViewer} />
            </div>
        );
    }
}


export default ProjectManager;