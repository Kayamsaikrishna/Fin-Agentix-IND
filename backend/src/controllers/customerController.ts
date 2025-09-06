
import { Request, Response, NextFunction } from 'express';
import { customerService } from '../services/customerService';

class CustomerController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const profile = await customerService.getCustomerProfile(userId);
      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const profileData = req.body;
      const updatedProfile = await customerService.updateCustomerProfile(userId, profileData);
      res.status(200).json({ message: 'Profile updated successfully', user: updatedProfile });
    } catch (error) {
      next(error);
    }
  }
}

export const customerController = new CustomerController();
