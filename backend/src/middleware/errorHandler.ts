import { Request, Response, NextFunction } from 'express';
import { logError } from '../utils/logger';
import { AuthRequest } from './auth.middleware';

export const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = (req as AuthRequest).userId;

  // Log error to MongoDB
  await logError(
    err,
    req.path,
    req.method,
    userId
  );

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

