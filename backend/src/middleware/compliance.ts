
import { Request, Response, NextFunction } from 'express';

export const compliance = (req: Request, res: Response, next: NextFunction) => {
    // Add compliance logic here
    console.log('Compliance middleware');
    next();
};
