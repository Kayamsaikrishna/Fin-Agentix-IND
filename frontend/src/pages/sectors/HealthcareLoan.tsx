
import React from 'react';
import LoanScheme from '../../components/LoanScheme';
import { healthcareLoanSchemes } from '../../data/schemes';

const HealthcareLoan: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Healthcare Loans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {healthcareLoanSchemes.map((scheme) => (
          <LoanScheme key={scheme.id} scheme={scheme} />
        ))}
      </div>
    </div>
  );
};

export default HealthcareLoan;
