import { Router } from 'express';

import { asyncHandler } from '../../config';
import { FacultyController } from './faculty.controller';

class FacultyApi {
  router: Router;
  handler: FacultyController;

  constructor() {
    this.router = Router();
    this.handler = new FacultyController();
    this.init();
  }

  init() {
    this.router.get('/', asyncHandler(this.handler.getAll));
    this.router.get('/:facultyId', asyncHandler(this.handler.getOne));
    this.router.post('/', asyncHandler(this.handler.createOne));
    this.router.put('/:facultyId', asyncHandler(this.handler.updateOne));
    this.router.delete('/:facultyId', asyncHandler(this.handler.deleteOne));
  }
}

export const FacultyRouter = new FacultyApi().router;
