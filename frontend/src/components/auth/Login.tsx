
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();

  const handleLogin = () => {
    // Simulate admin login
    login({ id: 'admin', username: 'admin', role: 'admin' });
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-900">{t('login.title')}</h1>
      <button
        onClick={handleLogin}
        className="w-full px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        {t('login.login_as_admin')}
      </button>
      <p className="text-center">
        {t('login.no_account')}{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          {t('login.register')}
        </Link>
      </p>
    </div>
  );
};

export default Login;
