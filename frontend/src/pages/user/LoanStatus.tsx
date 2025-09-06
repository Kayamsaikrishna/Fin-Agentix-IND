import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLoanDetails } from '../../api/mock';
import { LoanDetails } from '../../types/loan';

const LoanStatusPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loan, setLoan] = useState<LoanDetails | null>(null);

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
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Loan Status: {loan.id}</h1>
        {/* Loan status content */}
      </div>
    </div>
  );
};

export default LoanStatusPage;
