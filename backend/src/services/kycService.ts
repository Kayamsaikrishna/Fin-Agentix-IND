
import { User } from '../models/User';
import { KYC } from '../models/KYC';
import { AppError } from '../middleware/errorHandler';

// Mock KYC verification service
const mockKycVerification = async (userData: any) => {
  console.log(`Verifying KYC for ${userData.fullName}`);
  // In a real scenario, this would involve a third-party API like Veriff, Onfido, etc.
  const isVerified = Math.random() > 0.2; // 80% success rate
  const verificationId = `kyc_id_${Date.now()}`;

  return {
    status: isVerified ? 'Verified' : 'Failed',
    verificationId,
    details: isVerified ? 'Documents look good.' : 'Could not verify identity.',
  };
};

class KycService {
  async startKycProcess(userId: number, aadharNumber: string, panNumber: string) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const existingKyc = await KYC.findOne({ where: { userId } });
    if (existingKyc && existingKyc.status === 'Verified') {
      throw new AppError('KYC already completed and verified', 400);
    }

    const verificationResult = await mockKycVerification({ 
      fullName: user.fullName, 
      aadhar: aadharNumber, 
      pan: panNumber 
    });

    const [kyc, created] = await KYC.findOrCreate({
      where: { userId },
      defaults: {
        userId,
        aadhaarNumber: aadharNumber, // In a real app, hash or encrypt this data
        panNumber: panNumber,    // In a real app, hash or encrypt this data
        status: verificationResult.status,
        providerResponse: verificationResult, // Store the full response for auditing
      },
    });

    if (!created) {
      kyc.status = verificationResult.status;
      kyc.providerResponse = verificationResult;
      await kyc.save();
    }

    // Update user's KYC status
    if (verificationResult.status === 'Verified') {
        user.isKycVerified = true;
        await user.save();
    }

    return kyc;
  }

  async getKycStatus(userId: number) {
    const kyc = await KYC.findOne({ where: { userId } });
    if (!kyc) {
      throw new AppError('No KYC record found for this user', 404);
    }
     return { ...kyc.get(), isVerified: kyc.status === 'Verified', details: kyc.providerResponse.details };
  }
}

export const kycService = new KycService();
