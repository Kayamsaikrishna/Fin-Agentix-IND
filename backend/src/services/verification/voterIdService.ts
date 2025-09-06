
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';
import { VoterIdVerificationResponse } from './types';

const apiClient = axios.create({
  baseURL: process.env.VOTER_ID_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.VOTER_ID_API_KEY,
  },
});

class VoterIdService {
  /**
   * Verifies an individual's Voter ID details.
   * @param voterId - The Voter ID number.
   * @returns A Promise that resolves to VoterIdVerificationResponse.
   */
  async verifyVoterId(voterId: string): Promise<VoterIdVerificationResponse> {
    console.log(`[Real VoterIdService] Verifying Voter ID: ${voterId}`);

    try {
      const response = await apiClient.get(`/verify/${voterId}`);

      // Adapt this mapping to the actual response structure from the Voter ID API.
      const mappedResponse: VoterIdVerificationResponse = {
        voterId: response.data.voterId,
        name: response.data.name,
        assemblyConstituency: response.data.assemblyConstituency,
        parliamentaryConstituency: response.data.parliamentaryConstituency,
        isVerified: response.data.status === 'Verified',
      };

      console.log(`[Real VoterIdService] Successfully verified Voter ID: ${voterId}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real VoterIdService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`Voter ID API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real VoterIdService] Network or other error', error);
        throw new AppError('Failed to communicate with the Voter ID service.', 503);
      }
    }
  }
}

export const voterIdService = new VoterIdService();
