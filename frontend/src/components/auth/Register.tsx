import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Building, Shield, Mail, Lock, AlertCircle, CheckCircle2, FileText, UploadCloud } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FormData {
  // Common fields
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone: string;
  aadhaarNumber: string;
  panNumber: string;
  
  // User-specific fields
  userType?: 'student' | 'working_professional' | 'self_employed' | 'business_owner' | 'retired';
  dateOfBirth?: string;
  occupation?: string;
  monthlyIncome?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  
  // Admin-specific fields
  organizationType?: 'bank' | 'nbfc' | 'fintech' | 'cooperative' | 'mfi';
  organizationName?: string;
  organizationRegNumber?: string;
  rbiLicenseNumber?: string;
  companyAddress?: string;
  companyCity?: string;
  companyState?: string;
  companyPincode?: string;
  designation?: string;
  workEmail?: string;
  businessRegistrationDoc?: File | null;
  rbiLicenseDoc?: File | null;
  addressProofDoc?: File | null;
  secretKey?: string;
  
  // Terms and privacy
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
  consentDataProcessing: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

const Register: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    aadhaarNumber: '',
    panNumber: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    consentDataProcessing: false,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showSecretKeyModal, setShowSecretKeyModal] = useState(false);

  // Password strength calculation
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

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Common validations
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid Indian mobile number';
    }

    if (!formData.aadhaarNumber) newErrors.aadhaarNumber = 'Aadhaar number is required';
    else if (!/^\d{12}$/.test(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber = 'Aadhaar number must be 12 digits';
    }

    if (!formData.panNumber) newErrors.panNumber = 'PAN number is required';
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.toUpperCase())) {
      newErrors.panNumber = 'Please enter a valid PAN number';
    }

    // User-specific validations
    if (activeTab === 'user') {
      if (!formData.userType) newErrors.userType = 'Please select user type';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.monthlyIncome) newErrors.monthlyIncome = 'Monthly income is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    }

    // Admin-specific validations
    if (activeTab === 'admin') {
      if (!formData.organizationType) newErrors.organizationType = 'Organization type is required';
      if (!formData.organizationName) newErrors.organizationName = 'Organization name is required';
      if (!formData.organizationRegNumber) newErrors.organizationRegNumber = 'Registration number is required';
      if (!formData.designation) newErrors.designation = 'Designation is required';
      if (!formData.workEmail) newErrors.workEmail = 'Work email is required';
      if (!formData.companyAddress) newErrors.companyAddress = 'Company address is required';
      if (!formData.businessRegistrationDoc) newErrors.businessRegistrationDoc = 'Business registration document is required';
      if (formData.organizationType === 'nbfc' && !formData.rbiLicenseDoc) {
        newErrors.rbiLicenseDoc = 'RBI license document is required for NBFC';
      }
    }

    // Terms and conditions
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms and conditions';
    if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = 'You must agree to privacy policy';
    if (!formData.consentDataProcessing) newErrors.consentDataProcessing = 'Data processing consent is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [fieldName]: file }));
    
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (activeTab === 'admin') {
        alert('Admin registration submitted successfully! You will receive an email confirmation within 24-48 hours.');
      } else {
        alert('User registration successful! Please verify your email to complete the registration.');
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
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

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
       <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-20"></div>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Join Fin-Agentix India</h2>
          <p className="text-slate-600">Create your account to access India's smartest lending platform</p>
        </div>

        <div className="bg-slate-100 p-1 rounded-lg grid grid-cols-2 gap-1 max-w-md mx-auto mb-8">
            <button onClick={() => setActiveTab('user')} className={`tab-button ${activeTab === 'user' ? 'active' : ''}`}>
                <User className="w-4 h-4" /> User Registration
            </button>
            <button onClick={() => setActiveTab('admin')} className={`tab-button ${activeTab === 'admin' ? 'active' : ''}`}>
                <Building className="w-4 h-4" /> Lender/Admin
            </button>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* --- Common Fields Section --- */}
            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 border-b pb-3 mb-6">Account & KYC Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="form-label">Full Name *</label><input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="form-input" placeholder="Enter your full name" />{errors.fullName && <p className="form-error">{errors.fullName}</p>}</div>
                    <div><label className="form-label">Email Address *</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" placeholder="Enter your email address" />{errors.email && <p className="form-error">{errors.email}</p>}</div>
                    <div><label className="form-label">Password *</label><div className="relative"><input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} className="form-input pr-10" placeholder="Create a strong password" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="form-input-icon">{showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}</button></div>{formData.password && (<div className="mt-2 flex items-center gap-2"><div className="flex-1 bg-slate-200 h-1.5 rounded-full"><div className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`} style={{width: `${(passwordStrength/5)*100}%`}}></div></div><span className="text-xs font-medium text-slate-500">{getPasswordStrengthText()}</span></div>)}{errors.password && <p className="form-error">{errors.password}</p>}</div>
                    <div><label className="form-label">Confirm Password *</label><div className="relative"><input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="form-input pr-10" placeholder="Confirm your password" /><button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="form-input-icon">{showConfirmPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}</button></div>{errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}</div>
                    <div><label className="form-label">Mobile Number *</label><div className="flex"><span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-500">+91</span><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="form-input rounded-l-none" placeholder="10-digit mobile number" maxLength={10}/></div>{errors.phone && <p className="form-error">{errors.phone}</p>}</div>
                    <div><label className="form-label">PAN Number *</label><input type="text" name="panNumber" value={formData.panNumber} onChange={handleInputChange} className="form-input uppercase" placeholder="ABCDE1234F" maxLength={10} />{errors.panNumber && <p className="form-error">{errors.panNumber}</p>}</div>
                     <div className="md:col-span-2"><label className="form-label">Aadhaar Number *</label><input type="text" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleInputChange} className="form-input" placeholder="Enter 12-digit Aadhaar number" maxLength={12}/>{errors.aadhaarNumber && <p className="form-error">{errors.aadhaarNumber}</p>}</div>
                </div>
            </div>
            
            {/* --- User-Specific Fields --- */}
            {activeTab === 'user' && (
              <div className="space-y-6 border-t pt-8">
                <h3 className="text-lg font-semibold text-slate-800 border-b pb-3 mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="form-label">User Type *</label><select name="userType" value={formData.userType || ''} onChange={handleInputChange} className="form-input"><option value="">Select...</option><option value="student">Student</option><option value="working_professional">Working Professional</option><option value="self_employed">Self Employed</option><option value="business_owner">Business Owner</option><option value="retired">Retired</option></select>{errors.userType && <p className="form-error">{errors.userType}</p>}</div>
                    <div><label className="form-label">Date of Birth *</label><input type="date" name="dateOfBirth" value={formData.dateOfBirth || ''} onChange={handleInputChange} className="form-input" />{errors.dateOfBirth && <p className="form-error">{errors.dateOfBirth}</p>}</div>
                    <div><label className="form-label">Monthly Income *</label><select name="monthlyIncome" value={formData.monthlyIncome || ''} onChange={handleInputChange} className="form-input"><option value="">Select range...</option><option value="0-25000">₹0 - ₹25,000</option><option value="25000-50000">₹25,000 - ₹50,000</option><option value="50000-100000">₹50,000 - ₹1,00,000</option><option value="100000+">Above ₹1,00,000</option></select>{errors.monthlyIncome && <p className="form-error">{errors.monthlyIncome}</p>}</div>
                    <div><label className="form-label">Occupation</label><input type="text" name="occupation" value={formData.occupation || ''} onChange={handleInputChange} className="form-input" placeholder="e.g., Software Engineer"/></div>
                    <div className="md:col-span-2"><label className="form-label">Full Address *</label><textarea name="address" value={formData.address || ''} onChange={handleInputChange} rows={3} className="form-input" placeholder="Your full residential address"></textarea>{errors.address && <p className="form-error">{errors.address}</p>}</div>
                    <div><label className="form-label">City *</label><input type="text" name="city" value={formData.city || ''} onChange={handleInputChange} className="form-input"/>{errors.city && <p className="form-error">{errors.city}</p>}</div>
                    <div><label className="form-label">State *</label><input type="text" name="state" value={formData.state || ''} onChange={handleInputChange} className="form-input"/>{errors.state && <p className="form-error">{errors.state}</p>}</div>
                    <div><label className="form-label">Pincode *</label><input type="text" name="pincode" value={formData.pincode || ''} onChange={handleInputChange} className="form-input" maxLength={6}/>{errors.pincode && <p className="form-error">{errors.pincode}</p>}</div>
                </div>
              </div>
            )}

            {/* --- Admin-Specific Fields --- */}
            {activeTab === 'admin' && (
                 <div className="space-y-6 border-t pt-8">
                    <div className="flex justify-between items-center"><h3 className="text-lg font-semibold text-slate-800">Lender/Organization Information</h3><button type="button" onClick={() => setShowSecretKeyModal(true)} className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center gap-1"><Lock className="w-4 h-4"/> Have a Secret Key?</button></div>
                    <div className="notification notification-warning flex items-start gap-3"><AlertCircle className="w-5 h-5 mt-0.5 shrink-0" /><p className="text-sm">Admin registrations require manual verification. Our team will review your documents and contact you within 24-48 hours.</p></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label className="form-label">Organization Type *</label><select name="organizationType" value={formData.organizationType || ''} onChange={handleInputChange} className="form-input"><option value="">Select type...</option><option value="bank">Scheduled Commercial Bank</option><option value="nbfc">NBFC</option><option value="fintech">Fintech Company</option><option value="cooperative">Cooperative Bank</option><option value="mfi">Microfinance Institution</option></select>{errors.organizationType && <p className="form-error">{errors.organizationType}</p>}</div>
                        <div><label className="form-label">Organization Name *</label><input type="text" name="organizationName" value={formData.organizationName || ''} onChange={handleInputChange} className="form-input" />{errors.organizationName && <p className="form-error">{errors.organizationName}</p>}</div>
                        <div><label className="form-label">Registration Number *</label><input type="text" name="organizationRegNumber" value={formData.organizationRegNumber || ''} onChange={handleInputChange} className="form-input" placeholder="CIN/Registration number"/>{errors.organizationRegNumber && <p className="form-error">{errors.organizationRegNumber}</p>}</div>
                        {formData.organizationType === 'nbfc' && (<div><label className="form-label">RBI License Number</label><input type="text" name="rbiLicenseNumber" value={formData.rbiLicenseNumber || ''} onChange={handleInputChange} className="form-input" /></div>)}
                        <div><label className="form-label">Your Designation *</label><input type="text" name="designation" value={formData.designation || ''} onChange={handleInputChange} className="form-input" placeholder="e.g., Manager, VP"/>{errors.designation && <p className="form-error">{errors.designation}</p>}</div>
                        <div><label className="form-label">Work Email *</label><input type="email" name="workEmail" value={formData.workEmail || ''} onChange={handleInputChange} className="form-input" />{errors.workEmail && <p className="form-error">{errors.workEmail}</p>}</div>
                        <div className="md:col-span-2"><label className="form-label">Company Address *</label><textarea name="companyAddress" value={formData.companyAddress || ''} onChange={handleInputChange} rows={3} className="form-input"></textarea>{errors.companyAddress && <p className="form-error">{errors.companyAddress}</p>}</div>
                        {/* More admin address fields if needed */}
                    </div>

                    <div className="space-y-6 pt-6 border-t">
                        <h3 className="text-lg font-semibold text-slate-800">Required Documents</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label className="form-label">Business Registration Certificate *</label><input type="file" onChange={(e) => handleFileChange(e, 'businessRegistrationDoc')} className="form-input" />{errors.businessRegistrationDoc && <p className="form-error">{errors.businessRegistrationDoc}</p>}</div>
                            {formData.organizationType === 'nbfc' && (<div><label className="form-label">RBI License Document *</label><input type="file" onChange={(e) => handleFileChange(e, 'rbiLicenseDoc')} className="form-input"/>{errors.rbiLicenseDoc && <p className="form-error">{errors.rbiLicenseDoc}</p>}</div>)}
                            <div><label className="form-label">Address Proof Document</label><input type="file" onChange={(e) => handleFileChange(e, 'addressProofDoc')} className="form-input" /></div>
                        </div>
                    </div>
                 </div>
            )}
            
            <div className="border-t pt-8 space-y-6">
                <h3 className="text-lg font-semibold text-slate-800">Terms and Agreements</h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-3"><input type="checkbox" id="agreeToTerms" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleInputChange} className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" /><label htmlFor="agreeToTerms" className="text-sm text-slate-600">I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>.</label></div>{errors.agreeToTerms && <p className="form-error pl-7">{errors.agreeToTerms}</p>}
                    <div className="flex items-start gap-3"><input type="checkbox" id="agreeToPrivacy" name="agreeToPrivacy" checked={formData.agreeToPrivacy} onChange={handleInputChange} className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" /><label htmlFor="agreeToPrivacy" className="text-sm text-slate-600">I agree to the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.</label></div>{errors.agreeToPrivacy && <p className="form-error pl-7">{errors.agreeToPrivacy}</p>}
                    <div className="flex items-start gap-3"><input type="checkbox" id="consentDataProcessing" name="consentDataProcessing" checked={formData.consentDataProcessing} onChange={handleInputChange} className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" /><label htmlFor="consentDataProcessing" className="text-sm text-slate-600">I consent to data processing for verification and compliance.</label></div>{errors.consentDataProcessing && <p className="form-error pl-7">{errors.consentDataProcessing}</p>}
                </div>

                <button type="submit" disabled={isLoading} className="btn btn-primary w-full py-3 text-base">
                  {isLoading ? 'Processing...' : (activeTab === 'admin' ? 'Submit for Verification' : 'Create Account')}
                </button>
            </div>
          </form>
        </div>
        {showSecretKeyModal && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
           <div className="bg-white rounded-lg max-w-md w-full p-6 card">
             <h3 className="text-lg font-semibold text-slate-900 mb-4">Enter Secret Key</h3>
             <p className="text-sm text-slate-600 mb-4">If you have received a secret key from Fin-Agentix, enter it below to expedite your registration process.</p>
             <input type="password" placeholder="Enter secret key" value={formData.secretKey || ''} onChange={(e) => setFormData(prev => ({ ...prev, secretKey: e.target.value }))} className="form-input mb-4"/>
             <div className="flex space-x-3">
               <button onClick={() => setShowSecretKeyModal(false)} className="btn btn-ghost w-full">Cancel</button>
               <button onClick={() => {setShowSecretKeyModal(false);}} className="btn btn-primary w-full">Verify Key</button>
             </div>
           </div>
         </div>
       )}
      </div>
       <style>{`.tab-button { display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; transition: all 0.2s; } .tab-button.active { background-color: white; color: #2563eb; box-shadow: 0 1px 3px rgba(0,0,0,0.1); } .tab-button:not(.active):hover { background-color: rgba(203, 213, 225, 0.5); }`}</style>
    </div>
  );
};

export default Register;

