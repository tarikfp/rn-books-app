import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { reduxStorage } from '~utils/mmkv-storage';
import { default as savedBooksReducer } from './saved-books-slice';
import { searchBooksApi } from './search-books/search-books-slice';
import { default as userSettingsReducer } from './user-settings-slice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: reduxStorage,
  timeout: 0,
  whitelist: ['savedBooks', 'userSettings'],
};

const rootReducer = combineReducers({
  [searchBooksApi.reducerPath]: searchBooksApi.reducer,
  savedBooks: savedBooksReducer,
  userSettings: userSettingsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(searchBooksApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
