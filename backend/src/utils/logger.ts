import ErrorLog from '../models/ErrorLog.model';

export const logError = async (
  error: any,
  route?: string,
  method?: string,
  userId?: string
): Promise<void> => {
  try {
    await ErrorLog.create({
      message: error.message || 'Unknown error',
      stack: error.stack,
      route,
      method,
      userId: userId ? (userId as any) : undefined,
      timestamp: new Date(),
    });
  } catch (logError) {
    console.error('Failed to log error to MongoDB:', logError);
  }
};

