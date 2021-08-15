import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// todo remove cyclic dep
// eslint-disable-next-line import/no-cycle
import { exchangeSlice } from "./slices/exchange";

export const rootReducer = combineReducers({
  [exchangeSlice.name]: exchangeSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const configureAppStore = ({
  initialState,
  persist = false,
}: {
  initialState?: RootState;
  persist?: boolean;
}) => {
  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };

  const reducer = persist
    ? persistReducer(persistConfig, rootReducer)
    : rootReducer;

  const store = configureStore({
    reducer: reducer as typeof rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  const persistor = persistStore(store);

  return { store, persistor };
};
