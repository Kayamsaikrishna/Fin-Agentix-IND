
import { Request, Response, NextFunction } from 'express';
import { handleError } from '../utils/errorHandler';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  handleError(err, res);
};
