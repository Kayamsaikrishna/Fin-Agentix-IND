import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Support from './pages/Support';
import Loans from './pages/Loans';
import LoanApplication from './pages/LoanApplication';
import MyApplications from './pages/MyApplications';
import AdminDashboard from './pages/admin/AdminDashboard';
import SchemeManagement from './pages/admin/SchemeManagement';
import CreateScheme from './pages/admin/CreateScheme';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/support" element={<Support />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            
            {/* User routes */}
            <Route path="loans/apply" element={<LoanApplication />} />
            <Route path="loans/my-applications" element={<MyApplications />} />
            <Route path="documents" element={<div>Documents page coming soon</div>} />
            <Route path="calculator" element={<div>EMI Calculator coming soon</div>} />
            
            {/* Admin routes */}
            <Route path="admin/dashboard" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="admin/schemes" element={
              <ProtectedRoute requiredRole="admin">
                <SchemeManagement />
              </ProtectedRoute>
            } />
            <Route path="admin/schemes/create" element={
              <ProtectedRoute requiredRole="admin">
                <CreateScheme />
              </ProtectedRoute>
            } />
            <Route path="admin/users" element={
              <ProtectedRoute requiredRole="admin">
                <div>User Management coming soon</div>
              </ProtectedRoute>
            } />
            <Route path="admin/loans" element={
              <ProtectedRoute requiredRole="admin">
                <div>Loan Management coming soon</div>
              </ProtectedRoute>
            } />
            <Route path="admin/analytics" element={
              <ProtectedRoute requiredRole="admin">
                <div>Analytics coming soon</div>
              </ProtectedRoute>
            } />
            <Route path="admin/compliance" element={
              <ProtectedRoute requiredRole="admin">
                <div>Compliance Center coming soon</div>
              </ProtectedRoute>
            } />
            <Route path="admin/sectors/*" element={
              <ProtectedRoute requiredRole="admin">
                <div>Sector Management coming soon</div>
              </ProtectedRoute>
            } />
          </Route>
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;