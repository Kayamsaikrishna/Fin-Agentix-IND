
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';

const apiClient = axios.create({
  baseURL: process.env.SECTORS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.SECTORS_API_KEY,
  },
});

interface FintechLoanEligibilityResponse {
  isEligible: boolean;
  maxLoanAmount: number;
  interestRate: number;
  assessmentId: string;
}

class FintechLoanService {
  /**
   * Assesses eligibility for a fintech loan.
   * @param applicantId - The ID of the loan applicant.
   * @param digitalFootprintScore - A score representing the applicant's digital footprint.
   * @param monthlyIncome - The applicant's monthly income.
   * @returns A Promise that resolves to FintechLoanEligibilityResponse.
   */
  async assessEligibility(applicantId: string, digitalFootprintScore: number, monthlyIncome: number): Promise<FintechLoanEligibilityResponse> {
    console.log(`[Real FintechLoanService] Assessing eligibility for applicant: ${applicantId}`);

    try {
      const response = await apiClient.post('/fintech-loan/assess', {
        applicantId,
        digitalFootprintScore,
        monthlyIncome,
      });

      const mappedResponse: FintechLoanEligibilityResponse = {
        isEligible: response.data.isEligible,
        maxLoanAmount: response.data.maxLoanAmount,
        interestRate: response.data.interestRate,
        assessmentId: response.data.assessmentId,
      };

      console.log(`[Real FintechLoanService] Successfully assessed eligibility for applicant: ${applicantId}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real FintechLoanService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`Fintech Loan API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real FintechLoanService] Network or other error', error);
        throw new AppError('Failed to communicate with the Fintech Loan service.', 503);
      }
    }
  }
}

export const fintechLoanService = new FintechLoanService();
