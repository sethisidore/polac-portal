import * as passport from 'passport';
import { Router } from 'express';

import { asyncHandler } from '../../util';
import { AccountController } from './account.controller';

class AccountApi {
  router: Router;
  handler: AccountController;

  constructor() {
    this.router = Router();
    this.handler = new AccountController();
    this.init();
  }

  init() {
    this.router.get('/', passport.authenticate('jwt', { session: false }), this.handler.getProfile);
    this.router.put('/', asyncHandler(this.handler.updateAccount));
    this.router.patch('/upload');
    this.router.delete('/', asyncHandler(this.handler.deleteAccount));
    this.router.get('/:result');
  }
}

export const AccountRouter = new AccountApi().router;
