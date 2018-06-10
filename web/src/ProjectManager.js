import React from 'react';
import Project from "./Project";
import Prompt from "./Prompt";

class ProjectManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            currentProject: 0
        };
        this.projectsRefs = [];
        this.gotoTB = this.gotoTB.bind(this);
        this.addVersion = this.addVersion.bind(this);
        this.promptRefs = React.createRef();

        var pm = this;
        this.props.evtSource.addEventListener("PROJECT_CHANGED", function (e) {
            const projects = pm.state.projects.slice();
            const changedProject = JSON.parse(e.data);

            const projectIndex = pm.state.projects.findIndex(function (e) {
                return e.name === changedProject.name
            });

            if (projectIndex >= 0) {
                projects[projectIndex] = changedProject
            } else {
                projects.push(changedProject);
                pm.projectsRefs.push(React.createRef());
            }

            pm.setState({
                projects: projects
            });
        });

        this.props.evtSource.addEventListener("PRESET_CHANGED", function (e) {
            const changedPreset = JSON.parse(e.data);
            const projectIndex = pm.state.projects.findIndex(function (e) {
                return e.name === changedPreset.project_name
            });

            if (projectIndex >= 0) {
                pm.projectsRefs[projectIndex].current.presetChanged(changedPreset)
            } else {
                console.log("Undefined project: " + changedPreset.project_name)
            }
        });

        this.props.evtSource.addEventListener("TASK_CHANGED", function (e) {
            const changedTask = JSON.parse(e.data);
            const projectIndex = pm.state.projects.findIndex(function (e) {
                return e.name === changedTask.project_name
            });

            if (projectIndex >= 0) {
                pm.projectsRefs[projectIndex].current.taskChanged(changedTask)
            } else {
                console.log("Undefined project: " + changedTask.project_name)
            }
        });

        this.props.evtSource.addEventListener("TASK_REMOVED", function (e) {
            const changedTask = JSON.parse(e.data);
            const projectIndex = pm.state.projects.findIndex(function (e) {
                return e.name === changedTask.project_name
            });

            if (projectIndex >= 0) {
                pm.projectsRefs[projectIndex].current.removeTask(changedTask.uuid)
            } else {
                console.log("Undefined project: " + changedTask.project_name)
            }
        });
    }

    setProject(currentProject) {
        this.setState({
            currentProject: currentProject
        });
    }

    gotoTB() {
        if (this.state.projects[this.state.currentProject].tensorboard_port === -1) {
             fetch("/tensorboard/" + this.state.projects[this.state.currentProject].name)
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
            window.open("//" + window.location.hostname + ":" + this.state.projects[this.state.currentProject].tensorboard_port,'_blank');
        }
    }

    changeProject(deltaIndex) {
        var currentProject = this.state.currentProject;
        currentProject += deltaIndex;
        currentProject = Math.min(this.state.projects.length - 1, Math.max(0, currentProject));
        console.log(currentProject);
        this.setState({
            currentProject: currentProject
        });
    }

    addVersion() {
        this.promptRefs.current.openDialog();
    }

    render() {
        return (
            <div id="project-manager">
                <div id="projects-toolbar">
                    {this.state.projects.length > 0 &&
                        <div id="project-selector">
                            <span onClick={() => this.changeProject(-1)} className={this.state.currentProject > 0 ? 'active' : ''}>
                                <i className="fas fa-caret-left"></i>
                            </span>
                            <span>
                                {this.state.projects[this.state.currentProject].name}
                            </span>
                            <span onClick={() => this.changeProject(1)} className={this.state.currentProject < this.state.projects.length - 1 ? 'active' : ''}>
                                <i className="fas fa-caret-right"></i>
                            </span>
                        </div>
                    }
                    {this.state.projects.length > 0 &&
                        <span id="project-toolbar">
                            <div id="code-version" >{this.state.projects[this.state.currentProject].version} <i className="fas fa-plus" id="add-version" onClick={this.addVersion}></i></div>
                            <div id="tb-link" onClick={this.gotoTB}>TB</div>
                            <Prompt ref={this.promptRefs} header="Create code version" text="Specify the name of the new code version:" url={"/addVersion/" + this.state.projects[this.state.currentProject].name}/>
                        </span>
                    }
                </div>
                <div id="projects">
                    {this.state.projects.map((project, index) => (
                        <Project
                            key={project.name}
                            project={project}
                            evtSource={this.props.evtSource}
                            visible={index === this.state.currentProject}
                            ref={this.projectsRefs[index]}
                        />
                    ))}
                </div>
            </div>
        );
    }
}


export default ProjectManager;