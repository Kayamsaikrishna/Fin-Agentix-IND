export interface Loan {
  id: string;
  sector: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  applicationDate: string;
  lastUpdated: string;
  interestRate?: number;
  tenure?: number;
  emi?: number;
  disbursementDate?: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: string;
  read: boolean;
}

export interface UserDetails {
  name: string;
  email: string;
  phone: string;
  kycVerified: boolean;
  profileComplete: boolean;
  lastLogin: string;
}
