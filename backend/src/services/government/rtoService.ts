
/**
 * Represents the details of a vehicle registered with the RTO.
 */
export interface VehicleDetailsResponse {
  registrationNumber: string;
  ownerName: string;
  make: string;
  model: string;
  fuelType: 'Petrol' | 'Diesel' | 'CNG' | 'Electric';
  registrationDate: string;
}

/**
 * Mock service for RTO (Regional Transport Office) vehicle verification.
 */
class RtoService {
  /**
   * Simulates fetching vehicle details from the RTO database.
   * @param registrationNumber - The vehicle's registration number (e.g., MH02AB1234).
   * @returns A Promise that resolves to VehicleDetailsResponse.
   */
  async getVehicleDetails(registrationNumber: string): Promise<VehicleDetailsResponse> {
    console.log(`[Mock RtoService] Fetching details for vehicle: ${registrationNumber}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1100));

    const response: VehicleDetailsResponse = {
      registrationNumber,
      ownerName: 'Ranbir Kapoor',
      make: 'Land Rover',
      model: 'Range Rover Vogue',
      fuelType: 'Petrol',
      registrationDate: '2023-04-10',
    };

    console.log(`[Mock RtoService] Found details for vehicle: ${registrationNumber}`);
    return response;
  }
}

export const rtoService = new RtoService();
