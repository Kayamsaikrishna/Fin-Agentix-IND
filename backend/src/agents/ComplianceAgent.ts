
import { validateCompliance } from '../config/compliance';

class ComplianceAgent {
  async run(applicationData: any) {
    console.log(`Running compliance checks for application ${applicationData.applicationId}`);
    
    try {
      const complianceResult = validateCompliance(applicationData);

      if (!complianceResult.isCompliant) {
        console.error('Compliance check failed', complianceResult.errors);
        return { ...applicationData, error: 'Compliance check failed', issues: complianceResult.errors };
      }

      console.log('Compliance checks passed');
      return { ...applicationData, compliance: complianceResult };
    } catch (error: any) {
      console.error('Error in ComplianceAgent:', error.message);
      return { ...applicationData, error: 'Error in compliance agent' };
    }
  }
}

export const complianceAgent = new ComplianceAgent();
