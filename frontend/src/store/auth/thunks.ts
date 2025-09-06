// src/store/auth/thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService, LoginCredentials, MFAVerification, RegistrationData } from '../../services/auth';
import { loginStart, loginSuccess, loginFailure, requireMFA, logoutSuccess } from './slice';
import { AppDispatch } from '../index';

// Login thunk
export const login = (credentials: LoginCredentials) => async (dispatch: AppDispatch) => {
  try {
    dispatch(loginStart());
    const response = await authService.login(credentials);
    
    if (response.success) {
      if (response.requiresMFA) {
        // If MFA is required, set the session token and update state
        dispatch(requireMFA({ sessionToken: response.sessionToken }));
        return { success: true, requiresMFA: true, message: response.message };
      } else {
        // If login is successful and no MFA required
        dispatch(loginSuccess({ token: response.token, user: response.user }));
        return { success: true, requiresMFA: false };
      }
    } else {
      dispatch(loginFailure(response.message || 'Login failed'));
      return { success: false, message: response.message };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    dispatch(loginFailure(errorMessage));
    return { success: false, message: errorMessage };
  }
};

// Verify MFA thunk
export const verifyMFA = (verification: MFAVerification) => async (dispatch: AppDispatch) => {
  try {
    dispatch(loginStart());
    const response = await authService.verifyMFA(verification);
    
    if (response.success) {
      dispatch(loginSuccess({ token: response.token, user: response.user }));
      return { success: true };
    } else {
      dispatch(loginFailure(response.message || 'MFA verification failed'));
      return { success: false, message: response.message };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    dispatch(loginFailure(errorMessage));
    return { success: false, message: errorMessage };
  }
};

// Register thunk
export const register = (data: RegistrationData) => async (dispatch: AppDispatch) => {
  try {
    const response = await authService.register(data);
    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, message: errorMessage };
  }
};

// Forgot password thunk
export const forgotPassword = (email: string) => async () => {
  try {
    const response = await authService.forgotPassword(email);
    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, message: errorMessage };
  }
};

// Reset password thunk
export const resetPassword = (token: string, newPassword: string) => async () => {
  try {
    const response = await authService.resetPassword(token, newPassword);
    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, message: errorMessage };
  }
};

// Logout thunk
export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await authService.logout();
    dispatch(logoutSuccess());
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, message: errorMessage };
  }
};
