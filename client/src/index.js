import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { history, store } from "./store.js"
import registerServiceWorker from "./registerServiceWorker";

const target = document.querySelector("#root");

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
registerServiceWorker();