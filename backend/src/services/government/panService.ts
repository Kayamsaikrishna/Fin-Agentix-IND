
import { AppError } from '../../middleware/errorHandler';

/**
 * Represents the data returned after PAN verification.
 */
export interface PanVerificationResponse {
  panNumber: string;
  fullName: string;
  dateOfBirth: string;
  isLinkedToAadhaar: boolean;
  isValid: boolean;
}

/**
 * A mock service for PAN (Permanent Account Number) verification.
 */
class PanService {
  /**
   * Simulates verifying a PAN card against the NSDL database.
   * @param panNumber - The 10-character alphanumeric PAN.
   * @returns A Promise that resolves to PanVerificationResponse.
   */
  async verifyPan(panNumber: string): Promise<PanVerificationResponse> {
    console.log(`[Mock PanService] Verifying PAN: ${panNumber}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Basic format validation
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber)) {
      throw new AppError('Invalid PAN format', 400);
    }

    const response: PanVerificationResponse = {
      panNumber,
      fullName: 'Ranbir Kapoor',
      dateOfBirth: '1982-09-28',
      isLinkedToAadhaar: true,
      isValid: true,
    };

    console.log(`[Mock PanService] Successfully verified PAN: ${panNumber}`);
    return response;
  }
}

export const panService = new PanService();
