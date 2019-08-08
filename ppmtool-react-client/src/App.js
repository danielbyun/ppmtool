import React, { Component } from "react";
import "./App.css";
import Dashboard from "./Components/dashboard";
import Header from "./Components/Layout/header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./Components/Project/addProject";
import { Provider } from "react-redux"; // for the store
import store from "./Store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addProject" component={AddProject} />
          </div>
        </Router>
      </Provider>
    );
  }
}

// setup store

export default App;
