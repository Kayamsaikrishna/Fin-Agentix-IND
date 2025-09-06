
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';
import { EquifaxScoreResponse } from './types';

const apiClient = axios.create({
  baseURL: process.env.EQUIFAX_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Key': process.env.EQUIFAX_API_CLIENT_KEY,
    'X-Client-Secret': process.env.EQUIFAX_API_CLIENT_SECRET,
  },
});

class EquifaxService {
  /**
   * Fetches the Equifax credit score for an individual.
   * @param panNumber - The user's PAN number.
   * @returns A Promise that resolves to EquifaxScoreResponse.
   */
  async getEquifaxScore(panNumber: string, name: string): Promise<EquifaxScoreResponse> {
    console.log(`[Real EquifaxService] Fetching score for PAN: ${panNumber}`);

    try {
      const requestBody = {
        panId: panNumber,
        fullName: name,
        memberId: process.env.EQUIFAX_API_MEMBER_ID,
        // Real Equifax API will require more data.
      };

      const response = await apiClient.post('/credit-inquiry', requestBody);

      // Adapt this mapping to the actual response structure from Equifax.
      const mappedResponse: EquifaxScoreResponse = {
        panNumber: response.data.pan,
        score: parseInt(response.data.equifaxScore, 10),
        reportDate: response.data.reportDate,
      };

      console.log(`[Real EquifaxService] Successfully fetched score for PAN: ${panNumber}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real EquifaxService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`Equifax API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real EquifaxService] Network or other error', error);
        throw new AppError('Failed to communicate with the Equifax service.', 503);
      }
    }
  }
}

export const equifaxService = new EquifaxService();
