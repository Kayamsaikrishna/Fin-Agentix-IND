
export interface EPFOData {
  uan: string;
  memberId: string;
  employer: string;
  contribution: number;
}

export interface GstProfileResponse {
  gstin: string;
  legalName: string;
  tradeName: string;
  registrationDate: string;
  isActive: boolean;
}

export interface ItrVerificationResponse {
  pan: string;
  assessmentYear: string;
  isFiled: boolean;
  filingDate: string;
  income: number;
}

export interface GSTData {
  gstin: string;
  filingStatus: string;
  turnover: number;
}

export interface ITRData {
  pan: string;
  assessmentYear: string;
  income: number;
  taxPaid: number;
}
