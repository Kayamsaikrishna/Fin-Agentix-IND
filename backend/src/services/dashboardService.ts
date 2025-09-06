
import { User } from '../models/User';
import { LoanApplication } from '../models/LoanApplication';
import { AppError } from '../middleware/errorHandler';

class DashboardService {
  async getUserDashboard(userId: number) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const recentApplications = await LoanApplication.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 5,
    });

    const applicationStats = await LoanApplication.findAll({
        attributes: [
            'status',
            [LoanApplication.sequelize!.fn('COUNT', LoanApplication.sequelize!.col('status')), 'count'],
        ],
        where: { userId },
        group: ['status'],
        raw: true,
    });

    return {
      user,
      recentApplications,
      applicationStats,
    };
  }
}

export const dashboardService = new DashboardService();
