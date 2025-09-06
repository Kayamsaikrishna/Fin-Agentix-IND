
// src/services/marketingService.ts
import { emailService } from './emailService';

class MarketingService {
  async sendApprovalEmail(to: string, loanDetails: any) {
    const subject = 'Congratulations! Your Loan has been Approved';
    const body = `Dear Customer,\n\nWe are pleased to inform you that your loan has been approved with the following details:\n\nLoan Amount: ${loanDetails.amount}\nInterest Rate: ${loanDetails.interestRate}%\nTerm: ${loanDetails.term} months\n\nThank you for choosing us!`;

    await emailService.sendEmail(to, subject, body);
  }

  async sendRejectionEmail(to: string, reasons: string[]) {
    const subject = 'Update on Your Loan Application';
    const body = `Dear Customer,\n\nWe regret to inform you that your loan application has been rejected for the following reasons:\n\n- ${reasons.join('\n- ')}\n\nWe encourage you to re-apply after addressing these concerns.\n\nThank you.`;

    await emailService.sendEmail(to, subject, body);
  }
}

export const marketingService = new MarketingService();
