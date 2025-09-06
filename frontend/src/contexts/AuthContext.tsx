import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phoneNumber?: string;
  aadhaarVerified?: boolean;
  panVerified?: boolean;
  kycStatus?: 'pending' | 'verified' | 'rejected';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; requiresMFA?: boolean; message?: string }>;
  verifyMFA: (otp: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  register: (userData: any) => Promise<{ success: boolean; message?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message?: string }>;
  resetPassword: (token: string, newPassword: string) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
          // In a real app, you would validate the token with your backend
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        // Clear potentially corrupted auth data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate login logic for demo purposes
      if (email === 'user@example.com' && password === 'password123') {
        // Simulate MFA requirement for some users
        return { success: true, requiresMFA: true };
      } else if (email === 'admin@example.com' && password === 'admin123') {
        // Admin always requires MFA
        return { success: true, requiresMFA: true };
      } else if (email === 'test@example.com' && password === 'test123') {
        // User without MFA
        const userData: User = {
          id: '123',
          name: 'Test User',
          email: 'test@example.com',
          role: 'user',
          phoneNumber: '+91-98765-43210',
          aadhaarVerified: true,
          panVerified: true,
          kycStatus: 'verified'
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', 'fake-jwt-token');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'user');
        
        return { success: true };
      }
      
      return { success: false, message: 'Invalid credentials' };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, message: 'An error occurred during login' };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyMFA = async (otp: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would verify the OTP with your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate OTP verification (accept any 6-digit OTP for demo)
      if (otp.length === 6 && /^\d+$/.test(otp)) {
        const userData: User = {
          id: '123',
          name: 'Test User',
          email: 'user@example.com',
          role: 'user',
          phoneNumber: '+91-98765-43210',
          aadhaarVerified: true,
          panVerified: true,
          kycStatus: 'verified'
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', 'fake-jwt-token');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'user');
        
        return { success: true };
      }
      
      return { success: false, message: 'Invalid OTP' };
    } catch (error) {
      console.error('MFA verification failed:', error);
      return { success: false, message: 'An error occurred during verification' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful registration
      return { success: true, message: 'Registration successful! Please login.' };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, message: 'An error occurred during registration' };
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate password reset email sent
      return { success: true, message: 'Password reset instructions sent to your email' };
    } catch (error) {
      console.error('Forgot password request failed:', error);
      return { success: false, message: 'An error occurred while processing your request' };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate password reset
      return { success: true, message: 'Password reset successful! Please login with your new password.' };
    } catch (error) {
      console.error('Password reset failed:', error);
      return { success: false, message: 'An error occurred while resetting your password' };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    verifyMFA,
    logout,
    register,
    forgotPassword,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};