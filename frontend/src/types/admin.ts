export interface AdminStats {
  totalApplications: number;
  approvedLoans: number;
  pendingReviews: number;
  rejectedApplications: number;
  totalDisbursed: number;
  activeLoans: number;
  defaultRate: number;
  averageProcessingTime: number;
}

export interface RecentApplication {
  id: string;
  applicant: string;
  amount: number;
  sector: string;
  status: string;
  date: string;
}

export interface SectorPerformance {
  sector: string;
  applications: number;
  approved: number;
  disbursed: number;
  growth: number;
}
