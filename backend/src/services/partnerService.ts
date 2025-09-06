
import { Partner } from '../models/Partner';
import { AppError } from '../middleware/errorHandler';

class PartnerService {
  async listPartners() {
    return Partner.findAll();
  }

  async getPartnerDetails(partnerId: number) {
    const partner = await Partner.findByPk(partnerId);
    
    if (!partner) {
      throw new AppError('Partner not found', 404);
    }
    return partner;
  }
}

export const partnerService = new PartnerService();
