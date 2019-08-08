import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../Actions/projectActions";

class AddProject extends Component {
  constructor() {
    super();

    // sets initial state for input fields to update later
    this.state = {
      projectName: "",
      projectIdentifier: "",
      description: "",
      start_date: "",
      end_date: ""
    };
    // binding
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    // reading the value of the each input
    this.setState({ [e.target.name]: e.target.value });
  }
  // form submit action
  onSubmit(e) {
    // to not have the webpage refresh
    e.preventDefault();

    // the form getting passed to the server
    const newProject = {
      // get the value of each input
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date
    };

    this.props.createProject(newProject, this.props.history);
  }
  render() {
    return (
      <div>
        {/*
            1) check name attribute input fields
            2) create constructor
            3) set state
            4) set value on input fields
            5) create onChange function
            6) set onChange on each input field
            7) bind on constructor
            8) check state change in the react extension
         */}
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Create Project form</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg "
                      placeholder="Project Name"
                      name="projectName"
                      value={this.state.projectName}
                      // applying the bind function
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Unique Project ID"
                      name="projectIdentifier"
                      value={this.state.projectIdentifier}
                      // applying the bind function
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      placeholder="Project Description"
                      name="description"
                      value={this.state.description}
                      // applying the bind function
                      onChange={this.onChange}
                    />
                  </div>
                  <h6>Start Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="start_date"
                      value={this.start_date}
                      // applying the bind function
                      onChange={this.onChange}
                    />
                  </div>
                  <h6>Estimated End Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="end_date"
                      value={this.end_date}
                      // applying the bind function
                      onChange={this.onChange}
                    />
                  </div>

                  <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired
};

export default connect(
  null,
  { createProject }
)(AddProject);
