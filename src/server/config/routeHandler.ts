import { Request, Response, Application } from 'express';
import { PassportStatic } from 'passport';
import * as path from 'path';

import { AuthRouter, CourseRouter, DepartmentRouter,
  FacultyRouter, UserRouter, AccountRouter } from '../components';

import './passport-strategy';

export class RouteHandler {
  constructor() { }

  init(app: Application, passport: PassportStatic) {
    app.use('/api', AuthRouter);
    app.use('/api/account', passport.authenticate('validate', { session: false }), AccountRouter);
    app.use('/api/course', CourseRouter);
    app.use('/api/department', DepartmentRouter);
    app.use('/api/faculty', FacultyRouter);
    app.use('/api', passport.authenticate('validate', { session: false }), UserRouter);
    app.use('error', passport.authenticate('validate', { session: false }));

    // Front-End Application: Send all other request to Angular
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../../dist/polac/index.html'));
    });
  }
}
