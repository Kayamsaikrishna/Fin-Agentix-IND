
import { KYCVerification } from '../models/KYCVerification';
import { User } from '../models/User';

export const createKYCVerification = async (kycData: any): Promise<any> => {
  const kycVerification = await KYCVerification.create(kycData);
  return kycVerification;
};

export const getKYCVerificationByUserId = async (userId: number): Promise<any> => {
  const kycVerification = await KYCVerification.findOne({ where: { userId } });
  return kycVerification;
};

export const updateKYCVerificationStatus = async (userId: number, status: string): Promise<any> => {
  const kycVerification = await KYCVerification.findOne({ where: { userId } });
  if (kycVerification) {
    kycVerification.status = status;
    await kycVerification.save();
  }
  return kycVerification;
};
