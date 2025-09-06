
import { Request, Response, NextFunction } from 'express';
import { adminService } from '../services/adminService';
import { AppError } from '../middleware/errorHandler';

class AdminController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await adminService.listUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id);
      const user = await adminService.viewUser(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async changeUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id);
      const { role } = req.body;

      if (!role || !['customer', 'underwriter', 'admin'].includes(role)) {
        throw new AppError('Invalid role specified', 400);
      }

      const updatedUser = await adminService.updateUserRole(userId, role);
      res.status(200).json({ message: 'User role updated successfully', user: updatedUser });
    } catch (error) {
      next(error);
    }
  }

  async getAllLoanApplications(req: Request, res: Response, next: NextFunction) {
    try {
      const applications = await adminService.listLoanApplications();
      res.status(200).json(applications);
    } catch (error) {
      next(error);
    }
  }
}

export const adminController = new AdminController();
