
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';

const apiClient = axios.create({
  baseURL: process.env.SECTORS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.SECTORS_API_KEY,
  },
});

interface CreditCardEligibilityResponse {
  isEligible: boolean;
  maxCreditLimit: number;
  annualFee: number;
  assessmentId: string;
}

class CreditCardService {
  /**
   * Assesses eligibility for a credit card.
   * @param individualId - The ID of the individual applying.
   * @param creditScore - The individual's credit score.
   * @param monthlyIncome - The individual's monthly income.
   * @returns A Promise that resolves to CreditCardEligibilityResponse.
   */
  async assessEligibility(individualId: string, creditScore: number, monthlyIncome: number): Promise<CreditCardEligibilityResponse> {
    console.log(`[Real CreditCardService] Assessing eligibility for individual: ${individualId}`);

    try {
      const response = await apiClient.post('/credit-card/assess', {
        individualId,
        creditScore,
        monthlyIncome,
      });

      const mappedResponse: CreditCardEligibilityResponse = {
        isEligible: response.data.isEligible,
        maxCreditLimit: response.data.maxCreditLimit,
        annualFee: response.data.annualFee,
        assessmentId: response.data.assessmentId,
      };

      console.log(`[Real CreditCardService] Successfully assessed eligibility for individual: ${individualId}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real CreditCardService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`Credit Card API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real CreditCardService] Network or other error', error);
        throw new AppError('Failed to communicate with the Credit Card service.', 503);
      }
    }
  }
}

export const creditCardService = new CreditCardService();
