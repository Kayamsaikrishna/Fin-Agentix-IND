
import { LoanApplication } from '../models/LoanApplication';
import { User } from '../models/User';
import { sequelize } from '../config/database';
import { Op } from 'sequelize';

class AnalyticsService {
  async getPlatformStats() {
    const totalUsers = await User.count();
    const totalLoanApplications = await LoanApplication.count();
    const totalDisbursed = await LoanApplication.sum('amount', { where: { status: 'Approved' } });

    return {
      totalUsers,
      totalLoanApplications,
      totalDisbursed: totalDisbursed || 0,
    };
  }

  async getLoanStatusDistribution() {
    return LoanApplication.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('status')), 'count'],
      ],
      group: ['status'],
    });
  }

  async getMonthlyLoanApplications() {
    return LoanApplication.findAll({
      attributes: [
        [sequelize.fn('DATE_TRUNC', 'month', sequelize.col('createdAt')), 'month'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      ],
      group: [sequelize.fn('DATE_TRUNC', 'month', sequelize.col('createdAt'))],
      order: [[sequelize.fn('DATE_TRUNC', 'month', sequelize.col('createdAt')), 'ASC']],
    });
  }
}

export const analyticsService = new AnalyticsService();
