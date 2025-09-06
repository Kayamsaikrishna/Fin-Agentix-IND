
import { Request, Response, NextFunction } from 'express';
import { complianceService } from '../services/complianceService';
import { LoanApplication } from '../models/LoanApplication';
import { AppError } from '../middleware/errorHandler';

class ComplianceController {
  async runComplianceCheck(req: Request, res: Response, next: NextFunction) {
    try {
      const applicationId = parseInt(req.params.id);

      // Fetch the application
      const application = await LoanApplication.findByPk(applicationId);

      if (!application) {
        throw new AppError('Loan application not found', 404);
      }

      // Run the compliance checks
      const complianceResult = await complianceService.checkCompliance(application);

      res.status(200).json({
        message: 'Compliance check completed',
        ...complianceResult,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const complianceController = new ComplianceController();
