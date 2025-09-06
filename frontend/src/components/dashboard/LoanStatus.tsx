import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getLoans, Loan } from '../../api/mock';

const LoanStatus: React.FC = () => {
  const { t } = useTranslation();
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    const fetchLoans = async () => {
      const loanData = await getLoans();
      setLoans(loanData);
    };
    fetchLoans();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{t('loan_status.title')}</h2>
      <ul>
        {loans.map(loan => (
          <li key={loan.id} className="flex justify-between items-center py-2 border-b">
            <span>{loan.id} - {loan.borrower}</span>
            <span>{t(`loan_status.status.${loan.status}`)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanStatus;
