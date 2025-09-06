// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import loanReducer from './slices/loanSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loans: loanReducer,
    // Add other reducers here as needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
