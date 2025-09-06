
import { kycService } from '../services/kycService';

class KYCAgent {
  async run(applicationData: any) {
    console.log(`Running KYC checks for application ${applicationData.applicationId}`);
    
    try {
      const kycResult = await kycService.getKycStatus(applicationData.userId);

      if (!kycResult.isVerified) {
        console.error('KYC verification failed', kycResult.details);
        return { ...applicationData, error: 'KYC failed', details: kycResult.details };
      }

      console.log('KYC verification successful');
      return { ...applicationData, kyc: kycResult };
    } catch (error: any) {
      console.error('Error in KYCAgent:', error.message);
      return { ...applicationData, error: 'Error in KYC agent' };
    }
  }
}

export const kycAgent = new KYCAgent();
