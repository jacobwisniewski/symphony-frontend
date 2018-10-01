import { combineReducers } from "redux";
import login from "./login";
import callback from "./callback";
import profile from "./profile"
// This is where we can import reducers from this folder

export default combineReducers({
  login,
  callback,
  profile
  // Where we can stick our reducers in to create a root reducer
});
