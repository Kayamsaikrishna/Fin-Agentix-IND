
import { Response } from 'express';
import logger from '../config/logger';

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const handleError = (err: Error, res: Response) => {
  logger.error(err);

  if (err instanceof AppError) {
    const { statusCode, message } = err;
    return res.status(statusCode).json({
      status: 'error',
      statusCode,
      message,
    });
  }

  return res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'An unexpected error occurred.',
  });
};
