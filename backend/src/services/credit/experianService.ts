
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';
import { ExperianScoreResponse } from './types';

const apiClient = axios.create({
  baseURL: process.env.EXPERIAN_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Experian's authentication might use a combination of client ID and secret
    // to get a temporary token. This is a placeholder for that logic.
    'Authorization': `Bearer ${process.env.EXPERIAN_API_CLIENT_SECRET}`,
  },
});

class ExperianService {
  /**
   * Fetches the Experian credit score for an individual.
   * @param panNumber - The user's PAN number.
   * @returns A Promise that resolves to ExperianScoreResponse.
   */
  async getExperianScore(panNumber: string, name: string): Promise<ExperianScoreResponse> {
    console.log(`[Real ExperianService] Fetching score for PAN: ${panNumber}`);

    try {
      const requestBody = {
        pan: panNumber,
        fullName: name,
        // Real Experian API will require more data.
      };

      const response = await apiClient.post('/credit-report', requestBody);

      // Adapt this mapping to the actual response structure from Experian.
      const mappedResponse: ExperianScoreResponse = {
        panNumber: response.data.pan,
        score: parseInt(response.data.score, 10),
        reportDate: new Date(response.data.reportDate).toISOString(),
      };

      console.log(`[Real ExperianService] Successfully fetched score for PAN: ${panNumber}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real ExperianService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`Experian API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real ExperianService] Network or other error', error);
        throw new AppError('Failed to communicate with the Experian service.', 503);
      }
    }
  }
}

export const experianService = new ExperianService();
