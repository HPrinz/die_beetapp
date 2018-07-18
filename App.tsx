import React from "react";

import createHistory from "history/createMemoryHistory";
import createStore, { persistedReducer } from "./src/store";
import { Provider } from "react-redux";
import App from "./src/components/App";
import { PersistGate } from "redux-persist/integration/react";

const {store, persistor} = createStore();

const app = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

export default app;

