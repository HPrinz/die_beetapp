import { applyMiddleware, compose, createStore, Middleware } from "redux";

import reducers, { RootState } from "../reducers";
import { defaultGardenState } from "../reducers/garden";
import { defaultState } from "../reducers/task";

export default (
  history: any,
  initialState = { garden: defaultGardenState, task: defaultState } as RootState
) => {
  const middlewares: Middleware[] = [];

  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middlewares))
  );

  return store;
};
