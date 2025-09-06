
import axios from 'axios';
import { AppError } from '../../middleware/errorHandler';

const apiClient = axios.create({
  baseURL: process.env.SECTORS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.SECTORS_API_KEY,
  },
});

interface EducationLoanEligibilityResponse {
  isEligible: boolean;
  maxLoanAmount: number;
  interestRate: number;
  assessmentId: string;
}

class EducationLoanService {
  /**
   * Assesses eligibility for an education loan.
   * @param studentId - The ID of the student applying.
   * @param courseFee - The total fee for the course.
   * @param instituteRanking - The ranking of the educational institute.
   * @returns A Promise that resolves to EducationLoanEligibilityResponse.
   */
  async assessEligibility(studentId: string, courseFee: number, instituteRanking: string): Promise<EducationLoanEligibilityResponse> {
    console.log(`[Real EducationLoanService] Assessing eligibility for student: ${studentId}`);

    try {
      const response = await apiClient.post('/education-loan/assess', {
        studentId,
        courseFee,
        instituteRanking,
      });

      const mappedResponse: EducationLoanEligibilityResponse = {
        isEligible: response.data.isEligible,
        maxLoanAmount: response.data.maxLoanAmount,
        interestRate: response.data.interestRate,
        assessmentId: response.data.assessmentId,
      };

      console.log(`[Real EducationLoanService] Successfully assessed eligibility for student: ${studentId}`);
      return mappedResponse;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Real EducationLoanService] API Error: ${error.response.status}`, error.response.data);
        throw new AppError(`Education Loan API error: ${error.response.data.message || error.message}`, error.response.status);
      } else {
        console.error('[Real EducationLoanService] Network or other error', error);
        throw new AppError('Failed to communicate with the Education Loan service.', 503);
      }
    }
  }
}

export const educationLoanService = new EducationLoanService();
