import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from './userSlices'



const rootReducer = combineReducers({
 user : userReducer
})


const persistconfig = {
  key : 'root',
  storage
}

const persistedReducer = persistReducer(persistconfig,rootReducer)

export const store  = configureStore({
  reducer : persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persitor = persistStore(store)
