
import { Request, Response, NextFunction } from 'express';
import { notificationService } from '../services/notificationService';
import { User } from '../models/User'; // Assuming you have a User model
import { AppError } from '../middleware/errorHandler';

class NotificationController {
  async sendTestNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;

      if (!userId) {
        throw new AppError('Authentication required', 401);
      }

      const user = await User.findByPk(userId);

      if (!user) {
        throw new AppError('User not found', 404);
      }

      // Example of sending a welcome email
      await notificationService.sendWelcomeEmail(user);

      res.status(200).json({ message: `Test notification sent to ${user.email}` });
    } catch (error) {
      next(error);
    }
  }
}

export const notificationController = new NotificationController();
