import { Router } from 'express';

import { asyncHandler } from '../../util';
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
    this.router.post('/staff', asyncHandler(this.handler.getAllStaffs));
    this.router.get('/:username/account', asyncHandler(this.handler.getUserProfile));
    this.router.put('/:username/account/edit');
    this.router.put('/:username/account/editPassword', asyncHandler(this.handler.changePassword));
    this.router.delete('/:username/account/deleteAccount', asyncHandler(this.handler.deleteAccount));
  }
}

export const UserRouter = new UserApi().router;
