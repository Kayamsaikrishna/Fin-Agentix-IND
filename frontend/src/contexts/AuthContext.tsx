import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState, LoginCredentials, RegisterData } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction = 
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'CLEAR_ERROR' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return { 
        ...state, 
        isLoading: false, 
        isAuthenticated: true, 
        user: action.payload, 
        error: null 
      };
    case 'AUTH_FAILURE':
      return { 
        ...state, 
        isLoading: false, 
        isAuthenticated: false, 
        user: null, 
        error: action.payload 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        isAuthenticated: false, 
        user: null, 
        error: null,
        isLoading: false
      };
    case 'UPDATE_USER':
      return { 
        ...state, 
        user: state.user ? { ...state.user, ...action.payload } : null 
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for stored authentication on app load
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('fin_agentix_token');
        const storedUser = localStorage.getItem('fin_agentix_user');
        
        if (token && storedUser) {
          const user = JSON.parse(storedUser);
          // Validate token with backend
          // For now, we'll trust the stored data
          dispatch({ type: 'AUTH_SUCCESS', payload: user });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('fin_agentix_token');
        localStorage.removeItem('fin_agentix_user');
        dispatch({ type: 'LOGOUT' });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate different responses based on credentials
      if (credentials.email === 'admin@fin-agentix.com' && credentials.password === 'admin123') {
        const adminUser: User = {
          id: 'admin_001',
          email: credentials.email,
          fullName: 'Admin User',
          phone: '+91 9876543210',
          role: 'admin',
          profileComplete: true,
          kycStatus: 'verified',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          organizationDetails: {
            type: 'fintech',
            name: 'Fin-Agentix India',
            registrationNumber: 'U65999MH2023PTC123456',
            address: {
              addressLine1: 'Tech Park, Bandra Kurla Complex',
              city: 'Mumbai',
              state: 'Maharashtra',
              pincode: '400051',
              country: 'India'
            },
            designation: 'System Administrator',
            workEmail: 'admin@fin-agentix.com',
            verificationStatus: 'verified',
            permissions: ['all']
          }
        };
        
        const token = 'mock_admin_token_' + Date.now();
        localStorage.setItem('fin_agentix_token', token);
        localStorage.setItem('fin_agentix_user', JSON.stringify(adminUser));
        dispatch({ type: 'AUTH_SUCCESS', payload: adminUser });
      } else if (credentials.email && credentials.password) {
        const user: User = {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          email: credentials.email,
          fullName: 'John Doe',
          phone: '+91 9876543210',
          role: 'user',
          profileComplete: false,
          kycStatus: 'pending',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };

        const token = 'mock_user_token_' + Date.now();
        localStorage.setItem('fin_agentix_token', token);
        localStorage.setItem('fin_agentix_user', JSON.stringify(user));
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: (error as Error).message });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('fin_agentix_token');
    localStorage.removeItem('fin_agentix_user');
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (userData: RegisterData) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const user: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: userData.email,
        fullName: userData.fullName,
        phone: userData.phone,
        role: userData.role,
        profileComplete: false,
        kycStatus: 'pending',
        createdAt: new Date().toISOString(),
        aadhaarNumber: userData.aadhaarNumber,
        panNumber: userData.panNumber,
        dateOfBirth: userData.dateOfBirth,
        address: userData.address,
        employmentDetails: userData.userType ? {
          type: userData.userType,
          monthlyIncome: parseInt(userData.monthlyIncome?.split('-')[0] || '0')
        } : undefined,
        organizationDetails: userData.organizationDetails as OrganizationDetails
      };

      const token = 'mock_token_' + Date.now();
      localStorage.setItem('fin_agentix_token', token);
      localStorage.setItem('fin_agentix_user', JSON.stringify(user));
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: (error as Error).message });
      throw error;
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...profileData };
      localStorage.setItem('fin_agentix_user', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_USER', payload: profileData });
    }
  };

  const refreshUser = async () => {
    // TODO: Implement user refresh from API
    console.log('Refreshing user data...');
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        updateProfile,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};