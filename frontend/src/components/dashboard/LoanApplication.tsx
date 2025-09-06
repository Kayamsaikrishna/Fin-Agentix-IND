import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputField from '../common/InputField';
import Button from '../common/Button';

const LoanApplication: React.FC = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle loan application submission
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{t('loan_application.title')}</h2>
      <div className="mb-4">
        <InputField
          label={t('loan_application.amount_label')}
          value={amount}
          onChange={setAmount}
          placeholder={t('loan_application.amount_placeholder')}
          required
        />
      </div>
      <div className="mb-4">
        <InputField
          label={t('loan_application.term_label')}
          value={term}
          onChange={setTerm}
          placeholder={t('loan_application.term_placeholder')}
          required
        />
      </div>
      <Button type="submit">{t('loan_application.apply_button')}</Button>
    </form>
  );
};

export default LoanApplication;
