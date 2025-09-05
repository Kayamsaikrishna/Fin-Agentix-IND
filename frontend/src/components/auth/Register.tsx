import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Building, Shield, Mail, Lock, AlertCircle, CheckCircle2, FileText, UploadCloud, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { RegisterData } from '../../types/auth';
import FinAgentixLogo from '../../assets/fin-agentix-logo.jpeg';

interface FormErrors {
  [key: string]: string;
}

const Register: React.FC = () => {
  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    aadhaarNumber: '',
    panNumber: '',
    role: 'user',
    agreeToTerms: false,
    agreeToPrivacy: false,
    consentDataProcessing: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File}>({});

  const steps = activeTab === 'user' 
    ? [
        { id: 1, title: 'Account Setup', description: 'Basic account information' },
        { id: 2, title: 'Personal Details', description: 'KYC and personal information' },
        { id: 3, title: 'Address & Income', description: 'Location and financial details' },
        { id: 4, title: 'Terms & Verification', description: 'Agreements and final verification' }
      ]
    : [
        { id: 1, title: 'Account Setup', description: 'Basic account information' },
        { id: 2, title: 'Organization Details', description: 'Company and regulatory information' },
        { id: 3, title: 'Documents Upload', description: 'Required business documents' },
        { id: 4, title: 'Terms & Verification', description: 'Agreements and final verification' }
      ];

  const maxSteps = steps.length;

  useEffect(() => {
    const calculatePasswordStrength = (password: string) => {
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[a-z]/.test(password)) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;
      return strength;
    };
    
    setPasswordStrength(calculatePasswordStrength(formData.password));
  }, [formData.password]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles(prev => ({ ...prev, [fieldName]: file }));
      if (errors[fieldName]) {
        setErrors(prev => ({ ...prev, [fieldName]: '' }));
      }
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
      
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      else if (passwordStrength < 3) newErrors.password = 'Password is too weak';
      
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      else if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = 'Invalid Indian mobile number';
    }

    if (step === 2) {
      if (!formData.aadhaarNumber) newErrors.aadhaarNumber = 'Aadhaar number is required';
      else if (!/^\d{12}$/.test(formData.aadhaarNumber)) newErrors.aadhaarNumber = 'Invalid Aadhaar number';
      
      if (!formData.panNumber) newErrors.panNumber = 'PAN number is required';
      else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.toUpperCase())) newErrors.panNumber = 'Invalid PAN number';

      if (activeTab === 'user') {
        if (!formData.userType) newErrors.userType = 'User type is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      } else {
        if (!formData.organizationDetails?.type) newErrors.organizationType = 'Organization type is required';
        if (!formData.organizationDetails?.name) newErrors.organizationName = 'Organization name is required';
        if (!formData.organizationDetails?.registrationNumber) newErrors.organizationRegNumber = 'Registration number is required';
        if (!formData.organizationDetails?.designation) newErrors.designation = 'Designation is required';
        if (!formData.organizationDetails?.workEmail) newErrors.workEmail = 'Work email is required';
      }
    }

    if (step === 3) {
      if (activeTab === 'user') {
        if (!formData.monthlyIncome) newErrors.monthlyIncome = 'Monthly income is required';
        if (!formData.address?.addressLine1) newErrors.address = 'Address is required';
        if (!formData.address?.city) newErrors.city = 'City is required';
        if (!formData.address?.state) newErrors.state = 'State is required';
        if (!formData.address?.pincode) newErrors.pincode = 'Pincode is required';
      } else {
        if (!uploadedFiles.businessRegistration) newErrors.businessRegistration = 'Business registration document is required';
        if (formData.organizationDetails?.type === 'nbfc' && !uploadedFiles.rbiLicense) {
          newErrors.rbiLicense = 'RBI license document is required for NBFC';
        }
      }
    }

    if (step === 4) {
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms and conditions';
      if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = 'You must agree to privacy policy';
      if (!formData.consentDataProcessing) newErrors.consentDataProcessing = 'Data processing consent is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, maxSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;

    try {
      await register({
        ...formData,
        role: activeTab,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    if (passwordStrength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Fair';
    if (passwordStrength <= 4) return 'Good';
    return 'Strong';
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="form-error">{errors.fullName}</p>}
              </div>
              <div>
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>
              <div>
                <label className="form-label">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-input pr-10"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="form-input-icon"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 h-1.5 rounded-full">
                      <div 
                        className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`} 
                        style={{width: `${(passwordStrength/5)*100}%`}}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-slate-500">{getPasswordStrengthText()}</span>
                  </div>
                )}
                {errors.password && <p className="form-error">{errors.password}</p>}
              </div>
              <div>
                <label className="form-label">Confirm Password *</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="form-input pr-10"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="form-input-icon"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                  </button>
                </div>
                {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
              </div>
              <div>
                <label className="form-label">Mobile Number *</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input rounded-l-none"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                  />
                </div>
                {errors.phone && <p className="form-error">{errors.phone}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Aadhaar Number *</label>
                <input
                  type="text"
                  name="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter 12-digit Aadhaar number"
                  maxLength={12}
                />
                {errors.aadhaarNumber && <p className="form-error">{errors.aadhaarNumber}</p>}
              </div>
              <div>
                <label className="form-label">PAN Number *</label>
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  className="form-input uppercase"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
                {errors.panNumber && <p className="form-error">{errors.panNumber}</p>}
              </div>

              {activeTab === 'user' ? (
                <>
                  <div>
                    <label className="form-label">User Type *</label>
                    <select
                      name="userType"
                      value={formData.userType || ''}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="">Select user type...</option>
                      <option value="student">Student</option>
                      <option value="working_professional">Working Professional</option>
                      <option value="self_employed">Self Employed</option>
                      <option value="business_owner">Business Owner</option>
                      <option value="retired">Retired</option>
                    </select>
                    {errors.userType && <p className="form-error">{errors.userType}</p>}
                  </div>
                  <div>
                    <label className="form-label">Date of Birth *</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth || ''}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                    {errors.dateOfBirth && <p className="form-error">{errors.dateOfBirth}</p>}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="form-label">Organization Type *</label>
                    <select
                      name="organizationType"
                      value={formData.organizationDetails?.type || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        organizationDetails: {
                          ...prev.organizationDetails,
                          type: e.target.value as any
                        }
                      }))}
                      className="form-input"
                    >
                      <option value="">Select organization type...</option>
                      <option value="bank">Scheduled Commercial Bank</option>
                      <option value="nbfc">NBFC</option>
                      <option value="fintech">Fintech Company</option>
                      <option value="cooperative">Cooperative Bank</option>
                      <option value="mfi">Microfinance Institution</option>
                    </select>
                    {errors.organizationType && <p className="form-error">{errors.organizationType}</p>}
                  </div>
                  <div>
                    <label className="form-label">Organization Name *</label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationDetails?.name || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        organizationDetails: {
                          ...prev.organizationDetails,
                          name: e.target.value
                        }
                      }))}
                      className="form-input"
                      placeholder="Enter organization name"
                    />
                    {errors.organizationName && <p className="form-error">{errors.organizationName}</p>}
                  </div>
                  <div>
                    <label className="form-label">Registration Number *</label>
                    <input
                      type="text"
                      name="organizationRegNumber"
                      value={formData.organizationDetails?.registrationNumber || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        organizationDetails: {
                          ...prev.organizationDetails,
                          registrationNumber: e.target.value
                        }
                      }))}
                      className="form-input"
                      placeholder="CIN/Registration number"
                    />
                    {errors.organizationRegNumber && <p className="form-error">{errors.organizationRegNumber}</p>}
                  </div>
                  <div>
                    <label className="form-label">Your Designation *</label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.organizationDetails?.designation || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        organizationDetails: {
                          ...prev.organizationDetails,
                          designation: e.target.value
                        }
                      }))}
                      className="form-input"
                      placeholder="e.g., Manager, VP, Director"
                    />
                    {errors.designation && <p className="form-error">{errors.designation}</p>}
                  </div>
                  <div>
                    <label className="form-label">Work Email *</label>
                    <input
                      type="email"
                      name="workEmail"
                      value={formData.organizationDetails?.workEmail || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        organizationDetails: {
                          ...prev.organizationDetails,
                          workEmail: e.target.value
                        }
                      }))}
                      className="form-input"
                      placeholder="your.name@company.com"
                    />
                    {errors.workEmail && <p className="form-error">{errors.workEmail}</p>}
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 3:
        if (activeTab === 'user') {
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Monthly Income *</label>
                  <select
                    name="monthlyIncome"
                    value={formData.monthlyIncome || ''}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="">Select income range...</option>
                    <option value="0-25000">₹0 - ₹25,000</option>
                    <option value="25000-50000">₹25,000 - ₹50,000</option>
                    <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                    <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
                    <option value="200000+">Above ₹2,00,000</option>
                  </select>
                  {errors.monthlyIncome && <p className="form-error">{errors.monthlyIncome}</p>}
                </div>
                <div>
                  <label className="form-label">Occupation</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation || ''}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g., Software Engineer"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="form-label">Full Address *</label>
                  <textarea
                    name="address"
                    value={formData.address?.addressLine1 || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        addressLine1: e.target.value,
                        country: 'India'
                      }
                    }))}
                    rows={3}
                    className="form-input"
                    placeholder="Your full residential address"
                  ></textarea>
                  {errors.address && <p className="form-error">{errors.address}</p>}
                </div>
                <div>
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.address?.city || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        city: e.target.value,
                        country: 'India'
                      }
                    }))}
                    className="form-input"
                    placeholder="Enter city"
                  />
                  {errors.city && <p className="form-error">{errors.city}</p>}
                </div>
                <div>
                  <label className="form-label">State *</label>
                  <select
                    name="state"
                    value={formData.address?.state || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        state: e.target.value,
                        country: 'India'
                      }
                    }))}
                    className="form-input"
                  >
                    <option value="">Select state...</option>
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
                    <option value="Delhi">Delhi</option>
                  </select>
                  {errors.state && <p className="form-error">{errors.state}</p>}
                </div>
                <div>
                  <label className="form-label">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.address?.pincode || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        pincode: e.target.value,
                        country: 'India'
                      }
                    }))}
                    className="form-input"
                    placeholder="6-digit pincode"
                    maxLength={6}
                  />
                  {errors.pincode && <p className="form-error">{errors.pincode}</p>}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">Required Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Business Registration Certificate *</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                    <div className="space-y-1 text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                      <div className="flex text-sm text-slate-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileUpload(e, 'businessRegistration')}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-slate-500">PDF, PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                  {uploadedFiles.businessRegistration && (
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {uploadedFiles.businessRegistration.name}
                    </div>
                  )}
                  {errors.businessRegistration && <p className="form-error">{errors.businessRegistration}</p>}
                </div>

                {formData.organizationDetails?.type === 'nbfc' && (
                  <div>
                    <label className="form-label">RBI License Document *</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                      <div className="space-y-1 text-center">
                        <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                        <div className="flex text-sm text-slate-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                            <span>Upload RBI license</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => handleFileUpload(e, 'rbiLicense')}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-slate-500">PDF, PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                    {uploadedFiles.rbiLicense && (
                      <div className="mt-2 flex items-center text-sm text-green-600">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        {uploadedFiles.rbiLicense.name}
                      </div>
                    )}
                    {errors.rbiLicense && <p className="form-error">{errors.rbiLicense}</p>}
                  </div>
                )}

                <div>
                  <label className="form-label">Address Proof Document</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                    <div className="space-y-1 text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                      <div className="flex text-sm text-slate-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                          <span>Upload address proof</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileUpload(e, 'addressProof')}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-slate-500">Utility bill, lease agreement, etc.</p>
                    </div>
                  </div>
                  {uploadedFiles.addressProof && (
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {uploadedFiles.addressProof.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-800">Terms and Agreements</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-slate-600">
                  I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> of Fin-Agentix India.
                </label>
              </div>
              {errors.agreeToTerms && <p className="form-error pl-7">{errors.agreeToTerms}</p>}

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeToPrivacy"
                  name="agreeToPrivacy"
                  checked={formData.agreeToPrivacy}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="agreeToPrivacy" className="text-sm text-slate-600">
                  I agree to the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and data handling practices.
                </label>
              </div>
              {errors.agreeToPrivacy && <p className="form-error pl-7">{errors.agreeToPrivacy}</p>}

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consentDataProcessing"
                  name="consentDataProcessing"
                  checked={formData.consentDataProcessing}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="consentDataProcessing" className="text-sm text-slate-600">
                  I consent to data processing for verification, compliance, and service delivery purposes.
                </label>
              </div>
              {errors.consentDataProcessing && <p className="form-error pl-7">{errors.consentDataProcessing}</p>}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Data Security & Compliance</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Your data is encrypted and stored securely in India</li>
                <li>• We comply with RBI guidelines and data protection laws</li>
                <li>• Your information is used only for loan processing and verification</li>
                <li>• You can request data deletion at any time</li>
              </ul>
            </div>

            {activeTab === 'admin' && (
              <div className="notification notification-warning">
                <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Admin Registration Review</p>
                  <p className="text-sm mt-1">Your registration will be reviewed by our compliance team within 24-48 hours. You'll receive an email confirmation once approved.</p>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-20"></div>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={FinAgentixLogo} alt="Fin-Agentix" className="w-16 h-16 rounded-lg shadow-md" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Join Fin-Agentix India</h2>
          <p className="text-slate-600">Create your account to access India's smartest lending platform</p>
        </div>

        {/* Tab Selection */}
        <div className="bg-slate-100 p-1 rounded-lg grid grid-cols-2 gap-1 max-w-md mx-auto mb-8">
          <button
            onClick={() => {
              setActiveTab('user');
              setCurrentStep(1);
              setFormData(prev => ({ ...prev, role: 'user' }));
            }}
            className={`tab-button ${activeTab === 'user' ? 'active' : ''}`}
          >
            <User className="w-4 h-4" /> User Registration
          </button>
          <button
            onClick={() => {
              setActiveTab('admin');
              setCurrentStep(1);
              setFormData(prev => ({ ...prev, role: 'admin' }));
            }}
            className={`tab-button ${activeTab === 'admin' ? 'active' : ''}`}
          >
            <Building className="w-4 h-4" /> Lender/Admin
          </button>
        </div>

        <div className="card">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
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
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                {steps[currentStep - 1]?.title}
              </h3>
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="btn btn-ghost disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              {currentStep < maxSteps ? (
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
                  disabled={isLoading}
                  className="btn btn-primary"
                >
                  {isLoading ? 'Creating Account...' : (activeTab === 'admin' ? 'Submit for Review' : 'Create Account')}
                </button>
              )}
            </div>
          </form>

          {error && (
            <div className="notification notification-error mt-6">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Sign in here</Link>
        </p>
      </div>

      <style>{`
        .tab-button { 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          gap: 0.5rem; 
          padding: 0.5rem 1rem; 
          border-radius: 0.375rem; 
          font-size: 0.875rem; 
          font-weight: 500; 
          transition: all 0.2s; 
          border: 1px solid transparent;
        } 
        .tab-button.active { 
          background-color: white; 
          color: #2563eb; 
          box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
          border-color: #d1d5db;
        } 
        .tab-button:not(.active):hover { 
          background-color: rgba(203, 213, 225, 0.5); 
        }
      `}</style>
    </div>
  );
};

export default Register;