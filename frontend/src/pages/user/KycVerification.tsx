import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Info,
  Camera,
  X,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  User,
  CreditCard,
  MapPin
} from 'lucide-react';

interface FormData {
  fullName: string;
  dob: string;
  gender: string;
  aadhaarNumber: string;
  panNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  documents: {
    aadhaarFront?: File;
    aadhaarBack?: File;
    panCard?: File;
    addressProof?: File;
    photo?: File;
  };
  termsAccepted: boolean;
}

interface FormErrors {
  fullName?: string;
  dob?: string;
  gender?: string;
  aadhaarNumber?: string;
  panNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  documents?: {
    aadhaarFront?: string;
    aadhaarBack?: string;
    panCard?: string;
    addressProof?: string;
    photo?: string;
  };
  termsAccepted?: string;
}

const KycVerification: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    dob: '',
    gender: '',
    aadhaarNumber: '',
    panNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    documents: {},
    termsAccepted: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationSubmitted, setVerificationSubmitted] = useState(false);
  const [documentPreviews, setDocumentPreviews] = useState<{[key: string]: string}>({});
  
  // Steps configuration
  const steps = [
    { id: 1, name: 'Personal Information', icon: <User className="w-5 h-5" /> },
    { id: 2, name: 'ID Verification', icon: <CreditCard className="w-5 h-5" /> },
    { id: 3, name: 'Address Details', icon: <MapPin className="w-5 h-5" /> },
    { id: 4, name: 'Document Upload', icon: <FileText className="w-5 h-5" /> },
    { id: 5, name: 'Review & Submit', icon: <CheckCircle className="w-5 h-5" /> }
  ];
  
  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
    
    // Clear error when user checks
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Handle file uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [documentType]: 'Invalid file type. Please upload JPG, PNG or PDF.'
        }
      }));
      return;
    }
    
    if (file.size > maxSize) {
      setErrors(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [documentType]: 'File size exceeds 5MB limit.'
        }
      }));
      return;
    }
    
    // Update form data with file
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file
      }
    }));
    
    // Clear error
    if (errors.documents?.[documentType as keyof typeof errors.documents]) {
      setErrors(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [documentType]: undefined
        }
      }));
    }
    
    // Create preview URL for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocumentPreviews(prev => ({
          ...prev,
          [documentType]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    } else {
      // For PDFs, just store the filename
      setDocumentPreviews(prev => ({
        ...prev,
        [documentType]: `PDF: ${file.name}`
      }));
    }
  };
  
  // Remove uploaded file
  const removeFile = (documentType: string) => {
    setFormData(prev => {
      const newDocuments = { ...prev.documents };
      delete newDocuments[documentType as keyof typeof newDocuments];
      return {
        ...prev,
        documents: newDocuments
      };
    });
    
    setDocumentPreviews(prev => {
      const newPreviews = { ...prev };
      delete newPreviews[documentType];
      return newPreviews;
    });
  };
  
  // Validate current step
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    
    if (step === 1) {
      // Personal Information validation
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    }
    
    else if (step === 2) {
      // ID Verification validation
      if (!formData.aadhaarNumber.trim()) {
        newErrors.aadhaarNumber = 'Aadhaar number is required';
      } else if (!/^\d{4}[\s-]?\d{4}[\s-]?\d{4}$/.test(formData.aadhaarNumber.replace(/\s/g, ''))) {
        newErrors.aadhaarNumber = 'Invalid Aadhaar number format';
      }
      
      if (!formData.panNumber.trim()) {
        newErrors.panNumber = 'PAN number is required';
      } else if (!/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(formData.panNumber.toUpperCase())) {
        newErrors.panNumber = 'Invalid PAN number format';
      }
    }
    
    else if (step === 3) {
      // Address Details validation
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      
      if (!formData.pincode.trim()) {
        newErrors.pincode = 'Pincode is required';
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = 'Pincode must be 6 digits';
      }
    }
    
    else if (step === 4) {
      // Document Upload validation
      const requiredDocs = ['aadhaarFront', 'aadhaarBack', 'panCard'];
      const docErrors: {[key: string]: string} = {};
      
      requiredDocs.forEach(doc => {
        if (!formData.documents[doc as keyof typeof formData.documents]) {
          docErrors[doc] = `${doc.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
        }
      });
      
      if (Object.keys(docErrors).length > 0) {
        newErrors.documents = docErrors;
      }
    }
    
    else if (step === 5) {
      // Review & Submit validation
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = 'You must accept the terms and conditions';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle next step
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Handle previous step
  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setVerificationSubmitted(true);
      window.scrollTo(0, 0);
    }, 2000);
  };
  
  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name (as per ID)</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="form-input w-full rounded-md"
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="error-message mt-1">{errors.fullName}</p>}
              </div>
              
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="form-input w-full rounded-md"
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.dob && <p className="error-message mt-1">{errors.dob}</p>}
              </div>
              
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="form-select w-full rounded-md"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
                {errors.gender && <p className="error-message mt-1">{errors.gender}</p>}
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Please ensure that all information provided matches your official identification documents. Any discrepancies may delay your verification process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">ID Verification</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="aadhaarNumber" className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
                <input
                  type="text"
                  id="aadhaarNumber"
                  name="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={handleInputChange}
                  className="form-input w-full rounded-md"
                  placeholder="XXXX XXXX XXXX"
                  maxLength={14}
                />
                {errors.aadhaarNumber && <p className="error-message mt-1">{errors.aadhaarNumber}</p>}
                <p className="text-xs text-gray-500 mt-1">Format: XXXX XXXX XXXX</p>
              </div>
              
              <div>
                <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                <input
                  type="text"
                  id="panNumber"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  className="form-input w-full rounded-md"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
                {errors.panNumber && <p className="error-message mt-1">{errors.panNumber}</p>}
                <p className="text-xs text-gray-500 mt-1">Format: ABCDE1234F</p>
              </div>
            </div>
            
            <div className="mt-6 bg-yellow-50 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Your ID information is securely stored and encrypted. We will verify this information against the documents you upload in the next steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Address Details</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-textarea w-full rounded-md"
                  placeholder="Enter your full address"
                />
                {errors.address && <p className="error-message mt-1">{errors.address}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="form-input w-full rounded-md"
                    placeholder="City"
                  />
                  {errors.city && <p className="error-message mt-1">{errors.city}</p>}
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="form-input w-full rounded-md"
                    placeholder="State"
                  />
                  {errors.state && <p className="error-message mt-1">{errors.state}</p>}
                </div>
                
                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="form-input w-full rounded-md"
                    placeholder="6-digit pincode"
                    maxLength={6}
                  />
                  {errors.pincode && <p className="error-message mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Your address will be verified against the address proof document you upload. Please ensure the information matches exactly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Document Upload</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Aadhaar Front */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Aadhaar Card (Front)</h3>
                  
                  {documentPreviews.aadhaarFront ? (
                    <div className="relative">
                      {documentPreviews.aadhaarFront.startsWith('data:image') ? (
                        <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden bg-gray-100">
                          <img 
                            src={documentPreviews.aadhaarFront} 
                            alt="Aadhaar Front" 
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-24 bg-gray-100 rounded-md">
                          <FileText className="h-8 w-8 text-gray-400" />
                          <span className="ml-2 text-sm text-gray-500">{documentPreviews.aadhaarFront}</span>
                        </div>
                      )}
                      
                      <button
                        type="button"
                        onClick={() => removeFile('aadhaarFront')}
                        className="absolute top-2 right-2 bg-red-100 rounded-full p-1 text-red-600 hover:bg-red-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <label className="block w-full cursor-pointer">
                        <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 bg-gray-50">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload Aadhaar front</p>
                          <p className="text-xs text-gray-400 mt-1">JPG, PNG or PDF (max 5MB)</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png,application/pdf"
                          onChange={(e) => handleFileUpload(e, 'aadhaarFront')}
                        />
                      </label>
                      {errors.documents?.aadhaarFront && (
                        <p className="error-message mt-1">{errors.documents.aadhaarFront}</p>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Aadhaar Back */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Aadhaar Card (Back)</h3>
                  
                  {documentPreviews.aadhaarBack ? (
                    <div className="relative">
                      {documentPreviews.aadhaarBack.startsWith('data:image') ? (
                        <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden bg-gray-100">
                          <img 
                            src={documentPreviews.aadhaarBack} 
                            alt="Aadhaar Back" 
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-24 bg-gray-100 rounded-md">
                          <FileText className="h-8 w-8 text-gray-400" />
                          <span className="ml-2 text-sm text-gray-500">{documentPreviews.aadhaarBack}</span>
                        </div>
                      )}
                      
                      <button
                        type="button"
                        onClick={() => removeFile('aadhaarBack')}
                        className="absolute top-2 right-2 bg-red-100 rounded-full p-1 text-red-600 hover:bg-red-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <label className="block w-full cursor-pointer">
                        <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 bg-gray-50">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload Aadhaar back</p>
                          <p className="text-xs text-gray-400 mt-1">JPG, PNG or PDF (max 5MB)</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png,application/pdf"
                          onChange={(e) => handleFileUpload(e, 'aadhaarBack')}
                        />
                      </label>
                      {errors.documents?.aadhaarBack && (
                        <p className="error-message mt-1">{errors.documents.aadhaarBack}</p>
                      )}
                    </div>
                  )}
                </div>
                
                {/* PAN Card */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">PAN Card</h3>
                  
                  {documentPreviews.panCard ? (
                    <div className="relative">
                      {documentPreviews.panCard.startsWith('data:image') ? (
                        <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden bg-gray-100">
                          <img 
                            src={documentPreviews.panCard} 
                            alt="PAN Card" 
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-24 bg-gray-100 rounded-md">
                          <FileText className="h-8 w-8 text-gray-400" />
                          <span className="ml-2 text-sm text-gray-500">{documentPreviews.panCard}</span>
                        </div>
                      )}
                      
                      <button
                        type="button"
                        onClick={() => removeFile('panCard')}
                        className="absolute top-2 right-2 bg-red-100 rounded-full p-1 text-red-600 hover:bg-red-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <label className="block w-full cursor-pointer">
                        <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 bg-gray-50">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload PAN card</p>
                          <p className="text-xs text-gray-400 mt-1">JPG, PNG or PDF (max 5MB)</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png,application/pdf"
                          onChange={(e) => handleFileUpload(e, 'panCard')}
                        />
                      </label>
                      {errors.documents?.panCard && (
                        <p className="error-message mt-1">{errors.documents.panCard}</p>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Address Proof (Optional) */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Address Proof
                    <span className="text-xs font-normal text-gray-500 ml-2">(Optional)</span>
                  </h3>
                  
                  {documentPreviews.addressProof ? (
                    <div className="relative">
                      {documentPreviews.addressProof.startsWith('data:image') ? (
                        <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden bg-gray-100">
                          <img 
                            src={documentPreviews.addressProof} 
                            alt="Address Proof" 
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-24 bg-gray-100 rounded-md">
                          <FileText className="h-8 w-8 text-gray-400" />
                          <span className="ml-2 text-sm text-gray-500">{documentPreviews.addressProof}</span>
                        </div>
                      )}
                      
                      <button
                        type="button"
                        onClick={() => removeFile('addressProof')}
                        className="absolute top-2 right-2 bg-red-100 rounded-full p-1 text-red-600 hover:bg-red-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <label className="block w-full cursor-pointer">
                        <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 bg-gray-50">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload address proof</p>
                          <p className="text-xs text-gray-400 mt-1">Utility bill, bank statement, etc.</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png,application/pdf"
                          onChange={(e) => handleFileUpload(e, 'addressProof')}
                        />
                      </label>
                      {errors.documents?.addressProof && (
                        <p className="error-message mt-1">{errors.documents.addressProof}</p>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Photo */}
                <div className="border border-gray-200 rounded-lg p-4 md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Your Photo
                    <span className="text-xs font-normal text-gray-500 ml-2">(Optional)</span>
                  </h3>
                  
                  <div className="flex items-center">
                    <div className="w-1/3">
                      {documentPreviews.photo ? (
                        <div className="relative">
                          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mx-auto">
                            <img 
                              src={documentPreviews.photo} 
                              alt="User Photo" 
                              className="object-cover w-full h-full"
                            />
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => removeFile('photo')}
                            className="absolute top-0 right-0 bg-red-100 rounded-full p-1 text-red-600 hover:bg-red-200"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                          <User className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="w-2/3 pl-6">
                      <p className="text-sm text-gray-700 mb-4">
                        Upload a clear photo of yourself. This will be used for verification purposes.
                      </p>
                      
                      <label className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                        <Camera className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                        Upload Photo
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png"
                          onChange={(e) => handleFileUpload(e, 'photo')}
                        />
                      </label>
                      
                      {errors.documents?.photo && (
                        <p className="error-message mt-2">{errors.documents.photo}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-yellow-50 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Please ensure all documents are clear, legible, and show all four corners. Blurry or incomplete documents may delay your verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Review & Submit</h2>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-sm text-gray-900">{formData.fullName}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                  <p className="text-sm text-gray-900">{formData.dob}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Gender</p>
                  <p className="text-sm text-gray-900">{formData.gender}</p>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-4">ID Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Aadhaar Number</p>
                  <p className="text-sm text-gray-900">{formData.aadhaarNumber}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">PAN Number</p>
                  <p className="text-sm text-gray-900">{formData.panNumber}</p>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-4">Address</h3>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Complete Address</p>
                <p className="text-sm text-gray-900">{formData.address}</p>
                <p className="text-sm text-gray-900 mt-1">
                  {formData.city}, {formData.state}, {formData.pincode}
                </p>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-4">Uploaded Documents</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Aadhaar Card (Front)</p>
                  <p className="text-sm text-gray-900">
                    {formData.documents.aadhaarFront?.name || 'Not uploaded'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Aadhaar Card (Back)</p>
                  <p className="text-sm text-gray-900">
                    {formData.documents.aadhaarBack?.name || 'Not uploaded'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">PAN Card</p>
                  <p className="text-sm text-gray-900">
                    {formData.documents.panCard?.name || 'Not uploaded'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Address Proof</p>
                  <p className="text-sm text-gray-900">
                    {formData.documents.addressProof?.name || 'Not uploaded'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Photo</p>
                  <p className="text-sm text-gray-900">
                    {formData.documents.photo?.name || 'Not uploaded'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
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
                    I confirm that all information provided is accurate and authentic. I authorize FinAgentix to verify this information with relevant authorities.
                  </label>
                  {errors.termsAccepted && <p className="error-message mt-1">{errors.termsAccepted}</p>}
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Your KYC verification typically takes 24-48 hours to process. You will be notified once the verification is complete.
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
  
  // Render success message after verification submission
  const renderSuccessMessage = () => {
    return (
      <div className="text-center py-10">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your KYC verification request has been successfully submitted. We will review your information and documents within 24-48 hours.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Verification Reference ID:</p>
            <p className="text-lg font-medium">KYC-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
          </div>
          
          <div className="space-y-4">
            <Link to="/dashboard" className="btn btn-primary w-full">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {verificationSubmitted ? (
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
                        Submit Verification
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

export default KycVerification;