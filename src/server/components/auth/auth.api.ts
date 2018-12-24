import { Router } from 'express';
import * as passport from 'passport';

import { asyncHandler } from '../../config';
import { AuthController } from './auth.controller';

class AuthApi {
  router: Router;
  handler: AuthController;

  constructor() {
    this.router = Router();
    this.handler = new AuthController();
    this.init();
  }

  init() {
    this.router.post('/login', asyncHandler(this.handler.login));
    this.router.get('/logout', asyncHandler(this.handler.logout));
    this.router.post('/register', asyncHandler(this.handler.register));
    this.router.get('/status', passport.authenticate('validate', { session: false }),
      asyncHandler(this.handler.getStatus));
    this.router.get('/forgot');
    this.router.get('/:token');

    this.router.post('/tips', asyncHandler(this.handler.saveTips));
    this.router.get('/tips', asyncHandler(this.handler.getTips));
    this.router.get('/tips/:tipsId');
  }
}

export const AuthRouter = new AuthApi().router;
