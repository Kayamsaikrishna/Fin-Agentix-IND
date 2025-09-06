
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';

const apiClient = axios.create({
  baseURL: process.env.SECTORS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.SECTORS_API_KEY,
  },
});

interface HealthcareLoanEligibilityResponse {
  isEligible: boolean;
  maxLoanAmount: number;
  interestRate: number;
  assessmentId: string;
}

class HealthcareLoanService {
  /**
   * Assesses eligibility for a healthcare loan.
   * @param patientId - The ID of the patient.
   * @param treatmentCost - The estimated cost of the medical treatment.
   * @param hospitalId - The ID of the hospital or healthcare provider.
   * @returns A Promise that resolves to HealthcareLoanEligibilityResponse.
   */
  async assessEligibility(patientId: string, treatmentCost: number, hospitalId: string): Promise<HealthcareLoanEligibilityResponse> {
    console.log(`[Real HealthcareLoanService] Assessing eligibility for patient: ${patientId}`);

    try {
      const response = await apiClient.post('/healthcare-loan/assess', {
        patientId,
        treatmentCost,
        hospitalId,
      });

      const mappedResponse: HealthcareLoanEligibilityResponse = {
        isEligible: response.data.isEligible,
        maxLoanAmount: response.data.maxLoanAmount,
        interestRate: response.data.interestRate,
        assessmentId: response.data.assessmentId,
      };

      console.log(`[Real HealthcareLoanService] Successfully assessed eligibility for patient: ${patientId}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real HealthcareLoanService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`Healthcare Loan API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real HealthcareLoanService] Network or other error', error);
        throw new AppError('Failed to communicate with the Healthcare Loan service.', 503);
      }
    }
  }
}

export const healthcareLoanService = new HealthcareLoanService();
