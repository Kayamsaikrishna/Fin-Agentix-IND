
import { Request, Response, NextFunction } from 'express';
import { partnerService } from '../services/partnerService';

class PartnerController {
  async getAllPartners(req: Request, res: Response, next: NextFunction) {
    try {
      const partners = await partnerService.listPartners();
      res.status(200).json(partners);
    } catch (error) {
      next(error);
    }
  }

  async getPartnerById(req: Request, res: Response, next: NextFunction) {
    try {
      const partnerId = parseInt(req.params.id);
      const partner = await partnerService.getPartnerDetails(partnerId);
      res.status(200).json(partner);
    } catch (error) {
      next(error);
    }
  }
}

export const partnerController = new PartnerController();
