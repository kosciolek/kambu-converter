import { combineReducers, configureStore } from "@reduxjs/toolkit";
// todo remove cyclic dep
// eslint-disable-next-line import/no-cycle
import { exchangeSlice } from "./slices/exchange";

export const rootReducer = combineReducers({
  [exchangeSlice.name]: exchangeSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const configureAppStore = (initialState?: RootState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
