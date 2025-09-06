
import { Request, Response, NextFunction } from 'express';

export const rbac = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRoles = (req as any).user.roles;
        const hasRole = roles.some(role => userRoles.includes(role));
        if (!hasRole) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
};
