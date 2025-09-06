
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';

const apiClient = axios.create({
  baseURL: process.env.SECTORS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.SECTORS_API_KEY,
  },
});

interface CommercialVehicleLoanEligibilityResponse {
  isEligible: boolean;
  maxLoanAmount: number;
  interestRate: number;
  assessmentId: string;
}

class CommercialVehicleLoanService {
  /**
   * Assesses eligibility for a commercial vehicle loan.
   * @param businessId - The ID of the business applying for the loan.
   * @param vehicleType - The type of commercial vehicle.
   * @param vehicleCost - The cost of the vehicle.
   * @returns A Promise that resolves to CommercialVehicleLoanEligibilityResponse.
   */
  async assessEligibility(businessId: string, vehicleType: string, vehicleCost: number): Promise<CommercialVehicleLoanEligibilityResponse> {
    console.log(`[Real CommercialVehicleLoanService] Assessing eligibility for business: ${businessId}`);

    try {
      const response = await apiClient.post('/commercial-vehicle-loan/assess', {
        businessId,
        vehicleType,
        vehicleCost,
      });

      const mappedResponse: CommercialVehicleLoanEligibilityResponse = {
        isEligible: response.data.isEligible,
        maxLoanAmount: response.data.maxLoanAmount,
        interestRate: response.data.interestRate,
        assessmentId: response.data.assessmentId,
      };

      console.log(`[Real CommercialVehicleLoanService] Successfully assessed eligibility for business: ${businessId}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real CommercialVehicleLoanService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`Commercial Vehicle Loan API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real CommercialVehicleLoanService] Network or other error', error);
        throw new AppError('Failed to communicate with the Commercial Vehicle Loan service.', 503);
      }
    }
  }
}

export const commercialVehicleLoanService = new CommercialVehicleLoanService();
