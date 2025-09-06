
import React from 'react';
import { useTranslation } from 'react-i18next';

const VehicleLoan: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{t('loan_sectors.vehicle_loan')}</h2>
      {/* Add vehicle loan details */}
    </div>
  );
};

export default VehicleLoan;
