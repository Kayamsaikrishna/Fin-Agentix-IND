
import React from 'react';
import { useTranslation } from 'react-i18next';

const AgriLoan: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{t('loan_sectors.agri_loan')}</h2>
      {/* Add agricultural loan details */}
    </div>
  );
};

export default AgriLoan;
