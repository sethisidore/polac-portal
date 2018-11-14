import * as passport from 'passport';
import { Router } from 'express';

import { asyncHandler } from '../../util';
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
    this.router.get('/account', passport.authenticate('jwt', { session: false }), this.handler.getProfile);
    this.router.post('/login', asyncHandler(this.handler.login));
    this.router.get('/logout', asyncHandler(this.handler.logout));
    this.router.post('/register', asyncHandler(this.handler.register));
    this.router.get('/status', asyncHandler(this.handler.getStatus));
  }
}

export const AuthRouter = new AuthApi().router;
