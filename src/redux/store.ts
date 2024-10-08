  import { configureStore, combineReducers } from "@reduxjs/toolkit";
  import { persistReducer, persistStore } from "redux-persist";
  import storage from "redux-persist/lib/storage";
  import userReducer from "./userSlices";
  import notificationReducer from '../redux/features/notificationSlices'

  const rootReducer = combineReducers({
    user: userReducer,
    notifications : notificationReducer
  });

  const persistconfig = {
    key: "root",
    storage,
  };

  const persistedReducer = persistReducer(persistconfig, rootReducer);

  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  export const persistor = persistStore(store);

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;