export interface LoanStatus {
  id: string;
  status: 'Application Submitted' | 'Under Review' | 'Approved' | 'Rejected';
  date: string;
  notes?: string;
}

export interface LoanApplication {
  id: string;
  sector: string;
  amount: number;
  statusHistory: LoanStatus[];
}
