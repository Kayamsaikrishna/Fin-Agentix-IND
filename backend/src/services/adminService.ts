
import { User } from '../models/User';
import { LoanApplication } from '../models/LoanApplication';
import { Role } from '../models/Role';
import { UserRole } from '../models/UserRole';
import { AppError } from '../middleware/errorHandler';

class AdminService {
  async listUsers() {
    return User.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: Role, attributes: ['name'], through: { attributes: [] } }],
      order: [['createdAt', 'DESC']],
    });
  }

  async viewUser(userId: number) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
      include: [
        { model: LoanApplication as any },
        { model: Role, attributes: ['name'], through: { attributes: [] } },
    ],
    });
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async updateUserRole(userId: number, newRole: string) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const role = await Role.findOne({ where: { name: newRole } });
    if (!role) {
        throw new AppError('Role not found', 404);
    }

    await UserRole.destroy({ where: { userId } });
    await UserRole.create({ userId, roleId: role.id });

    return this.viewUser(userId);
  }

  async listLoanApplications() {
    return LoanApplication.findAll({
      include: [{ model: User, attributes: ['id', 'fullName', 'email'] }],
      order: [['createdAt', 'DESC']],
    });
  }
}

export const adminService = new AdminService();
