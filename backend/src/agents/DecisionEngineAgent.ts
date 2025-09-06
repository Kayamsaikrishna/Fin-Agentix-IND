
import { decisionEngineService } from '../services/decisionEngineService';

class DecisionEngineAgent {
  async run(applicationData: any) {
    console.log(`Running decision engine for application ${applicationData.applicationId}`);

    try {
      const decision = await decisionEngineService.makeDecision(applicationData);
      
      console.log(`Decision for application ${applicationData.applicationId}: ${decision.status}`);
      return { ...applicationData, decision };

    } catch (error: any) {
      console.error('Error in DecisionEngineAgent:', error.message);
      return { ...applicationData, error: 'Error in decision engine agent' };
    }
  }
}

export const decisionEngineAgent = new DecisionEngineAgent();
