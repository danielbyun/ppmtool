import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";

export default class Dashboard extends Component {
  render() {
    return (
      <>
        <h1>Welcome to the damn Personal Project Tool Application</h1>
        <ProjectItem />
      </>
    );
  }
}
