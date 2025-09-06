
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Register: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-900">{t('register.title')}</h1>
      {/* Registration form */}
      <p className="text-center">
        {t('register.already_have_account')}{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          {t('register.login')}
        </Link>
      </p>
    </div>
  );
};

export default Register;
