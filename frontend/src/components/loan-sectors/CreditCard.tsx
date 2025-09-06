
import React from 'react';
import { useTranslation } from 'react-i18next';

const CreditCard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{t('loan_sectors.credit_card')}</h2>
      {/* Add credit card details */}
    </div>
  );
};

export default CreditCard;
