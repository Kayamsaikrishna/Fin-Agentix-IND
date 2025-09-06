
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LoanForm: React.FC = () => {
  const { t } = useTranslation();
  const [borrower, setBorrower] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{t('loan_form.title')}</h2>
      <div className="mb-4">
        <label className="block text-gray-700">{t('loan_form.borrower')}</label>
        <input
          type="text"
          value={borrower}
          onChange={(e) => setBorrower(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">{t('loan_form.amount')}</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        {t('loan_form.save')}
      </button>
    </form>
  );
};

export default LoanForm;
