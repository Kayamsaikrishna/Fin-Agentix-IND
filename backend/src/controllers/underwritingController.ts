
import { Request, Response, NextFunction } from 'express';
import { underwritingService } from '../services/underwritingService';
import { AppError } from '../middleware/errorHandler';

class UnderwritingController {
  async review(req: Request, res: Response, next: NextFunction) {
    try {
      const applicationId = parseInt(req.params.id);
      const { decision, remarks } = req.body;

      if (!decision || !['Approved', 'Rejected'].includes(decision)) {
        throw new AppError('A valid decision (Approved/Rejected) is required', 400);
      }

      const result = await underwritingService.reviewApplication(applicationId, decision, remarks);
      res.status(200).json({ message: `Application ${decision} successfully`, result });
    } catch (error) {
      next(error);
    }
  }
}

export const underwritingController = new UnderwritingController();
