
import { Request, Response, NextFunction } from 'express';
import { cibilService } from '../services/creditBureau/cibilService';
import { experianService } from '../services/creditBureau/experianService';
import { crifService } from '../services/creditBureau/crifService';
import { equifaxService } from '../services/creditBureau/equifaxService';
import { AppError } from '../middleware/errorHandler';

class CreditScoreController {
  async getCombinedCreditScores(req: Request, res: Response, next: NextFunction) {
    try {
      const { panNumber, consumerId, applicationId, businessId } = req.query;

      if (!panNumber || !consumerId || !applicationId || !businessId) {
        throw new AppError('panNumber, consumerId, applicationId, and businessId are required query parameters', 400);
      }

      // Execute all credit score requests in parallel
      const [cibilResult, experianResult, crifResult, equifaxResult] = await Promise.all([
        cibilService.getCibilScore(panNumber as string),
        experianService.getExperianScore(consumerId as string),
        crifService.getCrifScore(applicationId as string),
        equifaxService.getEquifaxScore(businessId as string),
      ]);

      res.status(200).json({
        message: 'Combined credit scores fetched successfully',
        cibil: cibilResult,
        experian: experianResult,
        crif: crifResult,
        equifax: equifaxResult,
        aggregatedAt: new Date(),
      });

    } catch (error) {
      next(error);
    }
  }
}

export const creditScoreController = new CreditScoreController();
