
import { riskAssessmentService } from '../services/riskAssessmentService';

class RiskAssessmentAgent {
  async run(applicationData: any) {
    console.log(`Running risk assessment for application ${applicationData.applicationId}`);

    try {
      const riskScore = await riskAssessmentService.assessRisk(applicationData);

      console.log(`Risk assessment completed. Score: ${riskScore}`);
      return { ...applicationData, riskScore };
    } catch (error: any) {
      console.error('Error in RiskAssessmentAgent:', error.message);
      return { ...applicationData, error: 'Error in risk assessment agent' };
    }
  }
}

export const riskAssessmentAgent = new RiskAssessmentAgent();
