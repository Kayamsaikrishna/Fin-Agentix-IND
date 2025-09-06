
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';

const apiClient = axios.create({
  baseURL: process.env.SECTORS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.SECTORS_API_KEY,
  },
});

interface BusinessLoanEligibilityResponse {
  isEligible: boolean;
  maxLoanAmount: number;
  interestRate: number;
  assessmentId: string;
}

class BusinessLoanService {
  /**
   * Assesses eligibility for a business loan.
   * @param businessId - The ID of the business applying for the loan.
   * @param annualTurnover - The annual turnover of the business.
   * @param yearsInOperation - The number of years the business has been in operation.
   * @returns A Promise that resolves to BusinessLoanEligibilityResponse.
   */
  async assessEligibility(businessId: string, annualTurnover: number, yearsInOperation: number): Promise<BusinessLoanEligibilityResponse> {
    console.log(`[Real BusinessLoanService] Assessing eligibility for business: ${businessId}`);

    try {
      const response = await apiClient.post('/business-loan/assess', {
        businessId,
        annualTurnover,
        yearsInOperation,
      });

      const mappedResponse: BusinessLoanEligibilityResponse = {
        isEligible: response.data.isEligible,
        maxLoanAmount: response.data.maxLoanAmount,
        interestRate: response.data.interestRate,
        assessmentId: response.data.assessmentId,
      };

      console.log(`[Real BusinessLoanService] Successfully assessed eligibility for business: ${businessId}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real BusinessLoanService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`Business Loan API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real BusinessLoanService] Network or other error', error);
        throw new AppError('Failed to communicate with the Business Loan service.', 503);
      }
    }
  }
}

export const businessLoanService = new BusinessLoanService();
