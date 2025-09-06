
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';

const apiClient = axios.create({
  baseURL: process.env.SECTORS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.SECTORS_API_KEY,
  },
});

interface GoldLoanEligibilityResponse {
  isEligible: boolean;
  maxLoanAmount: number;
  interestRate: number;
  assessmentId: string;
}

class GoldLoanService {
  /**
   * Assesses eligibility for a gold loan.
   * @param applicantId - The ID of the loan applicant.
   * @param goldWeightInGrams - The weight of the gold in grams.
   * @param goldPurityInCarats - The purity of the gold in carats.
   * @returns A Promise that resolves to GoldLoanEligibilityResponse.
   */
  async assessEligibility(applicantId: string, goldWeightInGrams: number, goldPurityInCarats: number): Promise<GoldLoanEligibilityResponse> {
    console.log(`[Real GoldLoanService] Assessing eligibility for applicant: ${applicantId}`);

    try {
      const response = await apiClient.post('/gold-loan/assess', {
        applicantId,
        goldWeightInGrams,
        goldPurityInCarats,
      });

      const mappedResponse: GoldLoanEligibilityResponse = {
        isEligible: response.data.isEligible,
        maxLoanAmount: response.data.maxLoanAmount,
        interestRate: response.data.interestRate,
        assessmentId: response.data.assessmentId,
      };

      console.log(`[Real GoldLoanService] Successfully assessed eligibility for applicant: ${applicantId}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real GoldLoanService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`Gold Loan API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real GoldLoanService] Network or other error', error);
        throw new AppError('Failed to communicate with the Gold Loan service.', 503);
      }
    }
  }
}

export const goldLoanService = new GoldLoanService();
