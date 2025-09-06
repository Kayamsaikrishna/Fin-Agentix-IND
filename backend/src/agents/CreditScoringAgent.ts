
import { creditBureauService } from '../services/creditBureauService';
import { financialAnalysisAgent } from './FinancialAnalysisAgent';

class CreditScoringAgent {
  async run(applicationData: any) {
    console.log(`Running credit scoring for application ${applicationData.applicationId}`);
    
    try {
      const externalScore = await creditBureauService.getCreditScore(applicationData.kyc.pan);
      
      // For more sophisticated scoring, we can use the financial analysis data
      const internalAnalysis = applicationData.financialAnalysis;

      // This is a simplistic scoring model. A real-world scenario would use a more complex model.
      let internalScore = 500;
      if (internalAnalysis.income > 50000) internalScore += 50;
      if (internalAnalysis.debtToIncomeRatio < 0.4) internalScore += 100;
      if (internalAnalysis.hasDefaults) internalScore -= 200;

      const combinedScore = (externalScore * 0.6) + (internalScore * 0.4);

      console.log(`Credit scoring completed. Score: ${combinedScore}`);
      return { ...applicationData, creditScore: combinedScore };
    } catch (error: any) {
      console.error('Error in CreditScoringAgent:', error.message);
      return { ...applicationData, error: 'Error in credit scoring agent' };
    }
  }
}

export const creditScoringAgent = new CreditScoringAgent();
