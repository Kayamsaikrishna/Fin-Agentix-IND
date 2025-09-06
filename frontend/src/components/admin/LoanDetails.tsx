
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLoanDetails, LoanDetails as LoanDetailsType } from '../../api/mock';

const LoanDetails: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [loan, setLoan] = useState<LoanDetailsType | null>(null);

  useEffect(() => {
    if (id) {
      const fetchLoanDetails = async () => {
        const loanData = await getLoanDetails(id);
        setLoan(loanData);
      };
      fetchLoanDetails();
    }
  }, [id]);

  if (!loan) {
    return <div>{t('loading')}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">
        {t('loan_details.title')}: {loan.id}
      </h2>
      {/* Display loan details */}
    </div>
  );
};

export default LoanDetails;
