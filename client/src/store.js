import createHistory from "history/createBrowserHistory"
import { createStore } from "redux"
import { connectRouter } from "connected-react-router";
import { rootReducer } from './modules' // Import root reducer from modules/index.js

// Create a history object. source:https://github.com/ReactTraining/history 
export const history = createHistory()

// Initialize state (this can contain what you initially want in your state)
const initialState = {}

// Create a store that holds the state tree, this is exporting our "store"
export default createStore(
    connectRouter(history)(rootReducer), // Reducer with router state 
    initialState = {}
)

// TODO: Create reducer 