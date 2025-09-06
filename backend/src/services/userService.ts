
import { User } from '../models/User';
import { AppError } from '../middleware/errorHandler';

class UserService {
  async getUserProfile(userId: number) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}

export const userService = new UserService();
