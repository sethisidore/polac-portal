import * as passport from 'passport';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Strategy as JWTStrategy, JwtFromRequestFunction } from 'passport-jwt';
import { Request } from 'express';

import { User, UserType } from '../components/user/user.model';

// set up environment variables
if (process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(__dirname, 'env/.env') });
  dotenv.config({ path: path.join(__dirname, `env/.env.${process.env.NODE_ENV}`) });
}

// create a local strategy using passport-local-mongoose static method
passport.use(User.createStrategy());

/**
 * @method CookieExtractor
 * @summary Extracts jwt from a request cookie i.e req.cookies
 */
const CookieExtractor: JwtFromRequestFunction = (req: Request) => {
  let token: string;
  if (req && req.cookies) {
    token = req.cookies['auth-token'];
  }
  return token;
};

/**
 * Jwt Middleware
 */
passport.use(new JWTStrategy({
  jwtFromRequest: CookieExtractor,
  secretOrKey: process.env.SESSION_SECRET,
}, async (jwtPayload: any, done: Function) => {
  try {
    const user: UserType = await User.findByUsername(jwtPayload.user.username, false);
    if (user) {
      return done(null, user);
    }
  } catch (err) {
    return done(err);
  }
}));
