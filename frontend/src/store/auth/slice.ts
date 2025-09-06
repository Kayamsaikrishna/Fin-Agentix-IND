// src/store/auth/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phoneNumber: string;
  aadhaarVerified?: boolean;
  panVerified?: boolean;
  kycStatus?: 'pending' | 'verified' | 'rejected';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  requiresMFA: boolean;
  sessionToken: string | null;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  requiresMFA: false,
  sessionToken: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
      state.requiresMFA = false;
      state.sessionToken = null;
      
      // Save to localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('userRole', action.payload.user.role);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    requireMFA: (state, action: PayloadAction<{ sessionToken: string }>) => {
      state.loading = false;
      state.requiresMFA = true;
      state.sessionToken = action.payload.sessionToken;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.requiresMFA = false;
      state.sessionToken = null;
      
      // Clear localStorage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  requireMFA, 
  logoutSuccess, 
  clearError 
} = authSlice.actions;

export default authSlice.reducer;
