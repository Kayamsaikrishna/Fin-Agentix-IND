
import { LoanApplication } from '../models/LoanApplication';
import { User } from '../models/User';
import { Op } from 'sequelize';

class ReportingService {
  /**
   * Generates a summary report of loan applications.
   * Can be filtered by status and a date range.
   */
  async generateLoanSummaryReport(status?: string, startDate?: Date, endDate?: Date): Promise<any> {
    console.log('Generating loan summary report...');

    const whereClause: any = {};

    if (status) {
      whereClause.status = status;
    }

    if (startDate && endDate) {
      whereClause.createdAt = {
        [Op.between]: [startDate, endDate],
      };
    } else if (startDate) {
      whereClause.createdAt = {
        [Op.gte]: startDate,
      };
    } else if (endDate) {
      whereClause.createdAt = {
        [Op.lte]: endDate,
      };
    }

    const totalApplications = await LoanApplication.count({ where: whereClause });
    const totalAmount = await LoanApplication.sum('amount', { where: whereClause });

    const applications = await LoanApplication.findAll({
      where: whereClause,
      include: [{ model: User, attributes: ['id', 'fullName', 'email'] }],
      order: [['createdAt', 'DESC']],
    });

    console.log('Report generation complete.');

    return {
      totalApplications,
      totalAmount: totalAmount || 0,
      filters: { status, startDate, endDate },
      applications,
    };
  }

  /**
   * Generates a report on user activity.
   */
  async generateUserActivityReport(): Promise<any> {
    console.log('Generating user activity report...');

    const totalUsers = await User.count();
    const newUsersLast30Days = await User.count({
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      },
    });

    console.log('User activity report complete.');

    return {
      totalUsers,
      newUsersLast30Days,
    };
  }
}

export const reportingService = new ReportingService();
