import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";

import authReducer from "./slice/authSlice";

const storage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key));
  },

  setItem: (key, value) => {
    localStorage.setItem(key, value);

    return Promise.resolve(true);
  },

  removeItem: (key) => {
    localStorage.removeItem(key);

    return Promise.resolve();
  },
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: "root",

  storage,

  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
