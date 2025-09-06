
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';
import { EPFOData } from './types';

const apiClient = axios.create({
  baseURL: process.env.EPFO_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.EPFO_API_KEY,
  },
});

class EpfoService {
  /**
   * Verifies an individual's EPFO details.
   * @param uan - The Universal Account Number.
   * @returns A Promise that resolves to EpfoVerificationResponse.
   */
  async verifyEpfo(uan: string, name: string): Promise<EPFOData> {
    console.log(`[Real EpfoService] Verifying UAN: ${uan}`);

    try {
      const requestBody = {
        uan,
        name,
        // Real EPFO API will require more data.
      };

      const response = await apiClient.post('/verify', requestBody);

      // Adapt this mapping to the actual response structure from the EPFO API.
      const mappedResponse: EPFOData = {
        uan: response.data.uan,
        memberId: response.data.memberId,
        employer: response.data.employer,
        contribution: response.data.contribution,
      };

      console.log(`[Real EpfoService] Successfully verified UAN: ${uan}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real EpfoService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`EPFO API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real EpfoService] Network or other error', error);
        throw new AppError('Failed to communicate with the EPFO service.', 503);
      }
    }
  }
}

export const epfoService = new EpfoService();
