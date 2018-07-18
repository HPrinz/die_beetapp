import React from "react";

import createHistory from "history/createMemoryHistory";
import createStore from "./src/store";
import { Provider } from "react-redux";
import App from "./src/components/App";

const history = createHistory();
const store = createStore(history);

const app = () => (
  <Provider store={store}>
      <App />
  </Provider>
);

export default app;

