
import { notificationService } from './notificationService';
import { User } from '../models/User';
import { LoanApplication } from '../models/LoanApplication';

class UnderwritingService {
  async reviewApplication(applicationId: number, decision: 'Approved' | 'Rejected', remarks: string): Promise<any> {
    console.log(`Underwriter reviewing application ${applicationId}`);

    const application = await LoanApplication.findByPk(applicationId);

    if (!application) {
      throw new Error('Application not found');
    }

    application.status = decision;
    application.remarks = remarks;
    await application.save();

    // Notify the customer of the final decision
    await notificationService.sendApplicationStatusUpdate(application.userId, decision);

    console.log(`Application ${applicationId} has been ${decision}`);
    return { status: application.status, remarks: application.remarks };
  }
}

export const underwritingService = new UnderwritingService();
