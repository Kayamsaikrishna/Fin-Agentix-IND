
import React from 'react';

interface Scheme {
  id: number;
  name: string;
  description: string;
  interestRate: string;
  maxLoanAmount: string;
  eligibility: string;
}

interface LoanSchemeProps {
  scheme: Scheme;
}

const LoanScheme: React.FC<LoanSchemeProps> = ({ scheme }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">{scheme.name}</h2>
      <p className="text-gray-600 mb-4">{scheme.description}</p>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-gray-500">Interest Rate</p>
          <p className="font-bold">{scheme.interestRate}</p>
        </div>
        <div>
          <p className="text-gray-500">Max Loan Amount</p>
          <p className="font-bold">{scheme.maxLoanAmount}</p>
        </div>
      </div>
      <div>
        <p className="text-gray-500">Eligibility</p>
        <p className="font-bold">{scheme.eligibility}</p>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-6">Apply Now</button>
    </div>
  );
};

export default LoanScheme;
