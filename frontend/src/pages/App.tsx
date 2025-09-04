// C:\Users\ragha\Downloads\fin-agentix-india\frontend\src\App.tsx (Corrected)

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Loans from './pages/Loans'; // Corrected import path
import ForgotPassword from './components/auth/ForgotPassword';
import './styles/global.css';

const App: React.FC = () => {
  return (
    // The centering classes can be removed if Loans page has its own full-page layout
    <div className="App">
      <Routes>
        {/* Redirect root to the main loans page */}
        <Route path="/" element={<Navigate to="/loans" replace />} />
        
        {/* ADD THIS LINE - The route for your Loans page */}
        <Route path="/loans" element={<Loans />} />
        
        {/* Authentication routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Catch all route - redirect to the main loans page or login */}
        <Route path="*" element={<Navigate to="/loans" replace />} />
      </Routes>
    </div>
  );
};

export default App;