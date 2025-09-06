
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowRight } from 'react-icons/fi';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{t('dashboard.account_summary')}</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">{t('dashboard.account_number')}</p>
              <p className="font-bold text-lg">1234567890</p>
            </div>
            <div>
              <p className="text-gray-600">{t('dashboard.balance')}</p>
              <p className="font-bold text-lg">₹ 1,00,000</p>
            </div>
          </div>
          <Link to="/profile" className="inline-flex items-center mt-4 text-blue-500 hover:underline">
            {t('dashboard.view_details')} <FiArrowRight className="ml-1" />
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{t('dashboard.recent_transactions')}</h2>
          <ul>
            <li className="flex justify-between py-2 border-b">
              <span>{t('dashboard.transaction_1')}</span>
              <span className="text-green-500">+ ₹ 5,000</span>
            </li>
            <li className="flex justify-between py-2 border-b">
              <span>{t('dashboard.transaction_2')}</span>
              <span className="text-red-500">- ₹ 2,000</span>
            </li>
            <li className="flex justify-between py-2">
              <span>{t('dashboard.transaction_3')}</span>
              <span className="text-green-500">+ ₹ 1,500</span>
            </li>
          </ul>
          <Link to="/transactions" className="inline-flex items-center mt-4 text-blue-500 hover:underline">
            {t('dashboard.view_all')} <FiArrowRight className="ml-1" />
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{t('dashboard.loan_overview')}</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">{t('dashboard.active_loans')}</p>
              <p className="font-bold text-lg">2</p>
            </div>
            <div>
              <p className="text-gray-600">{t('dashboard.total_borrowed')}</p>
              <p className="font-bold text-lg">₹ 5,00,000</p>
            </div>
          </div>
          <Link to="/my-loans" className="inline-flex items-center mt-4 text-blue-500 hover:underline">
            {t('dashboard.manage_loans')} <FiArrowRight className="ml-1" />
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">{t('dashboard.loan_sectors')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/agri-loan" className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-gray-100">
            <h3 className="text-xl font-bold">{t('loan_sectors.agri_loan')}</h3>
          </Link>
          <Link to="/business-loan" className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-gray-100">
            <h3 className="text-xl font-bold">{t('loan_sectors.business_loan')}</h3>
          </Link>
          <Link to="/credit-card" className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-gray-100">
            <h3 className="text-xl font-bold">{t('loan_sectors.credit_card')}</h3>
          </Link>
          <Link to="/education-loan" className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-gray-100">
            <h3 className="text-xl font-bold">{t('loan_sectors.education_loan')}</h3>
          </Link>
          <Link to="/gold-loan" className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-gray-100">
            <h3 className="text-xl font-bold">{t('loan_sectors.gold_loan')}</h3>
          </Link>
          <Link to="/healthcare-loan" className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-gray-100">
            <h3 className="text-xl font-bold">{t('loan_sectors.healthcare_loan')}</h3>
          </Link>
          <Link to="/home-loan" className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-gray-100">
            <h3 className="text-xl font-bold">{t('loan_sectors.home_loan')}</h3>
          </Link>
          <Link to="/microfinance" className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-gray-100">
            <h3 className="text-xl font-bold">{t('loan_sectors.microfinance')}</h3>
          </Link>
          <Link to="/personal-loan" className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-gray-100">
            <h3 className="text-xl font-bold">{t('loan_sectors.personal_loan')}</h3>
          </Link>
          <Link to="/vehicle-loan" className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-gray-100">
            <h3 className="text-xl font-bold">{t('loan_sectors.vehicle_loan')}</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
