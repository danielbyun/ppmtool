import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../Actions/projectActions";
import PropTypes from "prop-types";

class Dashboard extends Component {
  // lifecycle hook
  // what happens when we mount
  componentDidMount() {
    // call the function
    this.props.getProjects();
  }
  render() {
    // the list of projects returned from the server to display to the UI
    const { projects } = this.props.project;
    return (
      <>
        <div className="projects">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Projects</h1>
                <br />
                <CreateProjectButton />
                <br />
                <hr />
                {
                  // wire it up here to display
                  // by using the map function
                }
                {projects.map(project => (
                  <ProjectItem key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Dashboard.propTypes = {
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  project: state.project
});

export default connect(
  mapStateToProps,
  { getProjects }
)(Dashboard);
