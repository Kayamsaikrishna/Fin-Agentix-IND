
import React from 'react';
import LoanScheme from '../../components/LoanScheme';
import { agriLoanSchemes } from '../../data/schemes';

const AgriLoan: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Agricultural Loans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agriLoanSchemes.map((scheme) => (
          <LoanScheme key={scheme.id} scheme={scheme} />
        ))}
      </div>
    </div>
  );
};

export default AgriLoan;
