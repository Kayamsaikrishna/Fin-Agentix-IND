
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

// Types
export interface LoanApplication {
  id: string;
  userId: string;
  loanType: string;
  amount: number;
  tenure: number;
  purpose: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'disbursed';
  interestRate: number;
  emi: number;
  applicationDate: string;
  lastUpdated: string;
  documents: {
    id: string;
    type: string;
    name: string;
    url: string;
    uploadDate: string;
    status: 'pending' | 'verified' | 'rejected';
  }[];
}

export interface LoanScheme {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  minTenure: number;
  maxTenure: number;
  interestRate: number;
  processingFee: number;
  eligibility: string;
  documents: string[];
  features: string[];
}

interface LoanState {
  currentApplication: LoanApplication | null;
}

// Initial state
const initialState: LoanState = {
  currentApplication: null,
};

// Slice
const loanSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {
    setCurrentApplication: (state, action: PayloadAction<LoanApplication | null>) => {
      state.currentApplication = action.payload;
    },
  },
});

// Actions
export const { setCurrentApplication } = loanSlice.actions;

// Selectors
export const selectCurrentApplication = (state: RootState) => state.loans.currentApplication;

export default loanSlice.reducer;
