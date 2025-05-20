// 


'use client';

import { configureStore } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux';

import authReducer from './slices/authSlice';
import projectsReducer from './slices/projectsSlice';
import bidsReducer from './slices/bidsSlice';
import uiReducer from './slices/uiSlice';

// Configure persist options for each reducer
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token'], // only user and token will be persisted
};

// Root reducer with persistence
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  projects: projectsReducer,
  bids: bidsReducer,
  ui: uiReducer,
});

// Configure the store with the persisted reducer
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;