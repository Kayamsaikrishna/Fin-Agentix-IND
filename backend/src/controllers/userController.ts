
import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';

class UserController {
  async getMyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const user = await userService.getUserProfile(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
