
import { Request, Response, NextFunction } from 'express';
import { kycService } from '../services/kycService';
import { AppError } from '../middleware/errorHandler';

class KycController {
  async submitKyc(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { aadharNumber, panNumber } = req.body;

      if (!aadharNumber || !panNumber) {
        throw new AppError('Aadhar number and PAN number are required', 400);
      }

      const kycResult = await kycService.startKycProcess(userId, aadharNumber, panNumber);
      res.status(200).json({ message: 'KYC process completed', kyc: kycResult });
    } catch (error) {
      next(error);
    }
  }

  async getStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const kycStatus = await kycService.getKycStatus(userId);
      res.status(200).json(kycStatus);
    } catch (error) {
      next(error);
    }
  }
}

export const kycController = new KycController();
