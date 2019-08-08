// library to communicate with the backend
import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";

// project object and redirection using history
// async = function returns a promise (await)
export const createProject = (project, history) => async dispatch => {
  try {
    // using axios to send POST request to the server with the project object
    await axios.post("/api/project", project);
    // in spring controller basically the return statement
    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  }
};

export const getProjects = () => async dispatch => {
  const res = await axios.get("/api/project/all");
  dispatch({
    type: GET_PROJECTS,
    payload: res.data
  });
};

export const getProject = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/project/${id}`);
    dispatch({ type: GET_PROJECT, payload: res.data });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteProject = id => async dispatch => {
  if (
    window.confirm(
      "Are you sure? This will delete the entire project and all the data inside of it."
    )
  ) {
    try {
      await axios.delete(`/api/project/${id}`);
      dispatch({ type: DELETE_PROJECT, payload: id });
    } catch (error) {}
  }
};
