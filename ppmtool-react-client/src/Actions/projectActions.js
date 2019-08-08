// library to communicate with the backend
import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT } from "./types";
import { restElement } from "@babel/types";

// project object and redirection using history
// async = function returns a promise (await)
export const createProject = (project, history) => async dispatch => {
  try {
    // using axios to send POST request to the server with the project object
    const res = await axios.post("http://localhost:8080/api/project", project);
    // in spring controller basically the return statement
    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getProjects = () => async dispatch => {
  const res = await axios.get("http://localhost:8080/api/project/all");
  dispatch({
    type: GET_PROJECTS,
    payload: res.data
  });
};

export const getProject = (id, history) => async dispatch => {
  const res = await axios.get(`http://localhost:8080/api/project/${id}`);
  dispatch({ type: GET_PROJECT, payload: res.data });
};
