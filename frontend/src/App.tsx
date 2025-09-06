
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import Dashboard from './components/dashboard/Dashboard';
import LoanApplication from './components/dashboard/LoanApplication';
import LoanStatus from './components/dashboard/LoanStatus';
import UserList from './components/admin/UserList';
import LoanList from './components/admin/LoanList';
import AgriLoan from './components/loan-sectors/AgriLoan';
import BusinessLoan from './components/loan-sectors/BusinessLoan';
import CreditCard from './components/loan-sectors/CreditCard';
import EducationLoan from './components/loan-sectors/EducationLoan';
import GoldLoan from './components/loan-sectors/GoldLoan';
import HealthcareLoan from './components/loan-sectors/HealthcareLoan';
import HomeLoan from './components/loan-sectors/HomeLoan';
import Microfinance from './components/loan-sectors/Microfinance';
import PersonalLoan from './components/loan-sectors/PersonalLoan';
import VehicleLoan from './components/loan-sectors/VehicleLoan';
import Loader from './components/common/Loader';

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<Loader fullScreen />}>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>

          <Route path="/" element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="apply-loan" element={<LoanApplication />} />
            <Route path="loan-status" element={<LoanStatus />} />
            <Route path="users" element={<UserList />} />
            <Route path="loans" element={<LoanList />} />
            <Route path="agri-loan" element={<AgriLoan />} />
            <Route path="business-loan" element={<BusinessLoan />} />
            <Route path="credit-card" element={<CreditCard />} />
            <Route path="education-loan" element={<EducationLoan />} />
            <Route path="gold-loan" element={<GoldLoan />} />
            <Route path="healthcare-loan" element={<HealthcareLoan />} />
            <Route path="home-loan" element={<HomeLoan />} />
            <Route path="microfinance" element={<Microfinance />} />
            <Route path="personal-loan" element={<PersonalLoan />} />
            <Route path="vehicle-loan" element={<VehicleLoan />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </I18nextProvider>
  );
};

export default App;
