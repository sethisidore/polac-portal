import { Request, Response, Application, NextFunction } from 'express';
import { PassportStatic } from 'passport';
import * as path from 'path';

import { AuthRouter, CourseRouter, DepartmentRouter,
  FacultyRouter, UserRouter, AccountRouter } from '../components';

import '../config/passport-strategy';
/**
 * Checks if the user is currently logged in the system
 */
const isValidated = (req: Request, res: Response, next: NextFunction) => {
  console.log(`user is ${req.user}`);
  return (req.user && req.user.expires > Date.now())
    ? next() : res.status(401).json({
      error: 'User not authenticated'
    });
};

export class RouteHandler {
  constructor() { }

  init(app: Application, passport: PassportStatic) {
    app.use('/api', AuthRouter);
    app.use('/api/account', passport.authenticate('jwt', { session: false }), AccountRouter);
    app.use('/api/course', CourseRouter);
    app.use('/api/department', DepartmentRouter);
    app.use('/api/faculty', FacultyRouter);
    app.use('/api', isValidated, UserRouter);
    app.use('error', passport.authenticate('local', { session: false }));

    // Front-End Application: Send all other request to Angular
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../../dist/polac/index.html'));
    });
  }
}
