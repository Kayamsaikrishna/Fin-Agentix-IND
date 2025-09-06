import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle, 
  Upload, 
  Info,
  HelpCircle,
  FileText,
  User,
  Home,
  Briefcase,
  DollarSign,
  Calendar,
  CreditCard
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface FormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  maritalStatus: string;
  panCard: string;
  aadhaarNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  
  // Loan Details
  loanType: string;
  loanAmount: string;
  loanPurpose: string;
  tenure: string;
  
  // Employment Details
  employmentType: string;
  employerName: string;
  designation: string;
  workExperience: string;
  monthlyIncome: string;
  
  // Financial Information
  existingEmi: string;
  creditScore: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  
  // Documents
  identityProof: File | null;
  addressProof: File | null;
  incomeProof: File | null;
  bankStatements: File | null;
  photograph: File | null;
  additionalDocuments: File[];
  
  // Terms and Conditions
  termsAccepted: boolean;
  dataConsent: boolean;
}

const LoanApplication: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    panCard: '',
    aadhaarNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Loan Details
    loanType: '',
    loanAmount: '',
    loanPurpose: '',
    tenure: '',
    
    // Employment Details
    employmentType: '',
    employerName: '',
    designation: '',
    workExperience: '',
    monthlyIncome: '',
    
    // Financial Information
    existingEmi: '',
    creditScore: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    
    // Documents
    identityProof: null,
    addressProof: null,
    incomeProof: null,
    bankStatements: null,
    photograph: null,
    additionalDocuments: [],
    
    // Terms and Conditions
    termsAccepted: false,
    dataConsent: false
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  
  const loanTypes = [
    { id: 'personal', name: 'Personal Loan', icon: <User />, interestRate: '10.99%', maxAmount: '₹15,00,000' },
    { id: 'home', name: 'Home Loan', icon: <Home />, interestRate: '8.50%', maxAmount: '₹75,00,000' },
    { id: 'business', name: 'Business Loan', icon: <Briefcase />, interestRate: '12.50%', maxAmount: '₹50,00,000' },
    { id: 'education', name: 'Education Loan', icon: <FileText />, interestRate: '9.50%', maxAmount: '₹25,00,000' },
    { id: 'vehicle', name: 'Vehicle Loan', icon: <CreditCard />, interestRate: '9.99%', maxAmount: '₹20,00,000' },
  ];
  
  const steps = [
    { id: 1, name: 'Personal Information', icon: <User className="w-5 h-5" /> },
    { id: 2, name: 'Loan Details', icon: <DollarSign className="w-5 h-5" /> },
    { id: 3, name: 'Employment', icon: <Briefcase className="w-5 h-5" /> },
    { id: 4, name: 'Financial Information', icon: <CreditCard className="w-5 h-5" /> },
    { id: 5, name: 'Documents', icon: <FileText className="w-5 h-5" /> },
    { id: 6, name: 'Review & Submit', icon: <CheckCircle className="w-5 h-5" /> },
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof FormData) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    if (fieldName === 'additionalDocuments') {
      setFormData(prev => ({
        ...prev,
        additionalDocuments: [...prev.additionalDocuments, ...Array.from(files)]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [fieldName]: files[0]
      }));
    }
    
    // Clear error when user uploads a file
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };
  
  const removeAdditionalDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalDocuments: prev.additionalDocuments.filter((_, i) => i !== index)
    }));
  };
  
  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let isValid = true;
    
    switch (step) {
      case 1: // Personal Information
        if (!formData.fullName) {
          newErrors.fullName = 'Full name is required';
          isValid = false;
        }
        
        if (!formData.email) {
          newErrors.email = 'Email is required';
          isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
          isValid = false;
        }
        
        if (!formData.phone) {
          newErrors.phone = 'Phone number is required';
          isValid = false;
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {
          newErrors.phone = 'Phone number must be 10 digits';
          isValid = false;
        }
        
        if (!formData.dob) {
          newErrors.dob = 'Date of birth is required';
          isValid = false;
        }
        
        if (!formData.gender) {
          newErrors.gender = 'Gender is required';
          isValid = false;
        }
        
        if (!formData.panCard) {
          newErrors.panCard = 'PAN Card number is required';
          isValid = false;
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panCard)) {
          newErrors.panCard = 'Invalid PAN Card format';
          isValid = false;
        }
        
        if (!formData.aadhaarNumber) {
          newErrors.aadhaarNumber = 'Aadhaar number is required';
          isValid = false;
        } else if (!/^[0-9]{12}$/.test(formData.aadhaarNumber)) {
          newErrors.aadhaarNumber = 'Aadhaar number must be 12 digits';
          isValid = false;
        }
        
        if (!formData.address) {
          newErrors.address = 'Address is required';
          isValid = false;
        }
        
        if (!formData.city) {
          newErrors.city = 'City is required';
          isValid = false;
        }
        
        if (!formData.state) {
          newErrors.state = 'State is required';
          isValid = false;
        }
        
        if (!formData.pincode) {
          newErrors.pincode = 'PIN code is required';
          isValid = false;
        } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
          newErrors.pincode = 'PIN code must be 6 digits';
          isValid = false;
        }
        break;
        
      case 2: // Loan Details
        if (!formData.loanType) {
          newErrors.loanType = 'Loan type is required';
          isValid = false;
        }
        
        if (!formData.loanAmount) {
          newErrors.loanAmount = 'Loan amount is required';
          isValid = false;
        } else if (isNaN(Number(formData.loanAmount)) || Number(formData.loanAmount) <= 0) {
          newErrors.loanAmount = 'Please enter a valid amount';
          isValid = false;
        }
        
        if (!formData.loanPurpose) {
          newErrors.loanPurpose = 'Loan purpose is required';
          isValid = false;
        }
        
        if (!formData.tenure) {
          newErrors.tenure = 'Loan tenure is required';
          isValid = false;
        }
        break;
        
      case 3: // Employment Details
        if (!formData.employmentType) {
          newErrors.employmentType = 'Employment type is required';
          isValid = false;
        }
        
        if (!formData.employerName) {
          newErrors.employerName = 'Employer name is required';
          isValid = false;
        }
        
        if (!formData.designation) {
          newErrors.designation = 'Designation is required';
          isValid = false;
        }
        
        if (!formData.workExperience) {
          newErrors.workExperience = 'Work experience is required';
          isValid = false;
        }
        
        if (!formData.monthlyIncome) {
          newErrors.monthlyIncome = 'Monthly income is required';
          isValid = false;
        } else if (isNaN(Number(formData.monthlyIncome)) || Number(formData.monthlyIncome) <= 0) {
          newErrors.monthlyIncome = 'Please enter a valid amount';
          isValid = false;
        }
        break;
        
      case 4: // Financial Information
        if (!formData.bankName) {
          newErrors.bankName = 'Bank name is required';
          isValid = false;
        }
        
        if (!formData.accountNumber) {
          newErrors.accountNumber = 'Account number is required';
          isValid = false;
        }
        
        if (!formData.ifscCode) {
          newErrors.ifscCode = 'IFSC code is required';
          isValid = false;
        } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
          newErrors.ifscCode = 'Invalid IFSC code format';
          isValid = false;
        }
        break;
        
      case 5: // Documents
        if (!formData.identityProof) {
          newErrors.identityProof = 'Identity proof is required';
          isValid = false;
        }
        
        if (!formData.addressProof) {
          newErrors.addressProof = 'Address proof is required';
          isValid = false;
        }
        
        if (!formData.incomeProof) {
          newErrors.incomeProof = 'Income proof is required';
          isValid = false;
        }
        
        if (!formData.bankStatements) {
          newErrors.bankStatements = 'Bank statements are required';
          isValid = false;
        }
        
        if (!formData.photograph) {
          newErrors.photograph = 'Photograph is required';
          isValid = false;
        }
        break;
        
      case 6: // Review & Submit
        if (!formData.termsAccepted) {
          newErrors.termsAccepted = 'You must accept the terms and conditions';
          isValid = false;
        }
        
        if (!formData.dataConsent) {
          newErrors.dataConsent = 'You must provide consent for data processing';
          isValid = false;
        }
        break;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a random application ID
      const randomId = Math.floor(100000 + Math.random() * 900000);
      setApplicationId(`LOAN-${randomId}`);
      setApplicationSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      // Handle submission error
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const calculateEMI = () => {
    const P = Number(formData.loanAmount);
    const N = Number(formData.tenure);
    let R = 0;
    
    // Set interest rate based on loan type
    switch (formData.loanType) {
      case 'personal':
        R = 10.99 / 12 / 100; // Monthly interest rate
        break;
      case 'home':
        R = 8.5 / 12 / 100;
        break;
      case 'business':
        R = 12.5 / 12 / 100;
        break;
      case 'education':
        R = 9.5 / 12 / 100;
        break;
      case 'vehicle':
        R = 9.99 / 12 / 100;
        break;
      default:
        R = 10 / 12 / 100;
    }
    
    if (P && N && R) {
      const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
      return emi.toFixed(2);
    }
    
    return '0';
  };
  
  // Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <p className="text-gray-600">Please provide your personal details for verification.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`form-input ${errors.fullName ? 'border-red-500' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="error-message">{errors.fullName}</p>}
              </div>
              
              <div>
                <label className="form-label">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>
              
              <div>
                <label className="form-label">Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="Enter your 10-digit phone number"
                  maxLength={10}
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
              </div>
              
              <div>
                <label className="form-label">Date of Birth <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className={`form-input ${errors.dob ? 'border-red-500' : ''}`}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                />
                {errors.dob && <p className="error-message">{errors.dob}</p>}
              </div>
              
              <div>
                <label className="form-label">Gender <span className="text-red-500">*</span></label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`form-input ${errors.gender ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="error-message">{errors.gender}</p>}
              </div>
              
              <div>
                <label className="form-label">Marital Status</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select Marital Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-medium mb-4">Identity Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">PAN Card Number <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="panCard"
                    value={formData.panCard}
                    onChange={handleInputChange}
                    className={`form-input ${errors.panCard ? 'border-red-500' : ''}`}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                  />
                  {errors.panCard && <p className="error-message">{errors.panCard}</p>}
                </div>
                
                <div>
                  <label className="form-label">Aadhaar Number <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleInputChange}
                    className={`form-input ${errors.aadhaarNumber ? 'border-red-500' : ''}`}
                    placeholder="12-digit Aadhaar number"
                    maxLength={12}
                  />
                  {errors.aadhaarNumber && <p className="error-message">{errors.aadhaarNumber}</p>}
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-medium mb-4">Address Information</h3>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="form-label">Address <span className="text-red-500">*</span></label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`form-input ${errors.address ? 'border-red-500' : ''}`}
                    placeholder="Enter your complete address"
                    rows={3}
                  />
                  {errors.address && <p className="error-message">{errors.address}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="form-label">City <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`form-input ${errors.city ? 'border-red-500' : ''}`}
                      placeholder="Enter city"
                    />
                    {errors.city && <p className="error-message">{errors.city}</p>}
                  </div>
                  
                  <div>
                    <label className="form-label">State <span className="text-red-500">*</span></label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`form-input ${errors.state ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                      <option value="Ladakh">Ladakh</option>
                      <option value="Lakshadweep">Lakshadweep</option>
                      <option value="Puducherry">Puducherry</option>
                    </select>
                    {errors.state && <p className="error-message">{errors.state}</p>}
                  </div>
                  
                  <div>
                    <label className="form-label">PIN Code <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={`form-input ${errors.pincode ? 'border-red-500' : ''}`}
                      placeholder="6-digit PIN code"
                      maxLength={6}
                    />
                    {errors.pincode && <p className="error-message">{errors.pincode}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Loan Details</h2>
            <p className="text-gray-600">Select your preferred loan type and provide details.</p>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="form-label">Loan Type <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  {loanTypes.map((loan) => (
                    <div 
                      key={loan.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.loanType === loan.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          loanType: loan.id
                        }));
                        if (errors.loanType) {
                          setErrors(prev => ({
                            ...prev,
                            loanType: ''
                          }));
                        }
                      }}
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                          {loan.icon}
                        </div>
                        <h3 className="font-medium">{loan.name}</h3>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Interest Rate: {loan.interestRate}</p>
                        <p>Max Amount: {loan.maxAmount}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.loanType && <p className="error-message mt-2">{errors.loanType}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Loan Amount (₹) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                    className={`form-input ${errors.loanAmount ? 'border-red-500' : ''}`}
                    placeholder="Enter loan amount"
                    min="1000"
                  />
                  {errors.loanAmount && <p className="error-message">{errors.loanAmount}</p>}
                </div>
                
                <div>
                  <label className="form-label">Loan Tenure (months) <span className="text-red-500">*</span></label>
                  <select
                    name="tenure"
                    value={formData.tenure}
                    onChange={handleInputChange}
                    className={`form-input ${errors.tenure ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Tenure</option>
                    <option value="12">12 months (1 year)</option>
                    <option value="24">24 months (2 years)</option>
                    <option value="36">36 months (3 years)</option>
                    <option value="48">48 months (4 years)</option>
                    <option value="60">60 months (5 years)</option>
                    <option value="72">72 months (6 years)</option>
                    <option value="84">84 months (7 years)</option>
                    <option value="120">120 months (10 years)</option>
                    <option value="180">180 months (15 years)</option>
                    <option value="240">240 months (20 years)</option>
                  </select>
                  {errors.tenure && <p className="error-message">{errors.tenure}</p>}
                </div>
              </div>
              
              {formData.loanAmount && formData.tenure && formData.loanType && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <h3 className="font-medium text-blue-800 mb-2">Loan Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Loan Amount</p>
                      <p className="font-medium">₹{Number(formData.loanAmount).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tenure</p>
                      <p className="font-medium">{formData.tenure} months</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Estimated EMI</p>
                      <p className="font-medium">₹{Number(calculateEMI()).toLocaleString()}/month</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <label className="form-label">Loan Purpose <span className="text-red-500">*</span></label>
                <textarea
                  name="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={handleInputChange}
                  className={`form-input ${errors.loanPurpose ? 'border-red-500' : ''}`}
                  placeholder="Briefly describe the purpose of this loan"
                  rows={3}
                />
                {errors.loanPurpose && <p className="error-message">{errors.loanPurpose}</p>}
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Employment Details</h2>
            <p className="text-gray-600">Please provide your employment information.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Employment Type <span className="text-red-500">*</span></label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleInputChange}
                  className={`form-input ${errors.employmentType ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Employment Type</option>
                  <option value="salaried">Salaried</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="business-owner">Business Owner</option>
                  <option value="professional">Professional</option>
                  <option value="retired">Retired</option>
                </select>
                {errors.employmentType && <p className="error-message">{errors.employmentType}</p>}
              </div>
              
              <div>
                <label className="form-label">Employer/Business Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="employerName"
                  value={formData.employerName}
                  onChange={handleInputChange}
                  className={`form-input ${errors.employerName ? 'border-red-500' : ''}`}
                  placeholder="Enter employer or business name"
                />
                {errors.employerName && <p className="error-message">{errors.employerName}</p>}
              </div>
              
              <div>
                <label className="form-label">Designation/Role <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className={`form-input ${errors.designation ? 'border-red-500' : ''}`}
                  placeholder="Enter your designation or role"
                />
                {errors.designation && <p className="error-message">{errors.designation}</p>}
              </div>
              
              <div>
                <label className="form-label">Work Experience (years) <span className="text-red-500">*</span></label>
                <select
                  name="workExperience"
                  value={formData.workExperience}
                  onChange={handleInputChange}
                  className={`form-input ${errors.workExperience ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Experience</option>
                  <option value="0-1">Less than 1 year</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">More than 10 years</option>
                </select>
                {errors.workExperience && <p className="error-message">{errors.workExperience}</p>}
              </div>
              
              <div>
                <label className="form-label">Monthly Income (₹) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleInputChange}
                  className={`form-input ${errors.monthlyIncome ? 'border-red-500' : ''}`}
                  placeholder="Enter your monthly income"
                  min="1000"
                />
                {errors.monthlyIncome && <p className="error-message">{errors.monthlyIncome}</p>}
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Financial Information</h2>
            <p className="text-gray-600">Please provide your financial details.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Existing EMI Obligations (₹/month)</label>
                <input
                  type="number"
                  name="existingEmi"
                  value={formData.existingEmi}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter amount (0 if none)"
                  min="0"
                />
              </div>
              
              <div>
                <label className="form-label">Credit Score (if known)</label>
                <input
                  type="text"
                  name="creditScore"
                  value={formData.creditScore}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your credit score (e.g., 750)"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank if you don't know your credit score</p>
              </div>
              
              <div className="md:col-span-2">
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-yellow-800">Bank Account Information</h3>
                      <p className="text-sm text-yellow-700">Please provide details of your primary bank account for loan disbursement and EMI deduction.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="form-label">Bank Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className={`form-input ${errors.bankName ? 'border-red-500' : ''}`}
                  placeholder="Enter your bank name"
                />
                {errors.bankName && <p className="error-message">{errors.bankName}</p>}
              </div>
              
              <div>
                <label className="form-label">Account Number <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className={`form-input ${errors.accountNumber ? 'border-red-500' : ''}`}
                  placeholder="Enter your account number"
                />
                {errors.accountNumber && <p className="error-message">{errors.accountNumber}</p>}
              </div>
              
              <div>
                <label className="form-label">IFSC Code <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleInputChange}
                  className={`form-input ${errors.ifscCode ? 'border-red-500' : ''}`}
                  placeholder="Enter IFSC code (e.g., SBIN0000123)"
                />
                {errors.ifscCode && <p className="error-message">{errors.ifscCode}</p>}
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Document Upload</h2>
            <p className="text-gray-600">Please upload the required documents for verification.</p>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-800">Document Guidelines</h3>
                  <ul className="text-sm text-blue-700 list-disc list-inside space-y-1 mt-1">
                    <li>All documents should be clear and legible</li>
                    <li>File size should not exceed 5MB per document</li>
                    <li>Accepted formats: PDF, JPG, PNG</li>
                    <li>Ensure all pages of multi-page documents are included</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Identity Proof <span className="text-red-500">*</span></label>
                <p className="text-xs text-gray-500 mb-2">Aadhaar Card, PAN Card, Voter ID, Passport, or Driving License</p>
                <div className="flex items-center">
                  <label className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${errors.identityProof ? 'border-red-300' : 'border-gray-300'}`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        {formData.identityProof ? formData.identityProof.name : 'Click to upload'}
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => handleFileChange(e, 'identityProof')}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                </div>
                {errors.identityProof && <p className="error-message">{errors.identityProof}</p>}
              </div>
              
              <div>
                <label className="form-label">Address Proof <span className="text-red-500">*</span></label>
                <p className="text-xs text-gray-500 mb-2">Utility Bill, Rental Agreement, or Property Tax Receipt</p>
                <div className="flex items-center">
                  <label className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${errors.addressProof ? 'border-red-300' : 'border-gray-300'}`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        {formData.addressProof ? formData.addressProof.name : 'Click to upload'}
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => handleFileChange(e, 'addressProof')}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                </div>
                {errors.addressProof && <p className="error-message">{errors.addressProof}</p>}
              </div>
              
              <div>
                <label className="form-label">Income Proof <span className="text-red-500">*</span></label>
                <p className="text-xs text-gray-500 mb-2">Salary Slips, Form 16, or ITR for the last 2 years</p>
                <div className="flex items-center">
                  <label className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${errors.incomeProof ? 'border-red-300' : 'border-gray-300'}`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        {formData.incomeProof ? formData.incomeProof.name : 'Click to upload'}
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => handleFileChange(e, 'incomeProof')}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                </div>
                {errors.incomeProof && <p className="error-message">{errors.incomeProof}</p>}
              </div>
              
              <div>
                <label className="form-label">Bank Statements <span className="text-red-500">*</span></label>
                <p className="text-xs text-gray-500 mb-2">Last 6 months' bank statements</p>
                <div className="flex items-center">
                  <label className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${errors.bankStatements ? 'border-red-300' : 'border-gray-300'}`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        {formData.bankStatements ? formData.bankStatements.name : 'Click to upload'}
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => handleFileChange(e, 'bankStatements')}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                </div>
                {errors.bankStatements && <p className="error-message">{errors.bankStatements}</p>}
              </div>
              
              <div>
                <label className="form-label">Photograph <span className="text-red-500">*</span></label>
                <p className="text-xs text-gray-500 mb-2">Recent passport-sized photograph</p>
                <div className="flex items-center">
                  <label className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${errors.photograph ? 'border-red-300' : 'border-gray-300'}`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        {formData.photograph ? formData.photograph.name : 'Click to upload'}
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => handleFileChange(e, 'photograph')}
                      accept=".jpg,.jpeg,.png"
                    />
                  </label>
                </div>
                {errors.photograph && <p className="error-message">{errors.photograph}</p>}
              </div>
              
              <div>
                <label className="form-label">Additional Documents (Optional)</label>
                <p className="text-xs text-gray-500 mb-2">Any other supporting documents</p>
                <div className="flex items-center">
                  <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        Click to upload additional documents
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => handleFileChange(e, 'additionalDocuments')}
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                    />
                  </label>
                </div>
                
                {formData.additionalDocuments.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Uploaded Additional Documents:</p>
                    <ul className="space-y-2">
                      {formData.additionalDocuments.map((doc, index) => (
                        <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm truncate">{doc.name}</span>
                          <button 
                            type="button" 
                            onClick={() => removeAdditionalDocument(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Review & Submit</h2>
            <p className="text-gray-600">Please review your application details before submission.</p>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium border-b border-gray-200 pb-2 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{formData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">{formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{formData.dob}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">PAN Card</p>
                    <p className="font-medium">{formData.panCard}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Aadhaar Number</p>
                    <p className="font-medium">{formData.aadhaarNumber}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{formData.address}, {formData.city}, {formData.state} - {formData.pincode}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium border-b border-gray-200 pb-2 mb-4">Loan Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Loan Type</p>
                    <p className="font-medium">
                      {loanTypes.find(loan => loan.id === formData.loanType)?.name || formData.loanType}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Loan Amount</p>
                    <p className="font-medium">₹{Number(formData.loanAmount).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Loan Tenure</p>
                    <p className="font-medium">{formData.tenure} months</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estimated EMI</p>
                    <p className="font-medium">₹{Number(calculateEMI()).toLocaleString()}/month</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Loan Purpose</p>
                    <p className="font-medium">{formData.loanPurpose}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium border-b border-gray-200 pb-2 mb-4">Employment & Financial Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Employment Type</p>
                    <p className="font-medium">{formData.employmentType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Employer/Business</p>
                    <p className="font-medium">{formData.employerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Monthly Income</p>
                    <p className="font-medium">₹{Number(formData.monthlyIncome).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bank Details</p>
                    <p className="font-medium">{formData.bankName}, Acc: {formData.accountNumber}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium border-b border-gray-200 pb-2 mb-4">Uploaded Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Identity Proof</p>
                    <p className="font-medium">{formData.identityProof?.name || 'Not uploaded'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address Proof</p>
                    <p className="font-medium">{formData.addressProof?.name || 'Not uploaded'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Income Proof</p>
                    <p className="font-medium">{formData.incomeProof?.name || 'Not uploaded'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bank Statements</p>
                    <p className="font-medium">{formData.bankStatements?.name || 'Not uploaded'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Photograph</p>
                    <p className="font-medium">{formData.photograph?.name || 'Not uploaded'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Additional Documents</p>
                    <p className="font-medium">{formData.additionalDocuments.length} files</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="termsAccepted"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                    I accept the <button type="button" className="text-blue-600 hover:underline">Terms and Conditions</button>
                  </label>
                  {errors.termsAccepted && <p className="error-message">{errors.termsAccepted}</p>}
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="dataConsent"
                    name="dataConsent"
                    type="checkbox"
                    checked={formData.dataConsent}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="dataConsent" className="font-medium text-gray-700">
                    I consent to the processing of my personal data for loan evaluation
                  </label>
                  {errors.dataConsent && <p className="error-message">{errors.dataConsent}</p>}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };
  
  // Render success message after application submission
  const renderSuccessMessage = () => {
    return (
      <div className="text-center py-10">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">Your loan application has been successfully submitted. We will review your application and get back to you soon.</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Application Reference ID:</p>
            <p className="text-lg font-medium">{applicationId}</p>
          </div>
          
          <div className="space-y-4">
            <Link to="/dashboard" className="btn btn-primary w-full">
              Go to Dashboard
            </Link>
            <button 
              type="button" 
              onClick={() => window.print()}
              className="btn btn-ghost w-full"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {applicationSubmitted ? (
          renderSuccessMessage()
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Progress Steps */}
            <div className="border-b border-gray-200">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  {steps.map((step) => (
                    <div 
                      key={step.id} 
                      className={`flex flex-col items-center ${currentStep === step.id ? 'text-blue-600' : currentStep > step.id ? 'text-green-600' : 'text-gray-400'}`}
                    >
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === step.id ? 'bg-blue-100' : currentStep > step.id ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {currentStep > step.id ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          step.icon
                        )}
                      </div>
                      <span className="text-xs mt-1 hidden md:block">{step.name}</span>
                    </div>
                  ))}
                </div>
                <div className="relative mt-2">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-between">
                    {steps.map((step) => (
                      <div key={step.id} className="flex items-center">
                        <div 
                          className={`h-1 w-full ${currentStep >= step.id ? 'bg-blue-500' : 'bg-gray-200'}`}
                          style={{ width: `${100 / (steps.length - 1)}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6">
              {renderStepContent()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="btn btn-ghost"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </button>
                ) : (
                  <Link to="/dashboard" className="btn btn-ghost">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Link>
                )}
                
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
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanApplication;