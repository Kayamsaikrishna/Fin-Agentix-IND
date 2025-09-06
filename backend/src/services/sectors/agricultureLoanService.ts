
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';

const apiClient = axios.create({
  baseURL: process.env.SECTORS_API_BASE_URL, // A generic base URL for sector-specific APIs
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.SECTORS_API_KEY,
  },
});

interface AgricultureLoanEligibilityResponse {
  isEligible: boolean;
  maxLoanAmount: number;
  interestRate: number;
  assessmentId: string;
}

class AgricultureLoanService {
  /**
   * Assesses eligibility for an agriculture loan.
   * @param farmerId - The ID of the farmer applying for the loan.
   * @param landSizeInAcres - The size of the farmer's land in acres.
   * @param cropType - The type of crop being cultivated.
   * @returns A Promise that resolves to AgricultureLoanEligibilityResponse.
   */
  async assessEligibility(farmerId: string, landSizeInAcres: number, cropType: string): Promise<AgricultureLoanEligibilityResponse> {
    console.log(`[Real AgricultureLoanService] Assessing eligibility for farmer: ${farmerId}`);

    try {
      const response = await apiClient.post('/agriculture-loan/assess', {
        farmerId,
        landSizeInAcres,
        cropType,
      });

      const mappedResponse: AgricultureLoanEligibilityResponse = {
        isEligible: response.data.isEligible,
        maxLoanAmount: response.data.maxLoanAmount,
        interestRate: response.data.interestRate,
        assessmentId: response.data.assessmentId,
      };

      console.log(`[Real AgricultureLoanService] Successfully assessed eligibility for farmer: ${farmerId}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real AgricultureLoanService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`Agriculture Loan API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real AgricultureLoanService] Network or other error', error);
        throw new AppError('Failed to communicate with the Agriculture Loan service.', 503);
      }
    }
  }
}

export const agricultureLoanService = new AgricultureLoanService();
