// src/config/routes.ts

export interface Route {
  path: string;
  label: string;
  icon?: string;
  requiresAuth?: boolean;
  roles?: ('user' | 'admin')[];
}

export const publicRoutes: Route[] = [
  {
    path: '/register',
    label: 'Register',
  },
  {
    path: '/login',
    label: 'Login',
  },
  {
    path: '/forgot-password',
    label: 'Forgot Password',
  },
];

export const userRoutes: Route[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    requiresAuth: true,
    roles: ['user'],
  },
  {
    path: '/profile',
    label: 'Profile',
    requiresAuth: true,
    roles: ['user'],
  },
  {
    path: '/loans',
    label: 'My Loans',
    requiresAuth: true,
    roles: ['user'],
  },
  {
    path: '/apply',
    label: 'Apply for Loan',
    requiresAuth: true,
    roles: ['user'],
  },
  {
    path: '/documents',
    label: 'Documents',
    requiresAuth: true,
    roles: ['user'],
  },
  {
    path: '/kyc',
    label: 'KYC Verification',
    requiresAuth: true,
    roles: ['user'],
  },
];

export const adminRoutes: Route[] = [
  {
    path: '/admin/dashboard',
    label: 'Admin Dashboard',
    requiresAuth: true,
    roles: ['admin'],
  },
  {
    path: '/admin/loans',
    label: 'Loan Management',
    requiresAuth: true,
    roles: ['admin'],
  },
  {
    path: '/admin/users',
    label: 'User Management',
    requiresAuth: true,
    roles: ['admin'],
  },
  {
    path: '/admin/schemes',
    label: 'Loan Schemes',
    requiresAuth: true,
    roles: ['admin'],
  },
  {
    path: '/admin/reports',
    label: 'Reports',
    requiresAuth: true,
    roles: ['admin'],
  },
];

export const allRoutes = [...publicRoutes, ...userRoutes, ...adminRoutes];

export default allRoutes;
