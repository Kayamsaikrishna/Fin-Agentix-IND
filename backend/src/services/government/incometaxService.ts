
/**
 * Represents a summary of an ITR filing.
 */
export interface ItrFiling {
  assessmentYear: string;
  grossTotalIncome: number;
  taxPaid: number;
  filingDate: string;
}

/**
 * Represents the response containing a user's ITR history.
 */
export interface ItrHistoryResponse {
  panNumber: string;
  name: string;
  filings: ItrFiling[];
}

/**
 * Mock service for fetching ITR (Income Tax Return) data.
 */
class IncomeTaxService {
  /**
   * Simulates fetching a user's ITR filing history.
   * @param panNumber - The user's Permanent Account Number (PAN).
   * @returns A Promise that resolves to ItrHistoryResponse.
   */
  async getItrHistory(panNumber: string): Promise<ItrHistoryResponse> {
    console.log(`[Mock IncomeTaxService] Fetching ITR history for PAN: ${panNumber}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2200));

    const response: ItrHistoryResponse = {
      panNumber,
      name: 'Ranbir Kapoor',
      filings: [
        {
          assessmentYear: '2023-24',
          grossTotalIncome: 50000000,
          taxPaid: 15000000,
          filingDate: '2023-07-25',
        },
        {
          assessmentYear: '2022-23',
          grossTotalIncome: 45000000,
          taxPaid: 13500000,
          filingDate: '2022-07-28',
        },
      ],
    };

    console.log(`[Mock IncomeTaxService] Found ${response.filings.length} ITR filings for PAN: ${panNumber}`);
    return response;
  }
}

export const incomeTaxService = new IncomeTaxService();
