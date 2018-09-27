import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./containers/app/app.js";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history }from "./store.js";

const target = document.querySelector("#root");

// Create a store using configureStore()
const store = configureStore()

// Save the store within localStorage
store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
);
