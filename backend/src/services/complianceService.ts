
import { LoanApplication } from '../models/LoanApplication';

class ComplianceService {
  /**
   * Checks the loan application against a set of compliance rules.
   * In a real-world scenario, this would involve checking against external databases
   * like sanction lists, PEP (Politically Exposed Person) lists, etc.
   * @param application - The loan application to check.
   */
  async checkCompliance(application: LoanApplication): Promise<{ isCompliant: boolean; reason: string }> {
    console.log(`Running compliance check for application ${application.id}`);

    // Mock compliance checks
    const checks = [
      this.isNotOnSanctionList(application.userId),
      this.hasValidDocumentation(application),
    ];

    const results = await Promise.all(checks);

    const nonCompliant = results.find(result => !result.isCompliant);

    if (nonCompliant) {
      console.log(`Compliance check failed for application ${application.id}: ${nonCompliant.reason}`);
      return { isCompliant: false, reason: nonCompliant.reason };
    }

    console.log(`Compliance check passed for application ${application.id}`);
    return { isCompliant: true, reason: 'All compliance checks passed' };
  }

  private async isNotOnSanctionList(userId: number): Promise<{ isCompliant: boolean; reason: string }> {
    // This is a mock check. In reality, you'd query an external service.
    const sanctionedUserIds = [13, 42, 101]; // Example sanctioned user IDs
    if (sanctionedUserIds.includes(userId)) {
      return { isCompliant: false, reason: 'Applicant is on a sanction list' };
    }
    return { isCompliant: true, reason: '' };
  }

  private async hasValidDocumentation(application: LoanApplication): Promise<{ isCompliant: boolean; reason: string }> {
    // This is a mock check. It could be expanded to check for specific document types.
    // For now, we'll just check if at least one document has been uploaded.
    // Note: In a real flow, document upload might happen after initial submission.
    // This check might be better placed at a later stage.
    // const documentCount = await Document.count({ where: { applicationId: application.id } });
    // if (documentCount === 0) {
    //   return { isCompliant: false, reason: 'Required documentation is missing' };
    // }
    return { isCompliant: true, reason: '' };
  }
}

export const complianceService = new ComplianceService();
