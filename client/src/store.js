import createHistory from "history/createBrowserHistory";
import { createStore, applyMiddleware } from "redux";
import { connectRouter } from "connected-react-router";
import thunk from "redux-thunk";
import rootReducer from "./modules"; // Import root reducer from modules/index.js

// Create a history object. source:https://github.com/ReactTraining/history
export const history = createHistory();

// Check localStorage and check whether previous store is available
const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}

// Create a store that holds the state tree, this is exporting our "store"
export default function configureStore(initialState = persistedState) {
  return createStore(
    connectRouter(history)(rootReducer),
    applyMiddleware(thunk)
  );
}

// Some sources:
// https://github.com/supasate/connected-react-router
// https://github.com/notrab/create-react-app-redux/tree/master/src Used this for reference
// https://redux.js.org/api/createstore

// TODO: Create reducer
