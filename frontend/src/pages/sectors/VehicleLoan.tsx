
import React from 'react';
import LoanScheme from '../../components/LoanScheme';
import { vehicleLoanSchemes } from '../../data/schemes';

const VehicleLoan: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Vehicle Loans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vehicleLoanSchemes.map((scheme) => (
          <LoanScheme key={scheme.id} scheme={scheme} />
        ))}
      </div>
    </div>
  );
};

export default VehicleLoan;
