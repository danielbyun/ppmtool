// library to communicate with the backend
import axios from "axios";
import { GET_ERRORS } from "./types";

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
