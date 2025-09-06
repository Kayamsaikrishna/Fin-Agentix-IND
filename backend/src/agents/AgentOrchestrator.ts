
import { kycAgent } from './KYCAgent';
import { documentAnalysisAgent } from './DocumentAnalysisAgent';
import { financialAnalysisAgent } from './FinancialAnalysisAgent';
import { fraudDetectionAgent } from './FraudDetectionAgent';
import { creditScoringAgent } from './CreditScoringAgent';
import { riskAssessmentAgent } from './RiskAssessmentAgent';
import { complianceAgent } from './ComplianceAgent';
import { decisionEngineAgent } from './DecisionEngineAgent';
import { marketingAgent } from './MarketingAgent';

class AgentOrchestrator {
  async run(applicationId: number) {
    console.log(`Starting orchestration for application ${applicationId}`);

    // The data will be enriched at each step by the agents
    let applicationData: any = { applicationId };

    applicationData = await kycAgent.run(applicationData);
    if (applicationData.error) return applicationData;

    applicationData = await documentAnalysisAgent.run(applicationData);
    if (applicationData.error) return applicationData;

    applicationData = await financialAnalysisAgent.run(applicationData);
    if (applicationData.error) return applicationData;

    applicationData = await fraudDetectionAgent.run(applicationData);
    if (applicationData.error) return applicationData;

    applicationData = await creditScoringAgent.run(applicationData);
    if (applicationData.error) return applicationData;

    applicationData = await riskAssessmentAgent.run(applicationData);
    if (applicationData.error) return applicationData;

    applicationData = await complianceAgent.run(applicationData);
    if (applicationData.error) return applicationData;

    applicationData = await decisionEngineAgent.run(applicationData);

    // Marketing is a non-critical step, so we don't check for errors
    applicationData = await marketingAgent.run(applicationData);

    console.log(`Orchestration finished for application ${applicationId}`);
    return applicationData;
  }
}

export const agentOrchestrator = new AgentOrchestrator();
