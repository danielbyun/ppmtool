import axios from "axios";

const setJwtToken = token => {
  // putting the token information and setting it to the Authorization like we did manually on POSTman
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setJwtToken;
