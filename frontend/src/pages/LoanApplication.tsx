import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  User,
  Home,
  Car,
  Briefcase,
  GraduationCap,
  Leaf,
  Gem,
  HeartPulse,
  CreditCard,
  Bike,
  Smartphone,
  Users,
  DollarSign,
  Calendar,
  FileText,
  Upload,
  AlertCircle,
  Calculator,
} from 'lucide-react';

interface LoanApplicationData {
  loanType: string;
  amount: number;
  tenure: number;
  purpose: string;
  employmentType: string;
  monthlyIncome: number;
  existingLoans: boolean;
  existingEmi: number;
  documents: {[key: string]: File};
}

const LoanApplication: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLoanType, setSelectedLoanType] = useState('');
  const [formData, setFormData] = useState<LoanApplicationData>({
    loanType: '',
    amount: 0,
    tenure: 0,
    purpose: '',
    employmentType: '',
    monthlyIncome: 0,
    existingLoans: false,
    existingEmi: 0,
    documents: {},
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [calculatedEmi, setCalculatedEmi] = useState(0);

  const loanTypes = [
    {
      id: 'personal',
      name: 'Personal Loan',
      icon: User,
      minAmount: 50000,
      maxAmount: 1500000,
      interestRate: '10.5% - 18%',
      tenure: '6 - 60 months',
      description: 'For weddings, travel, medical emergencies, and personal needs',
      features: ['No collateral required', 'Quick approval', 'Flexible repayment'],
    },
    {
      id: 'home',
      name: 'Home Loan',
      icon: Home,
      minAmount: 500000,
      maxAmount: 50000000,
      interestRate: '8.5% - 12%',
      tenure: '12 - 360 months',
      description: 'Purchase or construct your dream home',
      features: ['Tax benefits', 'Long tenure', 'Competitive rates'],
    },
    {
      id: 'vehicle',
      name: 'Vehicle Loan',
      icon: Car,
      minAmount: 100000,
      maxAmount: 5000000,
      interestRate: '9.5% - 15%',
      tenure: '12 - 84 months',
      description: 'Finance new or used cars and commercial vehicles',
      features: ['Up to 90% financing', 'Quick processing', 'Insurance included'],
    },
    {
      id: 'business',
      name: 'Business Loan',
      icon: Briefcase,
      minAmount: 100000,
      maxAmount: 20000000,
      interestRate: '11% - 20%',
      tenure: '12 - 60 months',
      description: 'Working capital and business expansion loans',
      features: ['Collateral-free options', 'Flexible repayment', 'Quick disbursal'],
    },
    {
      id: 'education',
      name: 'Education Loan',
      icon: GraduationCap,
      minAmount: 100000,
      maxAmount: 10000000,
      interestRate: '9% - 15%',
      tenure: '60 - 180 months',
      description: 'Fund higher education in India and abroad',
      features: ['Moratorium period', 'Tax benefits', 'No margin for loans up to ₹4L'],
    },
    {
      id: 'agriculture',
      name: 'Agriculture Loan',
      icon: Leaf,
      minAmount: 50000,
      maxAmount: 5000000,
      interestRate: '7% - 12%',
      tenure: '12 - 60 months',
      description: 'Crop cultivation, equipment, and livestock financing',
      features: ['Subsidized rates', 'Seasonal repayment', 'Government schemes'],
    },
    {
      id: 'gold',
      name: 'Gold Loan',
      icon: Gem,
      minAmount: 25000,
      maxAmount: 500000,
      interestRate: '8% - 14%',
      tenure: '6 - 36 months',
      description: 'Instant cash against your gold jewelry',
      features: ['Instant approval', 'Minimal documentation', 'Flexible repayment'],
    },
    {
      id: 'healthcare',
      name: 'Healthcare Loan',
      icon: HeartPulse,
      minAmount: 25000,
      maxAmount: 1000000,
      interestRate: '10% - 16%',
      tenure: '6 - 48 months',
      description: 'Medical treatment and equipment financing',
      features: ['No collateral', 'Quick approval', 'Direct payment to hospitals'],
    },
    {
      id: 'credit_card',
      name: 'Credit Card',
      icon: CreditCard,
      minAmount: 50000,
      maxAmount: 1000000,
      interestRate: '12% - 36%',
      tenure: 'Revolving credit',
      description: 'Revolving credit for daily expenses and shopping',
      features: ['Reward points', 'Cash back', 'EMI conversion'],
    },
    {
      id: 'two_wheeler',
      name: 'Two Wheeler Loan',
      icon: Bike,
      minAmount: 60000,
      maxAmount: 200000,
      interestRate: '10% - 16%',
      tenure: '12 - 48 months',
      description: 'Finance motorcycles and scooters',
      features: ['Up to 95% financing', 'Quick approval', 'Insurance included'],
    },
    {
      id: 'digital',
      name: 'Digital Loan',
      icon: Smartphone,
      minAmount: 5000,
      maxAmount: 500000,
      interestRate: '12% - 24%',
      tenure: '3 - 24 months',
      description: 'Instant digital loans for gig workers and freelancers',
      features: ['100% digital process', 'Instant disbursal', 'Flexible repayment'],
    },
    {
      id: 'microfinance',
      name: 'Microfinance',
      icon: Users,
      minAmount: 15000,
      maxAmount: 100000,
      interestRate: '18% - 24%',
      tenure: '12 - 36 months',
      description: 'Small loans for income generation activities',
      features: ['Group lending', 'Financial literacy', 'Doorstep service'],
    },
  ];

  const steps = [
    { id: 1, title: 'Choose Loan Type', description: 'Select the type of loan you need' },
    { id: 2, title: 'Loan Details', description: 'Amount, tenure, and purpose' },
    { id: 3, title: 'Personal Information', description: 'Employment and income details' },
    { id: 4, title: 'Document Upload', description: 'Upload required documents' },
    { id: 5, title: 'Review & Submit', description: 'Review and submit your application' },
  ];

  const calculateEmi = (principal: number, rate: number, tenure: number) => {
    const monthlyRate = rate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  const handleLoanTypeSelect = (loanTypeId: string) => {
    setSelectedLoanType(loanTypeId);
    setFormData(prev => ({ ...prev, loanType: loanTypeId }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value
    }));

    // Calculate EMI when amount or tenure changes
    if ((name === 'amount' || name === 'tenure') && formData.loanType) {
      const selectedType = loanTypes.find(type => type.id === formData.loanType);
      if (selectedType) {
        const rate = parseFloat(selectedType.interestRate.split('%')[0]);
        const amount = name === 'amount' ? parseFloat(value) || 0 : formData.amount;
        const tenure = name === 'tenure' ? parseFloat(value) || 0 : formData.tenure;
        
        if (amount > 0 && tenure > 0) {
          setCalculatedEmi(calculateEmi(amount, rate, tenure));
        }
      }
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        documents: { ...prev.documents, [documentType]: file }
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: {[key: string]: string} = {};

    switch (step) {
      case 1:
        if (!formData.loanType) newErrors.loanType = 'Please select a loan type';
        break;
      case 2:
        if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Loan amount is required';
        if (!formData.tenure || formData.tenure <= 0) newErrors.tenure = 'Loan tenure is required';
        if (!formData.purpose) newErrors.purpose = 'Loan purpose is required';
        break;
      case 3:
        if (!formData.employmentType) newErrors.employmentType = 'Employment type is required';
        if (!formData.monthlyIncome || formData.monthlyIncome <= 0) newErrors.monthlyIncome = 'Monthly income is required';
        break;
      case 4:
        const selectedType = loanTypes.find(type => type.id === formData.loanType);
        if (selectedType) {
          // Check for required documents based on loan type
          if (!formData.documents.identity) newErrors.identity = 'Identity proof is required';
          if (!formData.documents.income) newErrors.income = 'Income proof is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    try {
      // TODO: Submit application to API
      console.log('Submitting application:', formData);
      navigate('/loans/my-applications');
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Choose Your Loan Type</h3>
              <p className="text-slate-600">Select the loan that best fits your needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loanTypes.map((loanType) => (
                <div
                  key={loanType.id}
                  onClick={() => handleLoanTypeSelect(loanType.id)}
                  className={`p-6 border rounded-xl cursor-pointer transition-all hover:shadow-md ${
                    selectedLoanType === loanType.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg ${
                      selectedLoanType === loanType.id ? 'bg-blue-600' : 'bg-slate-100'
                    }`}>
                      <loanType.icon className={`w-6 h-6 ${
                        selectedLoanType === loanType.id ? 'text-white' : 'text-slate-600'
                      }`} />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-slate-900">{loanType.name}</h4>
                      <p className="text-sm text-slate-600">{loanType.interestRate}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-4">{loanType.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Amount:</span>
                      <span className="font-medium">₹{(loanType.minAmount/100000).toFixed(1)}L - ₹{(loanType.maxAmount/100000).toFixed(1)}L</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Tenure:</span>
                      <span className="font-medium">{loanType.tenure}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {loanType.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center text-xs text-slate-600">
                        <CheckCircle2 className="w-3 h-3 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {errors.loanType && <p className="form-error text-center">{errors.loanType}</p>}
          </div>
        );

      case 2:
        const selectedType = loanTypes.find(type => type.id === formData.loanType);
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <selectedType?.icon className="w-6 h-6 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-blue-900">{selectedType?.name}</h3>
                  <p className="text-sm text-blue-700">{selectedType?.description}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Loan Amount (₹) *</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount || ''}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder={`Min: ₹${selectedType?.minAmount.toLocaleString()}`}
                  min={selectedType?.minAmount}
                  max={selectedType?.maxAmount}
                />
                {selectedType && (
                  <p className="text-xs text-slate-500 mt-1">
                    Range: ₹{selectedType.minAmount.toLocaleString()} - ₹{selectedType.maxAmount.toLocaleString()}
                  </p>
                )}
                {errors.amount && <p className="form-error">{errors.amount}</p>}
              </div>

              <div>
                <label className="form-label">Loan Tenure (months) *</label>
                <input
                  type="number"
                  name="tenure"
                  value={formData.tenure || ''}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="12"
                />
                {selectedType && (
                  <p className="text-xs text-slate-500 mt-1">
                    Available: {selectedType.tenure}
                  </p>
                )}
                {errors.tenure && <p className="form-error">{errors.tenure}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="form-label">Purpose of Loan *</label>
                <textarea
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  rows={3}
                  className="form-input"
                  placeholder="Describe how you plan to use this loan..."
                />
                {errors.purpose && <p className="form-error">{errors.purpose}</p>}
              </div>
            </div>

            {/* EMI Calculator */}
            {formData.amount > 0 && formData.tenure > 0 && selectedType && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Calculator className="w-5 h-5 text-green-600 mr-2" />
                  <h4 className="font-semibold text-green-900">Estimated EMI</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-green-700">Monthly EMI</p>
                    <p className="text-xl font-bold text-green-900">₹{calculatedEmi.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-green-700">Total Interest</p>
                    <p className="text-lg font-semibold text-green-900">
                      ₹{((calculatedEmi * formData.tenure) - formData.amount).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-green-700">Total Amount</p>
                    <p className="text-lg font-semibold text-green-900">
                      ₹{(calculatedEmi * formData.tenure).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Employment Type *</label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select employment type...</option>
                  <option value="salaried">Salaried Employee</option>
                  <option value="self_employed">Self Employed</option>
                  <option value="business">Business Owner</option>
                  <option value="professional">Professional</option>
                  <option value="student">Student</option>
                  <option value="retired">Retired</option>
                </select>
                {errors.employmentType && <p className="form-error">{errors.employmentType}</p>}
              </div>

              <div>
                <label className="form-label">Monthly Income (₹) *</label>
                <input
                  type="number"
                  name="monthlyIncome"
                  value={formData.monthlyIncome || ''}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="50000"
                />
                {errors.monthlyIncome && <p className="form-error">{errors.monthlyIncome}</p>}
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    name="existingLoans"
                    checked={formData.existingLoans}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="text-sm text-slate-700">
                    I have existing loans or EMIs
                  </label>
                </div>

                {formData.existingLoans && (
                  <div>
                    <label className="form-label">Total Existing EMI (₹)</label>
                    <input
                      type="number"
                      name="existingEmi"
                      value={formData.existingEmi || ''}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="15000"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Eligibility Check */}
            {formData.monthlyIncome > 0 && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-3">Eligibility Assessment</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600">Monthly Income</p>
                    <p className="font-semibold text-slate-900">₹{formData.monthlyIncome.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Proposed EMI</p>
                    <p className="font-semibold text-slate-900">₹{calculatedEmi.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">EMI to Income Ratio</p>
                    <p className={`font-semibold ${
                      (calculatedEmi / formData.monthlyIncome) * 100 <= 50 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {((calculatedEmi / formData.monthlyIncome) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        const requiredDocs = [
          { key: 'identity', name: 'Identity Proof', description: 'Aadhaar Card, Passport, or Driving License' },
          { key: 'address', name: 'Address Proof', description: 'Utility bill, Bank statement, or Rent agreement' },
          { key: 'income', name: 'Income Proof', description: 'Salary slips, ITR, or Bank statements' },
        ];

        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Upload Required Documents</h3>
              <p className="text-slate-600">Please upload clear, readable copies of the following documents</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requiredDocs.map((doc) => (
                <div key={doc.key} className="border border-slate-200 rounded-lg p-6">
                  <h4 className="font-semibold text-slate-900 mb-2">{doc.name} *</h4>
                  <p className="text-sm text-slate-600 mb-4">{doc.description}</p>
                  
                  {formData.documents[doc.key] ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <p className="font-medium text-green-900">{formData.documents[doc.key].name}</p>
                          <p className="text-sm text-green-700">
                            {(formData.documents[doc.key].size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const newDocs = { ...formData.documents };
                          delete newDocs[doc.key];
                          setFormData(prev => ({ ...prev, documents: newDocs }));
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <label className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700 font-medium">
                          Click to upload
                        </span>
                        <span className="text-slate-600"> or drag and drop</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e, doc.key)}
                        />
                      </label>
                      <p className="text-xs text-slate-500 mt-1">PDF, PNG, JPG up to 10MB</p>
                    </div>
                  )}
                  {errors[doc.key] && <p className="form-error">{errors[doc.key]}</p>}
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        const selectedLoanTypeData = loanTypes.find(type => type.id === formData.loanType);
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Review Your Application</h3>
              <p className="text-slate-600">Please review all details before submitting</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h4 className="font-semibold text-slate-900 mb-4">Application Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-600">Loan Type</p>
                  <p className="font-semibold text-slate-900">{selectedLoanTypeData?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Loan Amount</p>
                  <p className="font-semibold text-slate-900">₹{formData.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Tenure</p>
                  <p className="font-semibold text-slate-900">{formData.tenure} months</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Estimated EMI</p>
                  <p className="font-semibold text-slate-900">₹{calculatedEmi.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Employment Type</p>
                  <p className="font-semibold text-slate-900 capitalize">{formData.employmentType.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Monthly Income</p>
                  <p className="font-semibold text-slate-900">₹{formData.monthlyIncome.toLocaleString()}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-slate-600">Purpose</p>
                  <p className="font-semibold text-slate-900">{formData.purpose}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">What happens next?</p>
                  <ul className="text-sm text-blue-800 mt-2 space-y-1">
                    <li>• Your application will be processed by our AI system</li>
                    <li>• Document verification will be completed within 24 hours</li>
                    <li>• You'll receive loan offers from multiple lenders</li>
                    <li>• Choose the best offer and get instant approval</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="btn btn-ghost"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Loan Application</h1>
            <p className="text-slate-600">Apply for a loan in just a few simple steps</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                </div>
                <div className="mt-2">
                  <p className={`text-sm font-medium ${currentStep >= step.id ? 'text-slate-700' : 'text-slate-400'}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 transition-colors ${
                  currentStep > step.id ? 'bg-blue-600' : 'bg-slate-200'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        {renderStepContent()}

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t border-slate-200 mt-8">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="btn btn-ghost disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="btn btn-primary"
            >
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;