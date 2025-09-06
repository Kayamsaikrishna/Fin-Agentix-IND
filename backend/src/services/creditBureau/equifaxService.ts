
/**
 * Represents the structure of an Equifax score response.
 */
export interface EquifaxScoreResponse {
  businessId: string;
  equifaxRiskScore: number;
  commercialScore: number;
  smallBusinessScore: number;
  reportDate: Date;
}

/**
 * A mock service to simulate fetching a credit score from Equifax.
 */
class EquifaxService {
  /**
   * Fetches the Equifax scores for a given business identifier.
   * @param businessId - A unique identifier for the business entity.
   * @returns A Promise that resolves to an EquifaxScoreResponse.
   */
  async getEquifaxScore(businessId: string): Promise<EquifaxScoreResponse> {
    console.log(`[Mock EquifaxService] Fetching score for business: ${businessId}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1300));

    // Generate random scores based on typical ranges.
    const equifaxRiskScore = Math.floor(Math.random() * (850 - 1 + 1)) + 1;
    const commercialScore = Math.floor(Math.random() * (900 - 100 + 1)) + 100;
    const smallBusinessScore = Math.floor(Math.random() * (800 - 200 + 1)) + 200;

    const response: EquifaxScoreResponse = {
      businessId,
      equifaxRiskScore,
      commercialScore,
      smallBusinessScore,
      reportDate: new Date(),
    };

    console.log(`[Mock EquifaxService] Generated scores for business: ${businessId}`);
    return response;
  }
}

export const equifaxService = new EquifaxService();
