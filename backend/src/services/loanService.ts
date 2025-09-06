
import { Loan } from '../models/Loan';
import { LoanPayment } from '../models/LoanPayment';
import { LoanApplication } from '../models/LoanApplication';
import { User } from '../models/User';
import { AppError } from '../middleware/errorHandler';

class LoanService {
  async submitApplication(userId: number, applicationData: any) {
    const application = await LoanApplication.create({
      userId,
      ...applicationData,
      status: 'Submitted',
    });
    return application;
  }

  async getApplicationStatus(applicationId: number, userId: number) {
    const application = await LoanApplication.findOne({ where: { id: applicationId, userId } });
    if (!application) {
      throw new AppError('Loan application not found or access denied', 404);
    }
    return application;
  }

  async getLoanDetails(loanId: number, userId: number) {
    const loan = await Loan.findByPk(loanId, {
      include: [LoanPayment as any],
    });

    if (!loan) {
      throw new AppError('Loan not found', 404);
    }

    const application = await LoanApplication.findByPk(loan.applicationId, { include: [User as any] });
    if (!application || application.userId !== userId) {
        throw new AppError('Access denied to this loan', 403);
    }

    return loan;
  }

  async makeLoanPayment(loanId: number, userId: number, amount: number) {
    const loan = await this.getLoanDetails(loanId, userId); // Use existing method for auth check

    if (amount <= 0) {
      throw new AppError('Payment amount must be positive', 400);
    }

    // In a real app, integrate with a payment gateway (Stripe, Razorpay, etc.)
    console.log(`Processing payment of ${amount} for loan ${loanId}`);

    // Assume payment is successful
    const payment = await LoanPayment.create({
      loanId,
      amount,
      paymentDate: new Date(),
      status: 'Success',
    });

    // Update loan balance
    loan.remainingBalance -= amount;
    if (loan.remainingBalance <= 0) {
        loan.status = 'Paid';
        loan.remainingBalance = 0;
    }
    await loan.save();

    return { payment, newBalance: loan.remainingBalance };
  }

  async listUserLoans(userId: number) {
    const applications = await LoanApplication.findAll({ 
        where: { userId, status: ['Approved', 'Disbursed', 'Paid'] },
        include: [Loan as any]
    });

    // Extract the loans from the applications
    const loans = applications.map(app => app.loan).filter(loan => loan != null);

    return loans;
  }
}

export const loanService = new LoanService();
