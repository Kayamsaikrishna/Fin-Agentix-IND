
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';
import { AadhaarVerificationResponse } from './types';

const apiClient = axios.create({
  baseURL: process.env.AADHAAR_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.AADHAAR_API_KEY,
  },
});

class AadhaarService {
  /**
   * Verifies an individual's Aadhaar details.
   * @param aadhaarNumber - The 12-digit Aadhaar number.
   * @returns A Promise that resolves to AadhaarVerificationResponse.
   */
  async verifyAadhaar(aadhaarNumber: string): Promise<AadhaarVerificationResponse> {
    console.log(`[Real AadhaarService] Verifying Aadhaar: ${aadhaarNumber}`);

    try {
      const requestBody = {
        aadhaarNumber,
        // Real Aadhaar API will require more data, possibly biometrics or OTP.
      };

      const response = await apiClient.post('/verify', requestBody);

      // Adapt this mapping to the actual response structure from the Aadhaar API.
      const mappedResponse: AadhaarVerificationResponse = {
        aadhaarNumber: response.data.aadhaarNumber,
        name: response.data.name,
        dateOfBirth: response.data.dateOfBirth,
        address: response.data.address,
        isVerified: response.data.status === 'Verified',
      };

      console.log(`[Real AadhaarService] Successfully verified Aadhaar: ${aadhaarNumber}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real AadhaarService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`Aadhaar API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real AadhaarService] Network or other error', error);
        throw new AppError('Failed to communicate with the Aadhaar service.', 503);
      }
    }
  }
}

export const aadhaarService = new AadhaarService();
