import { combineReducers } from "redux";
import login from "./login";
import dash from "./dash";

// This is where we can import reducers from this folder

const appReducer = combineReducers({
  login,
  dash
  // Where we can stick our reducers in to create a root reducer
});

export default (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};
