
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';

const apiClient = axios.create({
  baseURL: process.env.SECTORS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.SECTORS_API_KEY,
  },
});

interface HomeLoanEligibilityResponse {
  isEligible: boolean;
  maxLoanAmount: number;
  interestRate: number;
  assessmentId: string;
}

class HomeLoanService {
  /**
   * Assesses eligibility for a home loan.
   * @param applicantId - The ID of the loan applicant.
   * @param propertyValue - The value of the property.
   * @param applicantIncome - The annual income of the applicant.
   * @returns A Promise that resolves to HomeLoanEligibilityResponse.
   */
  async assessEligibility(applicantId: string, propertyValue: number, applicantIncome: number): Promise<HomeLoanEligibilityResponse> {
    console.log(`[Real HomeLoanService] Assessing eligibility for applicant: ${applicantId}`);

    try {
      const response = await apiClient.post('/home-loan/assess', {
        applicantId,
        propertyValue,
        applicantIncome,
      });

      const mappedResponse: HomeLoanEligibilityResponse = {
        isEligible: response.data.isEligible,
        maxLoanAmount: response.data.maxLoanAmount,
        interestRate: response.data.interestRate,
        assessmentId: response.data.assessmentId,
      };

      console.log(`[Real HomeLoanService] Successfully assessed eligibility for applicant: ${applicantId}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real HomeLoanService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`Home Loan API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real HomeLoanService] Network or other error', error);
        throw new AppError('Failed to communicate with the Home Loan service.', 503);
      }
    }
  }
}

export const homeLoanService = new HomeLoanService();
