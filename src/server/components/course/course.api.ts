import { Router } from 'express';
import * as passport from 'passport';

import { asyncHandler } from '../../config';
import { CourseController } from './course.controller';

class CourseApi {
  router: Router;
  handler: CourseController;

  constructor() {
    this.router = Router();
    this.handler = new CourseController();
    this.init();
  }

  init() {
    this.router.get('/', asyncHandler(this.handler.getAllCourses));
    this.router.post('/', asyncHandler(this.handler.createCourse));
    this.router.get('/:criteria', asyncHandler(this.handler.getCoursesWithCriteria));
    this.router.get('/:courseId', asyncHandler(this.handler.getCourse));
    this.router.put('/:courseId', asyncHandler(this.handler.updateCourse));
    this.router.delete('/:courseId', asyncHandler(this.handler.deleteCourse));

    this.router.get('/registry/entries', asyncHandler(this.handler.getAllEntriesFromRegistry));
    this.router.get('/registry/:entry', asyncHandler(this.handler.getEntryFromRegistry));
    this.router.post('/registry/', passport.authenticate('validate', { session: false }),
      asyncHandler(this.handler.saveEntry));
    this.router.delete('/registry/:entry');
  }
}

export const CourseRouter = new CourseApi().router;
