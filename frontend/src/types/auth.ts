export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: 'user' | 'admin';
  profileComplete: boolean;
  kycStatus: 'pending' | 'in_progress' | 'verified' | 'rejected';
  createdAt: string;
  lastLogin?: string;
  aadhaarNumber?: string;
  panNumber?: string;
  dateOfBirth?: string;
  address?: Address;
  employmentDetails?: EmploymentDetails;
  organizationDetails?: OrganizationDetails;
}

export interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface EmploymentDetails {
  type: 'salaried' | 'self_employed' | 'business' | 'student' | 'retired';
  companyName?: string;
  designation?: string;
  monthlyIncome: number;
  workExperience?: number;
}

export interface OrganizationDetails {
  type: 'bank' | 'nbfc' | 'fintech' | 'cooperative' | 'mfi';
  name: string;
  registrationNumber: string;
  rbiLicenseNumber?: string;
  address: Address;
  designation: string;
  workEmail: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  permissions: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: 'user' | 'admin';
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone: string;
  aadhaarNumber: string;
  panNumber: string;
  role: 'user' | 'admin';
  userType?: 'student' | 'working_professional' | 'self_employed' | 'business_owner' | 'retired';
  dateOfBirth?: string;
  monthlyIncome?: string;
  address?: Address;
  organizationDetails?: Partial<OrganizationDetails>;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
  consentDataProcessing: boolean;
}