
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';
import { CrifScoreResponse } from './types';

const apiClient = axios.create({
  baseURL: process.env.CRIF_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // CRIF might use Basic Auth or another scheme.
    // This is a placeholder.
    'Authorization': `Basic ${Buffer.from(`${process.env.CRIF_API_USERNAME}:${process.env.CRIF_API_PASSWORD}`).toString('base64')}`,
  },
});

class CrifService {
  /**
   * Fetches the CRIF credit score for an individual.
   * @param panNumber - The user's PAN number.
   * @returns A Promise that resolves to CrifScoreResponse.
   */
  async getCrifScore(panNumber: string, name: string): Promise<CrifScoreResponse> {
    console.log(`[Real CrifService] Fetching score for PAN: ${panNumber}`);

    try {
      const requestBody = {
        pan: panNumber,
        name: name,
        // Real CRIF API will require more data.
      };

      const response = await apiClient.post('/fetch-score', requestBody);

      // Adapt this mapping to the actual response structure from CRIF.
      const mappedResponse: CrifScoreResponse = {
        panNumber: response.data.pan,
        score: parseInt(response.data.scoreValue, 10),
        reportDate: response.data.generatedDate,
      };

      console.log(`[Real CrifService] Successfully fetched score for PAN: ${panNumber}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real CrifService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`CRIF API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real CrifService] Network or other error', error);
        throw new AppError('Failed to communicate with the CRIF service.', 503);
      }
    }
  }
}

export const crifService = new CrifService();
