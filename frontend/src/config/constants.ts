// src/config/constants.ts

// API URL configuration
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Authentication constants
export const AUTH_TOKEN_KEY = 'token';
export const USER_DATA_KEY = 'user';
export const IS_AUTHENTICATED_KEY = 'isAuthenticated';
export const USER_ROLE_KEY = 'userRole';

// Session timeout (in milliseconds)
export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

// OTP expiration time (in seconds)
export const OTP_EXPIRATION_TIME = 300; // 5 minutes

// Maximum login attempts before account lock
export const MAX_LOGIN_ATTEMPTS = 5;

// Account lock duration (in seconds)
export const ACCOUNT_LOCK_DURATION = 300; // 5 minutes
