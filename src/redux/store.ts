import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ipInfoApi } from "./api/userIpInfo";
import searchHistoryReducer from "./slices/searchHistory";
import lastSearchDetailsReducer from "./slices/lastSearchDetails";
import openMenuReducer from "./slices/openMenu";
import storage from "redux-persist/lib/storage/session";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const reducers = combineReducers({
  [ipInfoApi.reducerPath]: ipInfoApi.reducer,
  searchHistory: searchHistoryReducer,
  lastSearchDetails: lastSearchDetailsReducer,
  openMenu: openMenuReducer,
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
