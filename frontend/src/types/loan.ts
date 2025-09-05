export interface LoanApplication {
  id: string;
  userId: string;
  loanType: LoanType;
  amount: number;
  purpose: string;
  tenure: number;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'disbursed';
  applicationDate: string;
  approvalDate?: string;
  disbursementDate?: string;
  interestRate?: number;
  emi?: number;
  documents: Document[];
  riskScore?: number;
  aiAssessment?: AIAssessment;
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
  };
}

export interface LoanOffer {
  id: string;
  lenderId: string;
  lenderName: string;
  amount: number;
  interestRate: number;
  tenure: number;
  emi: number;
  processingFee: number;
  features: string[];
  validUntil: string;
}