import React, { Component } from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Header from "./Components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProject from "./Components/Project/AddProject";
import UpdateProject from "./Components/Project/UpdateProject";
import { Provider } from "react-redux"; // for the store
import store from "./Store";
import ProjectBoard from "./Components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./Components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./Components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./Components/Layout/Landing";
import Register from "./Components/UserManagement/Register";
import Login from "./Components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJwtToken from "./SecurityUtils/setJwtToken";
import { SET_CURRENT_USER } from "./Actions/types";
import { logout } from "./Actions/securityActions";
import SecuredRoute from "./SecurityUtils/SecureRoute";

// token will be valid in the localStorage until the expiry time i assigned in the server
// so retrieve it and assign it using the setJwtToken() method I created, so that all the other Routes will be available with jwtToken in the header ["Authorization"]
const jwtToken = localStorage.getItem("jwtToken");

if (jwtToken) {
  setJwtToken(jwtToken);

  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  // exp comes from the state from the token
  // if the token is expired
  if (decoded_jwtToken.exp < currentTime) {
    // handle logout
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            {
              // Public Routes
            }

            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {
              // Private Routes
            }
            <Switch>
              <SecuredRoute exact path="/dashboard" component={Dashboard} />
              <SecuredRoute exact path="/addProject" component={AddProject} />
              <SecuredRoute
                exact
                path="/updateProject/:id"
                component={UpdateProject}
              />
              <SecuredRoute
                exact
                path="/projectBoard/:id"
                component={ProjectBoard}
              />
              <SecuredRoute
                exact
                path="/addProjectTask/:id"
                component={AddProjectTask}
              />
              <SecuredRoute
                exact
                path="/updateProjectTask/:backlog_id/:pt_id"
                component={UpdateProjectTask}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
