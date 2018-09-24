import { combineReducers } from "redux";
import todos from './todos'
// This is where we can import reducers from this folder

// Haven't added a rootReducer yet
export default combineReducers({
    todos
  // Where we can stick our reducers in to create a root reducer
});
