
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';
import { DigilockerDocumentResponse } from './types';

const apiClient = axios.create({
  baseURL: process.env.DIGILOCKER_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

class DigilockerService {
  /**
   * Fetches a document from Digilocker.
   * This service will be more complex in reality, involving an OAuth 2.0 flow.
   * @param documentUri - The URI of the document in Digilocker.
   * @param accessToken - The user's access token.
   * @returns A Promise that resolves to DigilockerDocumentResponse.
   */
  async getDocument(documentUri: string, accessToken: string): Promise<DigilockerDocumentResponse> {
    console.log(`[Real DigilockerService] Fetching document: ${documentUri}`);

    try {
      const response = await apiClient.get(`/documents/${documentUri}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      // Adapt this mapping to the actual response structure from the Digilocker API.
      const mappedResponse: DigilockerDocumentResponse = {
        documentType: response.data.documentType,
        documentContent: response.data.documentContent, // This could be base64 encoded
        issuerName: response.data.issuerName,
        issueDate: response.data.issueDate,
      };

      console.log(`[Real DigilockerService] Successfully fetched document: ${documentUri}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real DigilockerService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`Digilocker API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real DigilockerService] Network or other error', error);
        throw new AppError('Failed to communicate with the Digilocker service.', 503);
      }
    }
  }
}

export const digilockerService = new DigilockerService();
