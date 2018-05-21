import React from "react";
import { Route, Router } from "react-router";

import createHistory from "history/createMemoryHistory";
import createStore from "./src/store";
import { Provider } from "react-redux";
import App from "./src/components/App";

const history = createHistory();
const store = createStore(history);

const app = () => (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

export default app;
