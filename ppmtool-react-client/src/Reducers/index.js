import { combineReducers } from "redux";
import errorReducer from "./errorReducer";

export default combineReducers({
  // all the reducers we're creating
  errors: errorReducer
});
