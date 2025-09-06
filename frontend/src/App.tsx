import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import UserDashboard from './pages/user/Dashboard';
import EnhancedDashboard from './pages/user/EnhancedDashboard';
import LoanDashboard from './pages/loan-dashboard';
import LoanApplication from './pages/user/LoanApplication';
import NotFound from './pages/NotFound';
import Profile from './pages/user/Profile';
import Documents from './pages/user/Documents';
import KYC from './pages/user/KYC';
import Settings from './pages/user/Settings';
import Support from './pages/user/Support';
import { publicRoutes, userRoutes, adminRoutes } from './config/routes';
import './styles/global.css';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminLoans from './pages/admin/Loans';
import AdminUsers from './pages/admin/Users';
import AdminSchemes from './pages/admin/Schemes';
import AdminReports from './pages/admin/Reports';

// Protected route component
const ProtectedRoute = ({ children, allowedRoles = ['user', 'admin'] }) => {
  // In a real app, you would check authentication status and user role from your auth context or store
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole') || 'user';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  const location = useLocation();
  const [isAuthPage, setIsAuthPage] = useState(false);
  
  useEffect(() => {
    const authPages = ['/login', '/register', '/forgot-password'];
    setIsAuthPage(authPages.includes(location.pathname) || location.pathname === '/');
  }, [location]);
  
  return (
    <div className={`App min-h-screen ${isAuthPage ? 'flex items-center justify-center' : ''}`}>
      <Routes>
        {/* Redirect root to register */}
        <Route path="/" element={<Navigate to="/register" replace />} />
        
        {/* Authentication routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* User routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['user']}>
            <EnhancedDashboard />
          </ProtectedRoute>
        } />
        <Route path="/loans" element={
          <ProtectedRoute allowedRoles={['user']}>
            <LoanDashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute allowedRoles={['user']}>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/documents" element={
          <ProtectedRoute allowedRoles={['user']}>
            <Documents />
          </ProtectedRoute>
        } />
        <Route path="/kyc" element={
          <ProtectedRoute allowedRoles={['user']}>
            <KYC />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute allowedRoles={['user']}>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="/support" element={
          <ProtectedRoute allowedRoles={['user']}>
            <Support />
          </ProtectedRoute>
        } />
        <Route path="/apply" element={
          <ProtectedRoute allowedRoles={['user']}>
            <LoanApplication />
          </ProtectedRoute>
        } />
        
        {/* Admin routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/loans" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLoans />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminUsers />
          </ProtectedRoute>
        } />
        <Route path="/admin/schemes" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminSchemes />
          </ProtectedRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminReports />
          </ProtectedRoute>
        } />
        
        {/* Catch all route - 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
