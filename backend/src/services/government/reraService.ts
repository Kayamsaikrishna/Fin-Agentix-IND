
/**
 * Represents the details of a RERA-registered project.
 */
export interface ReraProjectDetails {
  registrationNumber: string;
  projectName: string;
  promoterName: string;
  status: 'Registered' | 'Lapsed' | 'Completed';
  projectedCompletionDate: string;
}

/**
 * Mock service for RERA (Real Estate Regulatory Authority) verification.
 */
class ReraService {
  /**
   * Simulates fetching project details from the RERA portal.
   * @param registrationNumber - The project's RERA registration number.
   * @returns A Promise that resolves to ReraProjectDetails.
   */
  async getProjectDetails(registrationNumber: string): Promise<ReraProjectDetails> {
    console.log(`[Mock ReraService] Fetching details for RERA number: ${registrationNumber}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1400));

    const response: ReraProjectDetails = {
      registrationNumber,
      projectName: 'Vastu Pali Hill',
      promoterName: 'Padma Sri K. N. S. & W. S. Construction Company',
      status: 'Completed',
      projectedCompletionDate: '2022-12-31',
    };

    console.log(`[Mock ReraService] Found details for RERA number: ${registrationNumber}`);
    return response;
  }
}

export const reraService = new ReraService();
