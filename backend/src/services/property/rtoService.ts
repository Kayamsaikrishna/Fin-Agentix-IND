
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';
import { RtoVehicleResponse } from './types';

const apiClient = axios.create({
  baseURL: process.env.RTO_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.RTO_API_KEY,
  },
});

class RtoService {
  /**
   * Verifies vehicle details from the RTO.
   * @param vehicleNumber - The vehicle registration number (e.g., 'MH01AB1234').
   * @returns A Promise that resolves to RtoVehicleResponse.
   */
  async verifyVehicle(vehicleNumber: string): Promise<RtoVehicleResponse> {
    console.log(`[Real RtoService] Verifying vehicle: ${vehicleNumber}`);

    try {
      const response = await apiClient.get(`/vehicles/${vehicleNumber}`);

      // Adapt this mapping to the actual response structure from the RTO API.
      const mappedResponse: RtoVehicleResponse = {
        vehicleNumber: response.data.vehicleNumber,
        ownerName: response.data.ownerName,
        registrationDate: response.data.registrationDate,
        model: response.data.model,
        isFinanced: response.data.isFinanced,
      };

      console.log(`[Real RtoService] Successfully verified vehicle: ${vehicleNumber}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real RtoService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`RTO API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real RtoService] Network or other error', error);
        throw new AppError('Failed to communicate with the RTO service.', 503);
      }
    }
  }
}

export const rtoService = new RtoService();
