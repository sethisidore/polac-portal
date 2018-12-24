import { Router } from 'express';

import { asyncHandler } from '../../config';
import { UserController } from './user.controller';

class UserApi {
  router: Router;
  handler: UserController;

  constructor() {
    this.router = Router();
    this.handler = new UserController();
    this.init();
  }

  init() {
    this.router.get('/cadet', asyncHandler(this.handler.getAllCadets));
    this.router.get('/cadet/:cadetId', asyncHandler(this.handler.getCadet));
    this.router.get('/cadet/:criteria', asyncHandler(this.handler.getCadetWithCriteria));
    this.router.post('/staff', asyncHandler(this.handler.getAllStaffs));
    this.router.get('/staff/:staffId', asyncHandler(this.handler.getStaff));
    this.router.get('/staff/:criteria', asyncHandler(this.handler.getStaffWithCriteria));
  }
}

export const UserRouter = new UserApi().router;
