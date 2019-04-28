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
        this.gotoTB = this.gotoTB.bind(this);
        this.addVersion = this.addVersion.bind(this);
        this.updateProjects = this.updateProjects.bind(this);
        this.promptRefs = React.createRef();
    }

    componentDidMount() {
        this.props.repository.onChange("projects", this.updateProjects);
        this.updateProjects(this.props.repository.projects);
    }

    componentWillUnmount() {
        this.props.repository.removeOnChange("projects", this.updateProjects);
    }

    updateProjects(projects) {
        this.setState({
            projects: Object.values(projects)
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
                            <div id="code-version" title="Add new code version">{this.state.projects[this.state.currentProject].version} <i className="fas fa-plus" id="add-version" onClick={this.addVersion}></i></div>
                            <div id="tb-link" onClick={this.gotoTB} title="Start and open tensorboard">TB</div>
                            <Prompt ref={this.promptRefs} header="Create code version" text="Specify the name of the new code version:" url={"/addVersion/" + this.state.projects[this.state.currentProject].name}/>
                        </span>
                    }
                </div>
                <div id="projects">
                    {this.state.projects.map((project, index) => (
                        <Project
                            key={project.name}
                            project={project}
                            repository={this.props.repository}
                            visible={index === this.state.currentProject}
                        />
                    ))}
                </div>
            </div>
        );
    }
}


export default ProjectManager;