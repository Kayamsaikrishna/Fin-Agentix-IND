
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { Role } from '../models/Role';

export const roleMiddleware = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.id;

    try {
      const user = await User.findByPk(userId, {
        include: [{ model: Role, as: 'Roles' }],
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userRoles = (user as any).Roles.map((role: any) => role.name);

      const hasRole = roles.some((role) => userRoles.includes(role));

      if (hasRole) {
        next();
      } else {
        res.status(403).json({ message: 'Forbidden. Insufficient role.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error checking user role', error });
    }
  };
};
