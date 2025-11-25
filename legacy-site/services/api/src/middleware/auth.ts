import { Request, Response, NextFunction } from 'express';

// Extend Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; name: string; role: string };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Mock auth for now
  req.user = { id: '1', name: 'Test User', role: 'farmer' };
  next();
};
