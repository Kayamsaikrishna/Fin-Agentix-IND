
import React from 'react';
import { useTranslation } from 'react-i18next';

const BusinessLoan: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{t('loan_sectors.business_loan')}</h2>
      {/* Add business loan details */}
    </div>
  );
};

export default BusinessLoan;
