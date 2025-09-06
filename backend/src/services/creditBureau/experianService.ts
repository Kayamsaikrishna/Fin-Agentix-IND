
/**
 * Represents the structure of an Experian score response.
 */
export interface ExperianScoreResponse {
  consumerId: string;
  score: number;
  reportDate: Date;
  activeAccounts: number;
}

/**
 * A mock service to simulate fetching a credit score from Experian.
 */
class ExperianService {
  /**
   * Fetches the Experian score for a given consumer identifier.
   * @param consumerId - A unique identifier for the consumer (e.g., a combination of name and DOB).
   * @returns A Promise that resolves to an ExperianScoreResponse.
   */
  async getExperianScore(consumerId: string): Promise<ExperianScoreResponse> {
    console.log(`[Mock ExperianService] Fetching score for consumer: ${consumerId}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1100));

    // Generate a random score between 300 and 900.
    const score = Math.floor(Math.random() * 601) + 300;

    const response: ExperianScoreResponse = {
      consumerId,
      score,
      reportDate: new Date(),
      activeAccounts: Math.floor(Math.random() * 10),
    };

    console.log(`[Mock ExperianService] Generated score ${score} for consumer: ${consumerId}`);
    return response;
  }
}

export const experianService = new ExperianService();
