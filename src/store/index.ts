import { applyMiddleware, compose, createStore, Middleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import reducers, { RootState } from "../reducers";
import { defaultGardenState } from "../reducers/garden";
import { defaultState } from "../reducers/task";

const persistConfig = {
  key: 'beetapp',
  storage,
}

export const persistedReducer = persistReducer(persistConfig, reducers)

export default (initialState = { garden: defaultGardenState, task: defaultState } as RootState ) => {
  const middlewares: Middleware[] = [];

  const store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
  const persistor = persistStore(store)

  return { store, persistor }
};
