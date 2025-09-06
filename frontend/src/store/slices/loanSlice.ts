import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import axios from 'axios';
import { API_URL } from '../../config/constants';

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
  applications: LoanApplication[];
  schemes: LoanScheme[];
  currentApplication: LoanApplication | null;
  loading: boolean;
  error: string | null;
}

// Async thunks
export const fetchUserLoans = createAsyncThunk(
  'loans/fetchUserLoans',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/loans/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch loans');
    }
  }
);

export const fetchLoanSchemes = createAsyncThunk(
  'loans/fetchLoanSchemes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/loans/schemes`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch loan schemes');
    }
  }
);

export const submitLoanApplication = createAsyncThunk(
  'loans/submitLoanApplication',
  async (applicationData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/loans/apply`, applicationData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit loan application');
    }
  }
);

// Initial state
const initialState: LoanState = {
  applications: [],
  schemes: [],
  currentApplication: null,
  loading: false,
  error: null,
};

// Slice
const loanSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {
    setCurrentApplication: (state, action: PayloadAction<LoanApplication | null>) => {
      state.currentApplication = action.payload;
    },
    clearLoanError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user loans
      .addCase(fetchUserLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchUserLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch loan schemes
      .addCase(fetchLoanSchemes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoanSchemes.fulfilled, (state, action) => {
        state.loading = false;
        state.schemes = action.payload;
      })
      .addCase(fetchLoanSchemes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Submit loan application
      .addCase(submitLoanApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitLoanApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.applications.push(action.payload);
        state.currentApplication = action.payload;
      })
      .addCase(submitLoanApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Actions
export const { setCurrentApplication, clearLoanError } = loanSlice.actions;

// Selectors
export const selectLoans = (state: RootState) => state.loans.applications;
export const selectLoanSchemes = (state: RootState) => state.loans.schemes;
export const selectCurrentApplication = (state: RootState) => state.loans.currentApplication;
export const selectLoanLoading = (state: RootState) => state.loans.loading;
export const selectLoanError = (state: RootState) => state.loans.error;

export default loanSlice.reducer;