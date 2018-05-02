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

        var pm = this;
        this.props.evtSource.addEventListener("PROJECT_ADDED", function (e) {
            const projects = pm.state.projects.slice();
            const newProject = JSON.parse(e.data);

            projects.push(newProject);
            pm.projectsRefs.push(React.createRef());

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


    render() {
        return (
            <div id="project-manager">
                <div id="projects-toolbar">
                    {this.state.projects.map((project, index) => (
                        <div key={project.name} onClick={() => this.setProject(index)}>
                            {project.name}
                        </div>
                    ))}
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