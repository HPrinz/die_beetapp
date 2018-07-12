import { applyMiddleware, compose, createStore, Middleware } from "redux";

import reducers, { RootState } from "../reducers";
import { setLocation } from "../actions/setLocation";

export default (
  history: any,
  initialState = { garden: {}, location: {} } as RootState
) => {
  const middlewares: Middleware[] = [];

  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middlewares))
  );

  store.dispatch(
    setLocation(initialState.location.location || history.location)
  );
  // history.listen(location => store.dispatch(setLocation(location)));

  return store;
};
