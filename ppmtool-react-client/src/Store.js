import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Reducers";

// initial state of the application
const initialState = {};

// middleware
const middleware = [thunk];

// store
let store;

const ReactReduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

if (window.navigator.userAgent.includes("Chrome") && ReactReduxDevTools) {
  store = createStore(
    rootReducer,
    initialState,
    // this way if we add more middlewares in the above array, it'll automatically update
    compose(
      applyMiddleware(...middleware),
      ReactReduxDevTools
    )
  );
} else {
  // in other browsers other than chrome
  store = createStore(
    rootReducer,
    initialState,
    // this way if we add more middlewares in the above array, it'll automatically update
    compose(applyMiddleware(...middleware))
  );
}

export default store;
