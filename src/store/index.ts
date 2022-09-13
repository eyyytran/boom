import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import subscriberSlice from "./subscriberSlice";
import artboardSlice from "./artboardSlice";

const rootReducer = combineReducers({
  subscriber: subscriberSlice.reducer,
  artboard: artboardSlice.reducer,
});

const persistConfig = {
  key: "persistedReducer",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger],
});

export type RootState = ReturnType<typeof store.getState>;
