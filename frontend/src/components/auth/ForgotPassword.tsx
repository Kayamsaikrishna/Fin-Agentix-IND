
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-900">
        {t('forgot_password.title')}
      </h1>
      {/* Forgot password form */}
      <p className="text-center">
        {t('forgot_password.remember_password')}{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          {t('forgot_password.login')}
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
