export interface LoanApplication {
  id: string;
  userId: string;
  loanType: LoanType;
  amount: number;
  purpose: string;
  tenure: number;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'disbursed' | 'closed';
  applicationDate: string;
  approvalDate?: string;
  disbursementDate?: string;
  interestRate?: number;
  emi?: number;
  documents: LoanDocument[];
  riskScore?: number;
  aiAssessment?: AIAssessment;
  lenderOffers?: LoanOffer[];
  repaymentSchedule?: RepaymentSchedule[];
}

export interface LoanType {
  id: string;
  name: string;
  category: 'personal' | 'home' | 'vehicle' | 'business' | 'education' | 'agriculture' | 'gold' | 'microfinance' | 'credit_card' | 'two_wheeler' | 'healthcare' | 'digital';
  minAmount: number;
  maxAmount: number;
  minTenure: number;
  maxTenure: number;
  interestRateRange: {
    min: number;
    max: number;
  };
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  processingTime: string;
  description: string;
  features: string[];
  isActive: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoanDocument {
  id: string;
  name: string;
  type: string;
  category: 'identity' | 'address' | 'income' | 'business' | 'collateral' | 'other';
  url: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: string;
  verifiedAt?: string;
  rejectionReason?: string;
}

export interface AIAssessment {
  creditScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  approvalProbability: number;
  recommendedAmount: number;
  recommendedTenure: number;
  factors: {
    positive: string[];
    negative: string[];
    neutral: string[];
  };
  dataPoints: {
    creditHistory: number;
    incomeStability: number;
    debtToIncomeRatio: number;
    employmentHistory: number;
    alternativeData: number;
  };
  confidence: number;
  processedAt: string;
}

export interface LoanOffer {
  id: string;
  lenderId: string;
  lenderName: string;
  lenderType: 'bank' | 'nbfc' | 'fintech';
  amount: number;
  interestRate: number;
  tenure: number;
  emi: number;
  processingFee: number;
  features: string[];
  terms: string[];
  validUntil: string;
  ranking: number;
  isRecommended: boolean;
}

export interface RepaymentSchedule {
  installmentNumber: number;
  dueDate: string;
  principalAmount: number;
  interestAmount: number;
  totalAmount: number;
  status: 'pending' | 'paid' | 'overdue' | 'partial';
  paidDate?: string;
  paidAmount?: number;
}

export interface LoanScheme {
  id: string;
  name: string;
  description: string;
  category: string;
  eligibility: string[];
  benefits: string[];
  interestRate: number;
  maxAmount: number;
  tenure: number;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  applicationsCount: number;
  approvalRate: number;
}