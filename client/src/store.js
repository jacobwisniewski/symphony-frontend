import createHistory from "history/createBrowserHistory";
import { createStore } from "redux";
import { connectRouter } from "connected-react-router";
<<<<<<< HEAD
import combineReducers from './modules/index.js' // Import root reducer from modules/index.js
=======
import rootReducer from "./modules"; // Import root reducer from modules/index.js
>>>>>>> f945c423d25a92f94846a16afe6447a0eab181c4

// Create a history object. source:https://github.com/ReactTraining/history
export const history = createHistory();

// Create a store that holds the state tree, this is exporting our "store"
export default createStore(
  connectRouter(history)(rootReducer), // Reducer with router state
  {}
);
// Some sources:
// https://github.com/supasate/connected-react-router
// https://github.com/notrab/create-react-app-redux/tree/master/src Used this for reference
// https://redux.js.org/api/createstore

// TODO: Create reducer
