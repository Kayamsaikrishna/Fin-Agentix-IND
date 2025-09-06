
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../config/constants';
import { LoanApplication, LoanScheme } from '../slices/loanSlice';

export const loanApi = createApi({
  reducerPath: 'loanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Loan'],
  endpoints: (builder) => ({
    fetchUserLoans: builder.query<LoanApplication[], void>({
      query: () => '/loans/user',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Loan' as const, id })),
              { type: 'Loan', id: 'LIST' },
            ]
          : [{ type: 'Loan', id: 'LIST' }],
    }),
    fetchLoanSchemes: builder.query<LoanScheme[], void>({
      query: () => '/loans/schemes',
    }),
    submitLoanApplication: builder.mutation<LoanApplication, any>({
      query: (applicationData) => {
        const formData = new FormData();
        Object.keys(applicationData).forEach(key => {
            formData.append(key, applicationData[key]);
        });
        return {
          url: '/loans/apply',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [{ type: 'Loan', id: 'LIST' }],
    }),
  }),
});

export const {
  useFetchUserLoansQuery,
  useFetchLoanSchemesQuery,
  useSubmitLoanApplicationMutation,
} = loanApi;
