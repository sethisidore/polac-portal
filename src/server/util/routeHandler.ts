import { Request, Response, Application } from 'express';
import { PassportStatic } from 'passport';
import * as path from 'path';

import { AuthRouter, CourseRouter, DepartmentRouter,
  FacultyRouter, UserRouter } from '../components';

import '../config/passport-strategy';

export class RouteHandler {
  constructor() { }

  init(app: Application, passport: PassportStatic) {
    app.use('/api', AuthRouter);
    app.use('/api/course', CourseRouter);
    app.use('/api/department', DepartmentRouter);
    app.use('/api/faculty', FacultyRouter);
    app.use('/api/users', passport.authenticate('jwt', { session: false }), UserRouter);

    // Front-End Application: Send all other request to Angular
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../../dist/polac/index.html'));
    });
  }
}
