import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <div className="App min-h-screen flex items-center justify-center">
      <Routes>
        {/* Redirect root to register */}
        <Route path="/" element={<Navigate to="/register" replace />} />
        
        {/* Authentication routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Catch all route - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default App;
