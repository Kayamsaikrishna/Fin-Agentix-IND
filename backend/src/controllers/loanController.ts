
import { Request, Response, NextFunction } from 'express';
import { loanService } from '../services/loanService';
import { AppError } from '../middleware/errorHandler';

class LoanController {
  async listMyLoans(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const loans = await loanService.listUserLoans(userId);
      res.status(200).json(loans);
    } catch (error) {
      next(error);
    }
  }

  async getLoan(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const loanId = parseInt(req.params.id);
      const loan = await loanService.getLoanDetails(loanId, userId);
      res.status(200).json(loan);
    } catch (error) {
      next(error);
    }
  }

  async makePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const loanId = parseInt(req.params.id);
      const { amount } = req.body;

      if (!amount || typeof amount !== 'number') {
        throw new AppError('Invalid payment amount', 400);
      }

      const result = await loanService.makeLoanPayment(loanId, userId, amount);
      res.status(200).json({ message: 'Payment successful', ...result });
    } catch (error) {
      next(error);
    }
  }
}

export const loanController = new LoanController();
