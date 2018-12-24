import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (fn: (req: Request, res: Response, next?: NextFunction) => void) =>
  (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const csrfHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.code !== 'EBADCSRFTOKEN') { return next(err); }
  return res.status(403).json('Form tampered with');
};

