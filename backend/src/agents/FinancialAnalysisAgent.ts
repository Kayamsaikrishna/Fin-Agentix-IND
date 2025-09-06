
import { financialDataService } from '../services/financialDataService';

class FinancialAnalysisAgent {
  async run(applicationData: any) {
    console.log(`Running financial analysis for application ${applicationData.applicationId}`);

    try {
      const financialData = await financialDataService.getFinancialData(applicationData.applicationId);
      const analysis = await financialDataService.analyzeFinancials(financialData);
      
      console.log('Financial analysis completed');
      return { ...applicationData, financialAnalysis: analysis };

    } catch (error: any) {
      console.error('Error in FinancialAnalysisAgent:', error.message);
      return { ...applicationData, error: 'Error in financial analysis agent' };
    }
  }
}

export const financialAnalysisAgent = new FinancialAnalysisAgent();
