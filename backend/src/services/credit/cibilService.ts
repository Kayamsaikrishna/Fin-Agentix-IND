
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';
import { CibilScoreResponse } from './types'; // Assuming you'll have a type definition file

// A configured client for a specific API service
const apiClient = axios.create({
  baseURL: process.env.CIBIL_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // The API key might be sent in a different header, e.g., 'X-API-KEY'
    'Authorization': `Bearer ${process.env.CIBIL_API_SECRET}`,
  },
});

class CibilService {
  /**
   * Fetches the CIBIL score for a given individual.
   * The actual parameters will depend on the CIBIL API documentation.
   * @param panNumber - The user's PAN number.
   * @param name - The user's full name.
   * @param dateOfBirth - The user's date of birth (e.g., 'YYYY-MM-DD').
   * @returns A Promise that resolves to CibilScoreResponse.
   */
  async getCibilScore(panNumber: string, name: string, dateOfBirth: string): Promise<CibilScoreResponse> {
    console.log(`[Real CibilService] Fetching CIBIL score for PAN: ${panNumber}`);

    try {
      const requestBody = {
        pan: panNumber,
        fullName: name,
        dob: dateOfBirth,
        // The CIBIL API will require a much more detailed request body,
        // including address, loan type for which the check is being done, etc.
        // This is a simplified example.
      };

      // The actual endpoint path will be in the API documentation (e.g., '/v2/credit-report')
      const response = await apiClient.post('/fetch-score', requestBody);

      // The mapping below is a critical step. You must adapt this to match the
      // exact structure of the real CIBIL API response.
      const mappedResponse: CibilScoreResponse = {
        panNumber: response.data.personalInfo.pan,
        score: parseInt(response.data.summary.score, 10),
        reportDate: response.data.reportTimestamp,
        // ... map other fields like paymentHistory, creditMix, etc.
      };

      console.log(`[Real CibilService] Successfully fetched score for PAN: ${panNumber}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // The API returned an error (e.g., 400, 401, 404)
        console.error(`[Real CibilService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`CIBIL API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        // A network error or other issue
        console.error('[Real CibilService] Network or other error', error);
        throw new AppError('Failed to communicate with the CIBIL service.', 503);
      }
    }
  }
}

export const cibilService = new CibilService();
