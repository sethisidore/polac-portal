import { Router } from 'express';

import { asyncHandler } from '../../util';
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
    this.router.get('/', asyncHandler(this.handler.getCourse));
    this.router.post('/:courseId', asyncHandler(this.handler.createCourse));
    this.router.put('/:courseId', asyncHandler(this.handler.updateCourse));
    this.router.delete('/:courseId', asyncHandler(this.handler.deleteCourse));

    this.router.get('/registry/entries', asyncHandler(this.handler.getAllEntriesFromRegistry));
    this.router.get('/registry/:entry', asyncHandler(this.handler.getEntryFromRegistry));
    this.router.post('/register');
    this.router.delete('/registry/:entry');
  }
}

export const CourseRouter = new CourseApi().router;
