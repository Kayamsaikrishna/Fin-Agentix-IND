
import { fraudDetectionService } from '../services/fraudDetectionService';

class FraudDetectionAgent {
  async run(applicationData: any) {
    console.log(`Running fraud detection for application ${applicationData.applicationId}`);

    try {
      const fraudCheckResult = await fraudDetectionService.checkForFraud(applicationData);

      if (fraudCheckResult.isFraudulent) {
        console.warn(`Potential fraud detected for application ${applicationData.applicationId}`, fraudCheckResult.reasons);
        return { ...applicationData, error: 'Potential fraud detected', reasons: fraudCheckResult.reasons };
      }

      console.log('Fraud checks passed');
      return { ...applicationData, fraudCheck: fraudCheckResult };
    } catch (error: any) {
      console.error('Error in FraudDetectionAgent:', error.message);
      return { ...applicationData, error: 'Error in fraud detection agent' };
    }
  }
}

export const fraudDetectionAgent = new FraudDetectionAgent();
