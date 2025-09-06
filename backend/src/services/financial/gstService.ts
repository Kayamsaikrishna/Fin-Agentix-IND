
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';
import { GstProfileResponse } from './types';

const apiClient = axios.create({
  baseURL: process.env.GST_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.GST_API_KEY,
  },
});

class GstService {
  /**
   * Fetches the GST profile for a given GSTIN.
   * @param gstin - The GST Identification Number.
   * @returns A Promise that resolves to GstProfileResponse.
   */
  async getGstProfile(gstin: string): Promise<GstProfileResponse> {
    console.log(`[Real GstService] Fetching profile for GSTIN: ${gstin}`);

    try {
      const response = await apiClient.get(`/profile/${gstin}`);

      // Adapt this mapping to the actual response structure from the GST API.
      const mappedResponse: GstProfileResponse = {
        gstin: response.data.gstin,
        legalName: response.data.legalName,
        tradeName: response.data.tradeName,
        registrationDate: response.data.registrationDate,
        isActive: response.data.status === 'Active',
      };

      console.log(`[Real GstService] Successfully fetched profile for GSTIN: ${gstin}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real GstService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`GST API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real GstService] Network or other error', error);
        throw new AppError('Failed to communicate with the GST service.', 503);
      }
    }
  }
}

export const gstService = new GstService();
