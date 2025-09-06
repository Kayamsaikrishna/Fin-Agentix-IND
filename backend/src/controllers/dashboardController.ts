
import { Request, Response, NextFunction } from 'express';
import { dashboardService } from '../services/dashboardService';

class DashboardController {
  async getMyDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const dashboardData = await dashboardService.getUserDashboard(userId);
      res.status(200).json(dashboardData);
    } catch (error) {
      next(error);
    }
  }
}

export const dashboardController = new DashboardController();
