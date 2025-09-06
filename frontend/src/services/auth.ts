// src/services/auth.ts
import axios from 'axios';
import { API_URL } from '../config/constants';

const AUTH_API = `${API_URL}/auth`;

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface MFAVerification {
  email: string;
  otp: string;
  sessionToken: string;
}

export interface RegistrationData {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  userType: 'user' | 'admin';
  // Additional fields based on registration steps
  [key: string]: any;
}

// For demo purposes, we'll simulate API calls
const simulateApiCall = async <T>(endpoint: string, data: any, delay = 1000): Promise<T> => {
  await new Promise(resolve => setTimeout(resolve, delay));
  console.log(`API call to ${endpoint} with data:`, data);
  return data as unknown as T;
};

export const authService = {
  // Login with email and password
  login: async (credentials: LoginCredentials) => {
    try {
      // In a real app, this would be an actual API call
      // const response = await axios.post(`${AUTH_API}/login`, credentials);
      // return response.data;
      
      // Simulate API response
      if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
        return {
          success: true,
          requiresMFA: true,
          sessionToken: 'temp-session-token-123',
          message: 'Please verify your identity with the OTP sent to your registered mobile number.'
        };
      } else if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
        return {
          success: true,
          requiresMFA: true,
          sessionToken: 'temp-session-token-456',
          message: 'Please verify your identity with the OTP sent to your registered mobile number.'
        };
      } else if (credentials.email === 'test@example.com' && credentials.password === 'test123') {
        return {
          success: true,
          token: 'jwt-token-789',
          user: {
            id: '123',
            name: 'Test User',
            email: 'test@example.com',
            role: 'user',
            phoneNumber: '+91-98765-43210',
            aadhaarVerified: true,
            panVerified: true,
            kycStatus: 'verified'
          }
        };
      }
      
      return {
        success: false,
        message: 'Invalid credentials'
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Verify MFA (OTP)
  verifyMFA: async (verification: MFAVerification) => {
    try {
      // In a real app, this would be an actual API call
      // const response = await axios.post(`${AUTH_API}/verify-mfa`, verification);
      // return response.data;
      
      // Simulate API response
      if (verification.otp.length === 6 && /^\d+$/.test(verification.otp)) {
        const isAdmin = verification.email === 'admin@example.com';
        return {
          success: true,
          token: isAdmin ? 'admin-jwt-token-123' : 'user-jwt-token-456',
          user: {
            id: isAdmin ? 'admin-123' : 'user-456',
            name: isAdmin ? 'Admin User' : 'Regular User',
            email: verification.email,
            role: isAdmin ? 'admin' : 'user',
            phoneNumber: '+91-98765-43210',
            aadhaarVerified: true,
            panVerified: true,
            kycStatus: 'verified'
          }
        };
      }
      
      return {
        success: false,
        message: 'Invalid OTP'
      };
    } catch (error) {
      console.error('MFA verification error:', error);
      throw error;
    }
  },

  // Register new user
  register: async (data: RegistrationData) => {
    try {
      // In a real app, this would be an actual API call
      // const response = await axios.post(`${AUTH_API}/register`, data);
      // return response.data;
      
      // Simulate API response
      return await simulateApiCall<{ success: boolean; message: string }>(
        '/register',
        {
          success: true,
          message: 'Registration successful! Please login.'
        },
        1500
      );
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Forgot password
  forgotPassword: async (email: string) => {
    try {
      // In a real app, this would be an actual API call
      // const response = await axios.post(`${AUTH_API}/forgot-password`, { email });
      // return response.data;
      
      // Simulate API response
      return await simulateApiCall<{ success: boolean; message: string }>(
        '/forgot-password',
        {
          success: true,
          message: 'Password reset instructions sent to your email'
        }
      );
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  // Reset password
  resetPassword: async (token: string, newPassword: string) => {
    try {
      // In a real app, this would be an actual API call
      // const response = await axios.post(`${AUTH_API}/reset-password`, { token, newPassword });
      // return response.data;
      
      // Simulate API response
      return await simulateApiCall<{ success: boolean; message: string }>(
        '/reset-password',
        {
          success: true,
          message: 'Password reset successful! Please login with your new password.'
        }
      );
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      // In a real app, this might call the backend to invalidate the token
      // await axios.post(`${AUTH_API}/logout`);
      
      // Clear local storage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
};
