import { Request, Response, NextFunction } from 'express';

const csrfHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.code !== 'EBADCSRFTOKEN') { return next(err); }
  res.status(403).json('Form tampered with');
};

export { csrfHandler };
