import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Plus,
  X,
  AlertCircle,
  CheckCircle2,
  Building2,
  DollarSign,
  Percent,
  Calendar,
  FileText,
  Users,
  Shield,
} from 'lucide-react';

interface SchemeFormData {
  name: string;
  category: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  interestRateMin: number;
  interestRateMax: number;
  minTenure: number;
  maxTenure: number;
  processingFee: number;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  features: string[];
  terms: string[];
  isActive: boolean;
}

const CreateScheme: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SchemeFormData>({
    name: '',
    category: '',
    description: '',
    minAmount: 0,
    maxAmount: 0,
    interestRateMin: 0,
    interestRateMax: 0,
    minTenure: 0,
    maxTenure: 0,
    processingFee: 0,
    eligibilityCriteria: [],
    requiredDocuments: [],
    features: [],
    terms: [],
    isActive: true,
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [newCriterion, setNewCriterion] = useState('');
  const [newDocument, setNewDocument] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newTerm, setNewTerm] = useState('');

  const steps = [
    { id: 1, title: 'Basic Information', description: 'Scheme details and category' },
    { id: 2, title: 'Financial Parameters', description: 'Amount, interest rates, and tenure' },
    { id: 3, title: 'Eligibility & Documents', description: 'Requirements and documentation' },
    { id: 4, title: 'Features & Terms', description: 'Additional features and terms' },
    { id: 5, title: 'Review & Publish', description: 'Final review and activation' },
  ];

  const categories = [
    { value: 'personal', label: 'Personal Loans', description: 'Unsecured loans for personal needs' },
    { value: 'home', label: 'Home Loans', description: 'Property purchase and construction loans' },
    { value: 'vehicle', label: 'Vehicle Loans', description: 'Car and commercial vehicle financing' },
    { value: 'business', label: 'Business Loans', description: 'MSME and business expansion loans' },
    { value: 'education', label: 'Education Loans', description: 'Higher education and skill development' },
    { value: 'agriculture', label: 'Agriculture Loans', description: 'Farming and agribusiness loans' },
    { value: 'gold', label: 'Gold Loans', description: 'Loans against gold jewelry' },
    { value: 'microfinance', label: 'Microfinance', description: 'Small loans for rural and urban poor' },
    { value: 'credit_card', label: 'Credit Cards', description: 'Revolving credit facilities' },
    { value: 'two_wheeler', label: 'Two Wheeler Loans', description: 'Motorcycle and scooter financing' },
    { value: 'healthcare', label: 'Healthcare Loans', description: 'Medical treatment and equipment loans' },
    { value: 'digital', label: 'Digital Loans', description: 'App-based instant loans' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addListItem = (listName: keyof SchemeFormData, newItem: string, setNewItem: (value: string) => void) => {
    if (newItem.trim()) {
      setFormData(prev => ({
        ...prev,
        [listName]: [...(prev[listName] as string[]), newItem.trim()]
      }));
      setNewItem('');
    }
  };

  const removeListItem = (listName: keyof SchemeFormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [listName]: (prev[listName] as string[]).filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: {[key: string]: string} = {};

    switch (step) {
      case 1:
        if (!formData.name) newErrors.name = 'Scheme name is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.description) newErrors.description = 'Description is required';
        break;
      case 2:
        if (formData.minAmount <= 0) newErrors.minAmount = 'Minimum amount must be greater than 0';
        if (formData.maxAmount <= formData.minAmount) newErrors.maxAmount = 'Maximum amount must be greater than minimum amount';
        if (formData.interestRateMin <= 0) newErrors.interestRateMin = 'Interest rate is required';
        if (formData.interestRateMax < formData.interestRateMin) newErrors.interestRateMax = 'Maximum rate must be greater than or equal to minimum rate';
        if (formData.minTenure <= 0) newErrors.minTenure = 'Minimum tenure is required';
        if (formData.maxTenure < formData.minTenure) newErrors.maxTenure = 'Maximum tenure must be greater than or equal to minimum tenure';
        break;
      case 3:
        if (formData.eligibilityCriteria.length === 0) newErrors.eligibilityCriteria = 'At least one eligibility criterion is required';
        if (formData.requiredDocuments.length === 0) newErrors.requiredDocuments = 'At least one required document must be specified';
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

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Creating scheme:', formData);
      navigate('/admin/schemes');
    } catch (error) {
      console.error('Error creating scheme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="form-label">Scheme Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., Quick Personal Loan, Home Loan Premium"
              />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            <div>
              <label className="form-label">Loan Category *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {categories.map((category) => (
                  <label
                    key={category.value}
                    className={`flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.category === category.value
                        ? 'bg-blue-50 border-blue-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={formData.category === category.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="font-medium text-slate-900">{category.label}</span>
                    <span className="text-sm text-slate-500 mt-1">{category.description}</span>
                  </label>
                ))}
              </div>
              {errors.category && <p className="form-error">{errors.category}</p>}
            </div>

            <div>
              <label className="form-label">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="form-input"
                placeholder="Describe the loan scheme, its purpose, and key benefits..."
              />
              {errors.description && <p className="form-error">{errors.description}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Minimum Amount (₹) *</label>
                <input
                  type="number"
                  name="minAmount"
                  value={formData.minAmount || ''}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="50000"
                />
                {errors.minAmount && <p className="form-error">{errors.minAmount}</p>}
              </div>
              <div>
                <label className="form-label">Maximum Amount (₹) *</label>
                <input
                  type="number"
                  name="maxAmount"
                  value={formData.maxAmount || ''}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="1500000"
                />
                {errors.maxAmount && <p className="form-error">{errors.maxAmount}</p>}
              </div>
              <div>
                <label className="form-label">Minimum Interest Rate (%) *</label>
                <input
                  type="number"
                  step="0.1"
                  name="interestRateMin"
                  value={formData.interestRateMin || ''}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="10.5"
                />
                {errors.interestRateMin && <p className="form-error">{errors.interestRateMin}</p>}
              </div>
              <div>
                <label className="form-label">Maximum Interest Rate (%) *</label>
                <input
                  type="number"
                  step="0.1"
                  name="interestRateMax"
                  value={formData.interestRateMax || ''}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="18.0"
                />
                {errors.interestRateMax && <p className="form-error">{errors.interestRateMax}</p>}
              </div>
              <div>
                <label className="form-label">Minimum Tenure (months) *</label>
                <input
                  type="number"
                  name="minTenure"
                  value={formData.minTenure || ''}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="6"
                />
                {errors.minTenure && <p className="form-error">{errors.minTenure}</p>}
              </div>
              <div>
                <label className="form-label">Maximum Tenure (months) *</label>
                <input
                  type="number"
                  name="maxTenure"
                  value={formData.maxTenure || ''}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="60"
                />
                {errors.maxTenure && <p className="form-error">{errors.maxTenure}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="form-label">Processing Fee (₹)</label>
                <input
                  type="number"
                  name="processingFee"
                  value={formData.processingFee || ''}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="2500"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="form-label">Eligibility Criteria *</label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCriterion}
                    onChange={(e) => setNewCriterion(e.target.value)}
                    className="form-input flex-1"
                    placeholder="e.g., Minimum age 21 years"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addListItem('eligibilityCriteria', newCriterion, setNewCriterion);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => addListItem('eligibilityCriteria', newCriterion, setNewCriterion)}
                    className="btn btn-primary"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.eligibilityCriteria.map((criterion, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">{criterion}</span>
                      <button
                        type="button"
                        onClick={() => removeListItem('eligibilityCriteria', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {errors.eligibilityCriteria && <p className="form-error">{errors.eligibilityCriteria}</p>}
            </div>

            <div>
              <label className="form-label">Required Documents *</label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newDocument}
                    onChange={(e) => setNewDocument(e.target.value)}
                    className="form-input flex-1"
                    placeholder="e.g., Aadhaar Card, PAN Card, Salary Slips"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addListItem('requiredDocuments', newDocument, setNewDocument);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => addListItem('requiredDocuments', newDocument, setNewDocument)}
                    className="btn btn-primary"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.requiredDocuments.map((document, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">{document}</span>
                      <button
                        type="button"
                        onClick={() => removeListItem('requiredDocuments', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {errors.requiredDocuments && <p className="form-error">{errors.requiredDocuments}</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="form-label">Key Features</label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="form-input flex-1"
                    placeholder="e.g., No prepayment penalty, Quick approval"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addListItem('features', newFeature, setNewFeature);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => addListItem('features', newFeature, setNewFeature)}
                    className="btn btn-primary"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">{feature}</span>
                      <button
                        type="button"
                        onClick={() => removeListItem('features', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="form-label">Terms and Conditions</label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTerm}
                    onChange={(e) => setNewTerm(e.target.value)}
                    className="form-input flex-1"
                    placeholder="e.g., Subject to credit approval, Age limit 18-65 years"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addListItem('terms', newTerm, setNewTerm);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => addListItem('terms', newTerm, setNewTerm)}
                    className="btn btn-primary"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.terms.map((term, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">{term}</span>
                      <button
                        type="button"
                        onClick={() => removeListItem('terms', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-4">Scheme Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-blue-700 font-medium">Scheme Name</p>
                  <p className="text-blue-900">{formData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-700 font-medium">Category</p>
                  <p className="text-blue-900 capitalize">{formData.category}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-700 font-medium">Amount Range</p>
                  <p className="text-blue-900">
                    ₹{formData.minAmount.toLocaleString()} - ₹{formData.maxAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-700 font-medium">Interest Rate</p>
                  <p className="text-blue-900">
                    {formData.interestRateMin}% - {formData.interestRateMax}% p.a.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-700 font-medium">Tenure</p>
                  <p className="text-blue-900">
                    {formData.minTenure} - {formData.maxTenure} months
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-700 font-medium">Processing Fee</p>
                  <p className="text-blue-900">₹{formData.processingFee.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm text-slate-700">
                Activate this scheme immediately after creation
              </label>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">Review Before Publishing</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Once published, this scheme will be visible to users and they can start applying. 
                    Make sure all details are accurate and comply with regulatory requirements.
                  </p>
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
            onClick={() => navigate('/admin/schemes')}
            className="btn btn-ghost"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Schemes
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Create New Loan Scheme</h1>
            <p className="text-slate-600">Set up a new loan product for your platform</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
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
        <h2 className="text-xl font-semibold text-slate-900 mb-6">
          {steps[currentStep - 1]?.title}
        </h2>
        
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
              {isLoading ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Creating Scheme...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Create Scheme
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="notification notification-error">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default CreateScheme;