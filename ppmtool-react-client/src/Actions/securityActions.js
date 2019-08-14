import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";
import setJwtToken from "../SecurityUtils/setJwtToken";

export const createNewUser = (newUser, history) => async dispatch => {
  try {
    // server call
    await axios.post("/api/users/register", newUser);

    // redirect after success
    history.push("/login");

    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    // if there is an error in the response
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

// security action (login) code
export const login = LoginRequest => async dispatch => {
  try {
    // post action => LoginRequest
    const res = await axios.post("/api/users/login", LoginRequest);

    // extract token from res.data
    const { token } = res.data;

    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);

    // set our token in the header ***
    setJwtToken(token);

    // decode token on React
    const decoded = jwt_decode(token);

    // dispatch to our securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (error) {
    // dispatch the errors
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

// logout function
export const logout = () => dispatch => {
  // remove token in the localStorage
  localStorage.removeItem("jwtToken");
  setJwtToken(false);

  alert("Your session has expired. Please log in again!");

  // no currently logged in user
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};
