
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';
import { PanVerificationResponse } from './types';

const apiClient = axios.create({
  baseURL: process.env.PAN_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.PAN_API_KEY,
  },
});

class PanService {
  /**
   * Verifies an individual's PAN details.
   * @param panNumber - The user's PAN number.
   * @returns A Promise that resolves to PanVerificationResponse.
   */
  async verifyPan(panNumber: string): Promise<PanVerificationResponse> {
    console.log(`[Real PanService] Verifying PAN: ${panNumber}`);

    try {
      const response = await apiClient.get(`/verify/${panNumber}`);

      // Adapt this mapping to the actual response structure from the PAN API.
      const mappedResponse: PanVerificationResponse = {
        panNumber: response.data.panNumber,
        name: response.data.name,
        isAadhaarLinked: response.data.aadhaarLinked,
        isValid: response.data.status === 'Valid',
      };

      console.log(`[Real PanService] Successfully verified PAN: ${panNumber}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real PanService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`PAN API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real PanService] Network or other error', error);
        throw new AppError('Failed to communicate with the PAN service.', 503);
      }
    }
  }
}

export const panService = new PanService();
