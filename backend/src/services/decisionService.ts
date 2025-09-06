
class DecisionService {
  async makeDecision(applicationData: any): Promise<any> {
    console.log(`Making decision for application ${applicationData.applicationId}`);

    const { riskScore, complianceCheck } = applicationData;

    // In a real-world scenario, this would involve a more sophisticated decision engine.
    // For this example, we'll use simple rules.
    let decision: 'Approved' | 'Rejected' | 'ManualReview' = 'Rejected';
    let reason = '';

    if (!complianceCheck.isCompliant) {
      decision = 'Rejected';
      reason = `Compliance issue: ${complianceCheck.reason}`;
    } else if (riskScore < 40) {
      decision = 'Approved';
      reason = 'Low risk profile';
    } else if (riskScore < 70) {
      decision = 'ManualReview';
      reason = 'Moderate risk, requires underwriter review';
    } else {
      decision = 'Rejected';
      reason = 'High risk profile';
    }

    console.log(`Decision for application ${applicationData.applicationId}: ${decision} - ${reason}`);
    return { decision, reason };
  }
}

export const decisionService = new DecisionService();
