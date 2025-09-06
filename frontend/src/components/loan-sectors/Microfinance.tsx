
import React from 'react';
import { useTranslation } from 'react-i18next';

const Microfinance: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{t('loan_sectors.microfinance')}</h2>
      {/* Add microfinance details */}
    </div>
  );
};

export default Microfinance;
