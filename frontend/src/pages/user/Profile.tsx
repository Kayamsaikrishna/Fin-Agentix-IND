import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Shield,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Upload,
  Camera
} from 'lucide-react';

interface UserProfile {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    dob: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    gender: string;
    profileImage?: string;
  };
  kycDetails: {
    status: 'verified' | 'pending' | 'rejected' | 'not_submitted';
    aadhaarNumber: string;
    panNumber: string;
    documents: {
      aadhaarCard?: string;
      panCard?: string;
      addressProof?: string;
      photo?: string;
    };
    verificationDate?: string;
    rejectionReason?: string;
  };
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    accountType: string;
    accountHolderName: string;
  };
  securitySettings: {
    lastPasswordChange: string;
    twoFactorEnabled: boolean;
    recoveryEmail?: string;
    recoveryPhone?: string;
  };
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    personalInfo: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91 9876543210',
      dob: '1990-05-15',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      gender: 'Male',
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    kycDetails: {
      status: 'verified',
      aadhaarNumber: '1234-5678-9012',
      panNumber: 'ABCDE1234F',
      documents: {
        aadhaarCard: 'aadhaar_card.pdf',
        panCard: 'pan_card.pdf',
        addressProof: 'address_proof.pdf',
        photo: 'photo.jpg'
      },
      verificationDate: '2023-04-10T14:30:00'
    },
    bankDetails: {
      accountNumber: 'XXXX-XXXX-7890',
      ifscCode: 'SBIN0001234',
      bankName: 'State Bank of India',
      accountType: 'Savings',
      accountHolderName: 'John Doe'
    },
    securitySettings: {
      lastPasswordChange: '2023-05-20T10:15:00',
      twoFactorEnabled: true,
      recoveryEmail: 'recovery.john@example.com',
      recoveryPhone: '+91 8765432109'
    }
  });
  
  const [editMode, setEditMode] = useState({
    personalInfo: false,
    bankDetails: false
  });
  
  const [tempProfile, setTempProfile] = useState<UserProfile>(profile);
  const [activeTab, setActiveTab] = useState('personal');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  // Reset temp profile when edit mode changes
  useEffect(() => {
    setTempProfile(profile);
  }, [profile]);
  
  // Handle input change for editable fields
  const handleInputChange = (section: string, field: string, value: string) => {
    setTempProfile(prev => {
      const newProfile = { ...prev };
      if (section === 'personalInfo') {
        newProfile.personalInfo = { ...newProfile.personalInfo, [field]: value };
      } else if (section === 'bankDetails') {
        newProfile.bankDetails = { ...newProfile.bankDetails, [field]: value };
      }
      return newProfile;
    });
  };
  
  // Toggle edit mode for a section
  const toggleEditMode = (section: 'personalInfo' | 'bankDetails') => {
    setEditMode(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
    
    // Reset temp profile if cancelling edit
    if (editMode[section]) {
      setTempProfile(profile);
    }
    
    // Clear any previous success messages or errors
    setSuccessMessage('');
    setErrors({});
  };
  
  // Validate form fields
  const validateFields = (section: string) => {
    const newErrors: {[key: string]: string} = {};
    
    if (section === 'personalInfo') {
      const { name, email, phone, pincode } = tempProfile.personalInfo;
      
      if (!name.trim()) newErrors.name = 'Name is required';
      if (!email.trim()) newErrors.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email format';
      
      if (!phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!/^\+?[0-9\s-]{10,15}$/.test(phone)) newErrors.phone = 'Invalid phone format';
      
      if (pincode && !/^[0-9]{6}$/.test(pincode)) newErrors.pincode = 'Pincode must be 6 digits';
    }
    
    if (section === 'bankDetails') {
      const { accountNumber, ifscCode, accountHolderName } = tempProfile.bankDetails;
      
      if (!accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
      if (!ifscCode.trim()) newErrors.ifscCode = 'IFSC code is required';
      else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) newErrors.ifscCode = 'Invalid IFSC format';
      
      if (!accountHolderName.trim()) newErrors.accountHolderName = 'Account holder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Save changes
  const saveChanges = (section: string) => {
    if (!validateFields(section)) return;
    
    // Simulate API call
    setTimeout(() => {
      setProfile(tempProfile);
      toggleEditMode(section as 'personalInfo' | 'bankDetails');
      setSuccessMessage(`${section === 'personalInfo' ? 'Personal information' : 'Bank details'} updated successfully!`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };
  
  // Handle file upload
  const handleFileUpload = (documentType: string) => {
    // Simulate file upload
    setIsUploading(true);
    
    setTimeout(() => {
      setIsUploading(false);
      
      // Update document in profile
      setProfile(prev => {
        const newProfile = { ...prev };
        newProfile.kycDetails.documents = {
          ...newProfile.kycDetails.documents,
          [documentType]: `${documentType}_${Date.now()}.pdf`
        };
        return newProfile;
      });
      
      setSuccessMessage('Document uploaded successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 2000);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };
  
  // Get KYC status badge
  const getKycStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <X className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Not Submitted
          </span>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
        
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-md bg-green-50 border border-green-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{successMessage}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="md:flex">
            <div className="md:flex-shrink-0 p-6 flex items-center justify-center">
              <div className="relative">
                <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100">
                  {profile.personalInfo.profileImage ? (
                    <img 
                      src={profile.personalInfo.profileImage} 
                      alt="Profile" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-blue-100">
                      <User className="h-16 w-16 text-blue-500" />
                    </div>
                  )}
                </div>
                <button 
                  className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => handleFileUpload('photo')}
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="p-6 md:p-8 md:flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{profile.personalInfo.name}</h2>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Mail className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {profile.personalInfo.email}
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Phone className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {profile.personalInfo.phone}
                  </div>
                </div>
                
                <div className="flex-shrink-0 flex">
                  {getKycStatusBadge(profile.kycDetails.status)}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'personal' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setActiveTab('personal')}
              >
                <User className="inline-block w-4 h-4 mr-2" />
                Personal Information
              </button>
              
              <button
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'kyc' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setActiveTab('kyc')}
              >
                <FileText className="inline-block w-4 h-4 mr-2" />
                KYC Details
              </button>
              
              <button
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'bank' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setActiveTab('bank')}
              >
                <MapPin className="inline-block w-4 h-4 mr-2" />
                Bank Details
              </button>
              
              <button
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'security' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setActiveTab('security')}
              >
                <Shield className="inline-block w-4 h-4 mr-2" />
                Security Settings
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                  
                  <button
                    type="button"
                    onClick={() => toggleEditMode('personalInfo')}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {editMode.personalInfo ? (
                      <>
                        <X className="-ml-0.5 mr-2 h-4 w-4" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit className="-ml-0.5 mr-2 h-4 w-4" />
                        Edit
                      </>
                    )}
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    {editMode.personalInfo ? (
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={tempProfile.personalInfo.name}
                          onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                          className="mt-1 form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                      </div>
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.personalInfo.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    {editMode.personalInfo ? (
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={tempProfile.personalInfo.email}
                          onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                          className="mt-1 form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                      </div>
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.personalInfo.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    {editMode.personalInfo ? (
                      <div>
                        <input
                          type="text"
                          name="phone"
                          value={tempProfile.personalInfo.phone}
                          onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                          className="mt-1 form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                      </div>
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.personalInfo.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    {editMode.personalInfo ? (
                      <input
                        type="date"
                        name="dob"
                        value={tempProfile.personalInfo.dob}
                        onChange={(e) => handleInputChange('personalInfo', 'dob', e.target.value)}
                        className="mt-1 form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{formatDate(profile.personalInfo.dob)}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    {editMode.personalInfo ? (
                      <select
                        name="gender"
                        value={tempProfile.personalInfo.gender}
                        onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.personalInfo.gender}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    {editMode.personalInfo ? (
                      <textarea
                        name="address"
                        rows={2}
                        value={tempProfile.personalInfo.address}
                        onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                        className="mt-1 form-textarea block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.personalInfo.address}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    {editMode.personalInfo ? (
                      <input
                        type="text"
                        name="city"
                        value={tempProfile.personalInfo.city}
                        onChange={(e) => handleInputChange('personalInfo', 'city', e.target.value)}
                        className="mt-1 form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.personalInfo.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    {editMode.personalInfo ? (
                      <input
                        type="text"
                        name="state"
                        value={tempProfile.personalInfo.state}
                        onChange={(e) => handleInputChange('personalInfo', 'state', e.target.value)}
                        className="mt-1 form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.personalInfo.state}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Pincode</label>
                    {editMode.personalInfo ? (
                      <div>
                        <input
                          type="text"
                          name="pincode"
                          value={tempProfile.personalInfo.pincode}
                          onChange={(e) => handleInputChange('personalInfo', 'pincode', e.target.value)}
                          className="mt-1 form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>}
                      </div>
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.personalInfo.pincode}</p>
                    )}
                  </div>
                </div>
                
                {editMode.personalInfo && (
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => saveChanges('personalInfo')}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Save className="-ml-1 mr-2 h-4 w-4" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* KYC Details Tab */}
            {activeTab === 'kyc' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">KYC Details</h3>
                  <div>{getKycStatusBadge(profile.kycDetails.status)}</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
                    <p className="mt-1 text-sm text-gray-900">{profile.kycDetails.aadhaarNumber}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">PAN Number</label>
                    <p className="mt-1 text-sm text-gray-900">{profile.kycDetails.panNumber}</p>
                  </div>
                  
                  {profile.kycDetails.status === 'verified' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Verification Date</label>
                      <p className="mt-1 text-sm text-gray-900">{formatDate(profile.kycDetails.verificationDate || '')}</p>
                    </div>
                  )}
                  
                  {profile.kycDetails.status === 'rejected' && profile.kycDetails.rejectionReason && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Rejection Reason</label>
                      <p className="mt-1 text-sm text-red-600">{profile.kycDetails.rejectionReason}</p>
                    </div>
                  )}
                </div>
                
                <h4 className="text-md font-medium text-gray-900 mb-4">Documents</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Aadhaar Card</h5>
                        <p className="text-xs text-gray-500 mt-1">
                          {profile.kycDetails.documents.aadhaarCard || 'Not uploaded'}
                        </p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => handleFileUpload('aadhaarCard')}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-700 mr-2"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="-ml-0.5 mr-2 h-3 w-3" />
                            Upload
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">PAN Card</h5>
                        <p className="text-xs text-gray-500 mt-1">
                          {profile.kycDetails.documents.panCard || 'Not uploaded'}
                        </p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => handleFileUpload('panCard')}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-700 mr-2"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="-ml-0.5 mr-2 h-3 w-3" />
                            Upload
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Address Proof</h5>
                        <p className="text-xs text-gray-500 mt-1">
                          {profile.kycDetails.documents.addressProof || 'Not uploaded'}
                        </p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => handleFileUpload('addressProof')}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-700 mr-2"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="-ml-0.5 mr-2 h-3 w-3" />
                            Upload
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Photo ID</h5>
                        <p className="text-xs text-gray-500 mt-1">
                          {profile.kycDetails.documents.photo || 'Not uploaded'}
                        </p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => handleFileUpload('photo')}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-700 mr-2"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="-ml-0.5 mr-2 h-3 w-3" />
                            Upload
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                {profile.kycDetails.status !== 'verified' && (
                  <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">KYC Verification Required</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            Please upload all required documents to complete your KYC verification. This is necessary to apply for loans and access all features.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Bank Details Tab */}
            {activeTab === 'bank' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Bank Details</h3>
                  
                  <button
                    type="button"
                    onClick={() => toggleEditMode('bankDetails')}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {editMode.bankDetails ? (
                      <>
                        <X className="-ml-0.5 mr-2 h-4 w-4" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit className="-ml-0.5 mr-2 h-4 w-4" />
                        Edit
                      </>
                    )}
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Account Holder Name</label>
                    {editMode.bankDetails ? (
                      <div>
                        <input
                          type="text"
                          name="accountHolderName"
                          value={tempProfile.bankDetails.accountHolderName}
                          onChange={(e) => handleInputChange('bankDetails', 'accountHolderName', e.target.value)}
                          className="mt-1 form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.accountHolderName && <p className="mt-1 text-sm text-red-600">{errors.accountHolderName}</p>}
                      </div>
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.bankDetails.accountHolderName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Account Number</label>
                    {editMode.bankDetails ? (
                      <div>
                        <input
                          type="text"
                          name="accountNumber"
                          value={tempProfile.bankDetails.accountNumber}
                          onChange={(e) => handleInputChange('bankDetails', 'accountNumber', e.target.value)}
                          className="mt-1 form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.accountNumber && <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>}
                      </div>
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.bankDetails.accountNumber}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
                    {editMode.bankDetails ? (
                      <div>
                        <input
                          type="text"
                          name="ifscCode"
                          value={tempProfile.bankDetails.ifscCode}
                          onChange={(e) => handleInputChange('bankDetails', 'ifscCode', e.target.value)}
                          className="mt-1 form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.ifscCode && <p className="mt-1 text-sm text-red-600">{errors.ifscCode}</p>}
                      </div>
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.bankDetails.ifscCode}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                    {editMode.bankDetails ? (
                      <input
                        type="text"
                        name="bankName"
                        value={tempProfile.bankDetails.bankName}
                        onChange={(e) => handleInputChange('bankDetails', 'bankName', e.target.value)}
                        className="mt-1 form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.bankDetails.bankName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Account Type</label>
                    {editMode.bankDetails ? (
                      <select
                        name="accountType"
                        value={tempProfile.bankDetails.accountType}
                        onChange={(e) => handleInputChange('bankDetails', 'accountType', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="Savings">Savings</option>
                        <option value="Current">Current</option>
                        <option value="Salary">Salary</option>
                      </select>
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profile.bankDetails.accountType}</p>
                    )}
                  </div>
                </div>
                
                {editMode.bankDetails && (
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => saveChanges('bankDetails')}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Save className="-ml-1 mr-2 h-4 w-4" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Security Settings Tab */}
            {activeTab === 'security' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Security Settings</h3>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Password</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Last changed: {formatDate(profile.securitySettings.lastPasswordChange)}
                        </p>
                      </div>
                      
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {profile.securitySettings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                        </p>
                      </div>
                      
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {profile.securitySettings.twoFactorEnabled ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Recovery Email</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {profile.securitySettings.recoveryEmail || 'Not set'}
                        </p>
                      </div>
                      
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Recovery Phone</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {profile.securitySettings.recoveryPhone || 'Not set'}
                        </p>
                      </div>
                      
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Login Sessions</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Manage your active login sessions
                        </p>
                      </div>
                      
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        View Sessions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;