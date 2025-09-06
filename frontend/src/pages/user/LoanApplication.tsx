import React, { useState } from 'react';

const LoanApplication: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 nextStep={nextStep} />;
      case 2:
        return <Step2 nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3 prevStep={prevStep} />;
      default:
        return <Step1 nextStep={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Loan Application</h1>
        {renderStep()}
      </div>
    </div>
  );
};

const Step1: React.FC<{ nextStep: () => void }> = ({ nextStep }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Step 1: Loan Details</h2>
    <form>
      {/* Form fields */}
      <button onClick={nextStep} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Next</button>
    </form>
  </div>
);

const Step2: React.FC<{ nextStep: () => void, prevStep: () => void }> = ({ nextStep, prevStep }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Step 2: Personal Information</h2>
    <form>
      {/* Form fields */}
      <div className="flex justify-between">
        <button onClick={prevStep} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400">Back</button>
        <button onClick={nextStep} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Next</button>
      </div>
    </form>
  </div>
);

const Step3: React.FC<{ prevStep: () => void }> = ({ prevStep }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Step 3: Document Upload</h2>
    <form>
      {/* Form fields */}
      <div className="flex justify-between">
        <button onClick={prevStep} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400">Back</button>
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">Submit Application</button>
      </div>
    </form>
  </div>
);

export default LoanApplication;
