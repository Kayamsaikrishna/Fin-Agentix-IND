
import { Request, Response, NextFunction } from 'express';
import { loanService } from '../services/loanService';
import { documentService } from '../services/documentService';
import { AppError } from '../middleware/errorHandler';
import { LoanApplication } from '../models/LoanApplication';

class LoanApplicationController {
  async submitApplication(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const applicationData = req.body;

      if (!applicationData.amount || !applicationData.term) {
        throw new AppError('Loan amount and term are required', 400);
      }

      const application = await loanService.submitApplication(userId, applicationData);

      res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (error) {
      next(error);
    }
  }

  async getApplicationStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const applicationId = parseInt(req.params.id);
      const userId = (req as any).user.id;

      const application = await loanService.getApplicationStatus(applicationId, userId);

      res.status(200).json(application);
    } catch (error) {
      next(error);
    }
  }

  async uploadDocument(req: Request, res: Response, next: NextFunction) {
    try {
      const applicationId = parseInt(req.params.id);
      const userId = (req as any).user.id;

      const file = req.file;

      if (!file) {
        throw new AppError('No file uploaded', 400);
      }

      const document = await documentService.uploadDocument(applicationId, userId, file);

      res.status(201).json({ message: 'Document uploaded successfully', document });
    } catch (error) {
      next(error);
    }
  }
}

export const loanApplicationController = new LoanApplicationController();
