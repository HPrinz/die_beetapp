import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Route, Router } from "react-router";

import createHistory from "history/createMemoryHistory";
import { NativeRouter, Link } from "react-router-native";
import { BrowserRouter } from "react-router-dom";
import createStore from "./src/store";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MainView } from "./src/components/MainView";
import Hello from "./src/components/Hello";

const history = createHistory();
const store = createStore(history);

const app = () => (
  <Provider store={store}>
    <Router history={history}>
      <Hello />
    </Router>
  </Provider>
);

export default app;
