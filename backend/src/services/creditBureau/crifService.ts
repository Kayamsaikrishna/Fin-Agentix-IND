
/**
 * Represents the structure of a CRIF score response.
 */
export interface CrifScoreResponse {
  applicationId: string;
  score: number;
  reportGeneratedAt: Date;
  creditUtilization: number;
}

/**
 * A mock service to simulate fetching a credit score from CRIF.
 */
class CrifService {
  /**
   * Fetches the CRIF score for a given application ID.
   * @param applicationId - The loan application ID to be scored.
   * @returns A Promise that resolves to a CrifScoreResponse.
   */
  async getCrifScore(applicationId: string): Promise<CrifScoreResponse> {
    console.log(`[Mock CrifService] Fetching score for application: ${applicationId}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Generate a random score between 300 and 900.
    const score = Math.floor(Math.random() * 601) + 300;

    const response: CrifScoreResponse = {
      applicationId,
      score,
      reportGeneratedAt: new Date(),
      creditUtilization: Math.random(),
    };

    console.log(`[Mock CrifService] Generated score ${score} for application: ${applicationId}`);
    return response;
  }
}

export const crifService = new CrifService();
