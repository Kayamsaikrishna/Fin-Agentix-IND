
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';
import { ItrVerificationResponse } from './types';

const apiClient = axios.create({
  baseURL: process.env.ITR_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.ITR_API_KEY,
  },
});

class ItrService {
  /**
   * Verifies an individual's ITR filings.
   * @param panNumber - The user's PAN number.
   * @param assessmentYear - The assessment year (e.g., '2023-24').
   * @returns A Promise that resolves to ItrVerificationResponse.
   */
  async verifyItr(panNumber: string, assessmentYear: string): Promise<ItrVerificationResponse> {
    console.log(`[Real ItrService] Verifying ITR for PAN: ${panNumber}, Year: ${assessmentYear}`);

    try {
      const requestBody = {
        pan: panNumber,
        year: assessmentYear,
      };

      const response = await apiClient.post('/verify', requestBody);

      // Adapt this mapping to the actual response structure from the ITR API.
      const mappedResponse: ItrVerificationResponse = {
        pan: response.data.pan,
        assessmentYear: response.data.assessmentYear,
        isFiled: response.data.filedStatus === 'Filed',
        filingDate: response.data.filingDate,
        income: parseFloat(response.data.grossTotalIncome),
      };

      console.log(`[Real ItrService] Successfully verified ITR for PAN: ${panNumber}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real ItrService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`ITR API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real ItrService] Network or other error', error);
        throw new AppError('Failed to communicate with the ITR service.', 503);
      }
    }
  }
}

export const itrService = new ItrService();
