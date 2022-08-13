import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ipInfoApi } from "./api/userIpInfo";
import todosReducer from "./slices/todo";
import storage from "redux-persist/lib/storage/session";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const reducers = combineReducers({
  [ipInfoApi.reducerPath]: ipInfoApi.reducer,
  todos: todosReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
    }).concat(ipInfoApi.middleware),
});

setupListeners(store.dispatch);
