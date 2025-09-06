
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';
import { ReraProjectResponse } from './types';

const apiClient = axios.create({
  baseURL: process.env.RERA_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.RERA_API_KEY,
  },
});

class ReraService {
  /**
   * Fetches RERA project details.
   * @param projectNumber - The RERA project registration number.
   * @param state - The state where the project is registered.
   * @returns A Promise that resolves to ReraProjectResponse.
   */
  async getReraProjectDetails(projectNumber: string, state: string): Promise<ReraProjectResponse> {
    console.log(`[Real ReraService] Fetching project: ${projectNumber} in ${state}`);

    try {
      const response = await apiClient.get(`/projects/${state}/${projectNumber}`);

      // Adapt this mapping to the actual response structure from the RERA API.
      const mappedResponse: ReraProjectResponse = {
        projectNumber: response.data.projectNumber,
        projectName: response.data.projectName,
        promoterName: response.data.promoterName,
        registrationDate: response.data.registrationDate,
        completionDate: response.data.proposedCompletionDate,
        isRegistered: response.data.status === 'Registered',
      };

      console.log(`[Real ReraService] Successfully fetched project: ${projectNumber}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real ReraService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`RERA API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real ReraService] Network or other error', error);
        throw new AppError('Failed to communicate with the RERA service.', 503);
      }
    }
  }
}

export const reraService = new ReraService();
