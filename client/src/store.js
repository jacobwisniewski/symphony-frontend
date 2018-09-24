import createHistory from "history/createBrowserHistory"
import { createStore } from "redux"
import { connectRouter } from "connected-react-router";
import combineReducers from './modules/index.js' // Import root reducer from modules/index.js

// Create a history object. source:https://github.com/ReactTraining/history 
export const history = createHistory()


// Initialize state (this can contain what you initially want in your state)
const initialState = {}

// Create a store that holds the state tree, this is exporting our "store"
export default createStore(
    connectRouter(history)(combineReducers), // Reducer with router state 
    initialState
)
// Some sources:
// https://github.com/supasate/connected-react-router
// https://github.com/notrab/create-react-app-redux/tree/master/src Used this for reference
// https://redux.js.org/api/createstore

// TODO: Create reducer 