import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer";
import backlogReducer from "./backlogReducer";

export default combineReducers({
  // all the reducers we're creating
  errors: errorReducer,
  project: projectReducer,
  backlog: backlogReducer
});
