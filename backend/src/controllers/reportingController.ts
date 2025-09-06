
import { Request, Response, NextFunction } from 'express';
import { reportingService } from '../services/reportingService';

class ReportingController {
  async getLoanSummary(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, startDate, endDate } = req.query;
      
      const report = await reportingService.generateLoanSummaryReport(
        status as string,
        startDate ? new Date(startDate as string) : undefined,
        endDate ? new Date(endDate as string) : undefined
      );
      
      res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  }

  async getUserActivity(req: Request, res: Response, next: NextFunction) {
    try {
      const report = await reportingService.generateUserActivityReport();
      res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  }
}

export const reportingController = new ReportingController();
