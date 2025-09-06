
import { Request, Response, NextFunction } from 'express';
import { reportService } from '../services/reportService';
import { AppError } from '../middleware/errorHandler';

class ReportController {
  async generateLoanReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        throw new AppError('Both startDate and endDate query parameters are required', 400);
      }

      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new AppError('Invalid date format', 400);
      }

      const report = await reportService.generateLoanActivityReport(start, end);

      res.setHeader('Content-Type', report.mimeType);
      res.setHeader('Content-Disposition', `attachment; filename=${report.filename}`);
      res.status(200).send(report.content);

    } catch (error) {
      next(error);
    }
  }
}

export const reportController = new ReportController();
