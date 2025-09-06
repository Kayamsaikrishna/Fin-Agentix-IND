
/**
 * Represents the structure of a CIBIL score response.
 */
export interface CibilScoreResponse {
  panNumber: string;
  score: number;
  reportDate: Date;
  history: string[]; // Simplified history
}

/**
 * A mock service to simulate fetching a credit score from CIBIL.
 * In a real-world application, this service would make an API call
 * to the CIBIL bureau using secured credentials.
 */
class CibilService {
  /**
   * Fetches the CIBIL score for a given PAN number.
   * @param panNumber - The user's Permanent Account Number (PAN).
   * @returns A Promise that resolves to a CibilScoreResponse.
   */
  async getCibilScore(panNumber: string): Promise<CibilScoreResponse> {
    console.log(`[Mock CibilService] Fetching score for PAN: ${panNumber}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate a real API call's potential for failure.
    if (panNumber.startsWith("BAD")) {
      throw new Error("Invalid PAN number provided to CIBIL API.");
    }

    // Generate a random score between 300 and 900.
    const score = Math.floor(Math.random() * 601) + 300;

    const response: CibilScoreResponse = {
      panNumber,
      score,
      reportDate: new Date(),
      history: [
        `Enquiry made on ${new Date().toISOString()}`,
        `Previous loan of 50,000 INR settled.`,
        `Credit card payment on time.`
      ],
    };

    console.log(`[Mock CibilService] Generated score ${score} for PAN: ${panNumber}`);
    return response;
  }
}

export const cibilService = new CibilService();
