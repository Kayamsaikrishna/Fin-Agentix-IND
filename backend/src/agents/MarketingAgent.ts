
// src/agents/MarketingAgent.ts
import { marketingService } from '../services/marketingService';

class MarketingAgent {
  async run(applicationData: any) {
    console.log(`Running marketing post-decision tasks for application ${applicationData.applicationId}`);

    try {
      if (applicationData.decision?.status === 'approved') {
        await marketingService.sendApprovalEmail(applicationData.kyc.email, applicationData.decision.loanDetails);
      } else if (applicationData.decision?.status === 'rejected') {
        await marketingService.sendRejectionEmail(applicationData.kyc.email, applicationData.decision.reasons);
      }
      return { ...applicationData, marketing: { status: 'processed' } };
    } catch (error: any) {
      console.error('Error in MarketingAgent:', error.message);
      // Marketing is a non-critical step, so we don't block the main flow.
      return { ...applicationData, marketing: { status: 'failed', error: error.message } };
    }
  }
}

export const marketingAgent = new MarketingAgent();
