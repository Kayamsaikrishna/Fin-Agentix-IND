
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import loanReducer from './slices/loanSlice';
import { loanApi } from './api/loanApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loans: loanReducer,
    [loanApi.reducerPath]: loanApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['your/action/type'],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['items.dates'],
      },
    }).concat(loanApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
