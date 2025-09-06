
import { AppError } from '../../middleware/errorHandler';

/**
 * Represents the demographic data returned after Aadhaar verification.
 */
export interface AadhaarVerificationResponse {
  uid: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  address: string;
  image?: string; // URL to a mock image
  isVerified: boolean;
}

/**
 * A mock service for Aadhaar e-KYC verification.
 * In reality, this would involve a multi-step process with an OTP.
 */
class AadhaarService {
  /**
   * Simulates verifying an Aadhaar number and fetching user data.
   * @param aadhaarNumber - The 12-digit Aadhaar number.
   * @param otp - The One-Time Password sent to the user's registered mobile.
   * @returns A Promise that resolves to AadhaarVerificationResponse.
   */
  async verifyAadhaar(aadhaarNumber: string, otp: string): Promise<AadhaarVerificationResponse> {
    console.log(`[Mock AadhaarService] Verifying Aadhaar: ${aadhaarNumber} with OTP: ${otp}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (otp !== '123456') { // Use a fixed OTP for the mock
      throw new AppError('Invalid OTP', 400);
    }

    // Check if the Aadhaar number is in a plausible format (12 digits)
    if (!/^\d{12}$/.test(aadhaarNumber)) {
        throw new AppError('Invalid Aadhaar Number format', 400);
    }

    const response: AadhaarVerificationResponse = {
      uid: aadhaarNumber,
      name: 'Ranbir Kapoor',
      gender: 'Male',
      dateOfBirth: '1982-09-28',
      address: '123, Pali Hill, Bandra, Mumbai, Maharashtra 400050',
      isVerified: true,
    };

    console.log(`[Mock AadhaarService] Successfully verified Aadhaar: ${aadhaarNumber}`);
    return response;
  }
}

export const aadhaarService = new AadhaarService();
