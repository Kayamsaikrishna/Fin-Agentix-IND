
/**
 * Represents a single employment record from EPFO.
 */
export interface EmploymentRecord {
  memberId: string;
  companyName: string;
  joinDate: string;
  exitDate: string | null;
  serviceDuration: string;
}

/**
 * Represents the full employment history for a user.
 */
export interface EpfoHistoryResponse {
  uan: string;
  name: string;
  employmentRecords: EmploymentRecord[];
}

/**
 * Mock service for fetching employment history from EPFO.
 */
class EpfoService {
  /**
   * Simulates fetching a user's employment history using their Universal Account Number (UAN).
   * @param uan - The user's 12-digit UAN.
   * @returns A Promise that resolves to EpfoHistoryResponse.
   */
  async getEmploymentHistory(uan: string): Promise<EpfoHistoryResponse> {
    console.log(`[Mock EpfoService] Fetching history for UAN: ${uan}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response: EpfoHistoryResponse = {
      uan,
      name: 'Ranbir Kapoor',
      employmentRecords: [
        {
          memberId: 'MHBAN1234567000789123',
          companyName: 'Bollywood Superstars Inc.',
          joinDate: '2007-11-09',
          exitDate: null,
          serviceDuration: '16 years, 8 months',
        },
        {
          memberId: 'MHPUN0987654000123456',
          companyName: 'Initial Films Ltd.',
          joinDate: '2004-01-01',
          exitDate: '2007-10-01',
          serviceDuration: '3 years, 9 months',
        },
      ],
    };

    console.log(`[Mock EpfoService] Found ${response.employmentRecords.length} records for UAN: ${uan}`);
    return response;
  }
}

export const epfoService = new EpfoService();
