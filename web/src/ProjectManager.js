import React from 'react';
import Project from "./Project";

class ProjectManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            currentProject: 0
        };
        this.projectsRefs = [];
        this.gotoTB = this.gotoTB.bind(this);

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

    render() {
        return (
            <div id="project-manager">
                <div id="projects-toolbar">
                    {this.state.projects.map((project, index) => (
                        <div key={project.name} onClick={() => this.setProject(index)}>
                            {project.name}
                        </div>
                    ))}
                    <div id="tb-link" onClick={this.gotoTB}>TB</div>
                </div>
                <div id="projects">
                    {this.state.projects.map((project, index) => (
                        <Project
                            key={project.name}
                            project={project}
                            evtSource={this.props.evtSource}
                            ref={this.projectsRefs[index]}
                        />
                    ))}
                </div>
            </div>
        );
    }
}


export default ProjectManager;