
import { Request, Response, NextFunction } from 'express';
import { analyticsService } from '../services/analyticsService';

class AnalyticsController {
  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await analyticsService.getPlatformStats();
      res.status(200).json(stats);
    } catch (error) {
      next(error);
    }
  }

  async getStatusDistribution(req: Request, res: Response, next: NextFunction) {
    try {
      const distribution = await analyticsService.getLoanStatusDistribution();
      res.status(200).json(distribution);
    } catch (error) {
      next(error);
    }
  }

  async getMonthlyApplications(req: Request, res: Response, next: NextFunction) {
    try {
      const monthlyData = await analyticsService.getMonthlyLoanApplications();
      res.status(200).json(monthlyData);
    } catch (error) {
      next(error);
    }
  }
}

export const analyticsController = new AnalyticsController();
