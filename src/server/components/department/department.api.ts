import { Router } from 'express';

import { asyncHandler } from '../../util';
import { DepartmentController } from './department.controller';

class DepartmentApi {
  router: Router;
  handler: DepartmentController;

  constructor() {
    this.router = Router();
    this.handler = new DepartmentController();
    this.init();
  }

  init() {
    this.router.get('/', asyncHandler(this.handler.getAll));
    this.router.get('/:deptId', asyncHandler(this.handler.getOne));
    this.router.post('/', asyncHandler(this.handler.createOne));
    this.router.put('/:deptId', asyncHandler(this.handler.updateOne));
    this.router.delete('/:deptId', asyncHandler(this.handler.deleteOne));
  }
}

export const DepartmentRouter = new DepartmentApi().router;
