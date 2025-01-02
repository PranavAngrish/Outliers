import { configureStore , combineReducers} from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import { persistStore, persistReducer } from 'redux-persist';
import vendorReducer from './vendorSlice.js'
import storage from 'redux-persist/lib/storage';
import snackbarReducer from "./snackbarSlice";

const rootReducer = combineReducers({
    user: userReducer,
    vendor: vendorReducer,
    snackbar : snackbarReducer
  });

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
});


export const persistor = persistStore(store);