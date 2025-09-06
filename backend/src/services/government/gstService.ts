
/**
 * Represents the GST profile of a business.
 */
export interface GstProfileResponse {
  gstin: string;
  legalName: string;
  tradeName: string;
  status: 'Active' | 'Cancelled';
  registrationDate: string;
  address: string;
}

/**
 * Mock service for verifying GSTIN and fetching filing data.
 */
class GstService {
  /**
   * Fetches the profile of a business from the GST portal.
   * @param gstin - The 15-character Goods and Services Tax Identification Number.
   * @returns A Promise that resolves to GstProfileResponse.
   */
  async getGstProfile(gstin: string): Promise<GstProfileResponse> {
    console.log(`[Mock GstService] Fetching profile for GSTIN: ${gstin}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1600));

    const response: GstProfileResponse = {
      gstin,
      legalName: 'Dharma Productions Pvt. Ltd.',
      tradeName: 'Dharma Productions',
      status: 'Active',
      registrationDate: '1979-10-22',
      address: '201, 2nd Floor, Supreme Chambers, Andheri West, Mumbai',
    };

    console.log(`[Mock GstService] Profile found for GSTIN: ${gstin}`);
    return response;
  }
}

export const gstService = new GstService();
