
import { Request, Response, NextFunction } from 'express';
import { riskService } from '../services/riskService';

class RiskController {
  async assessRisk(req: Request, res: Response, next: NextFunction) {
    try {
      const applicationId = parseInt(req.params.applicationId);
      const assessment = await riskService.assessApplicationRisk(applicationId);
      res.status(200).json(assessment);
    } catch (error) {
      next(error);
    }
  }
}

export const riskController = new RiskController();
