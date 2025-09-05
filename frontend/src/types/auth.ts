export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: 'user' | 'admin';
  profileComplete: boolean;
  kycStatus: 'pending' | 'verified' | 'rejected';
  createdAt: string;
  lastLogin?: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  aadhaarNumber: string;
  panNumber: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  occupation: string;
  monthlyIncome: string;
  employmentType: 'salaried' | 'self_employed' | 'business' | 'student' | 'retired';
  documents: Document[];
}

export interface AdminProfile {
  id: string;
  userId: string;
  organizationType: 'bank' | 'nbfc' | 'fintech' | 'cooperative' | 'mfi';
  organizationName: string;
  organizationRegNumber: string;
  rbiLicenseNumber?: string;
  designation: string;
  workEmail: string;
  companyAddress: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  permissions: string[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}