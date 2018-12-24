import * as passport from 'passport';
import { Strategy as JWTStrategy, JwtFromRequestFunction } from 'passport-jwt';
import { Request } from 'express';

import { User, UserType } from '../components/user/user.model';


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
 * Jwt Middleware for getting user account
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

// Middleware to use for validating user for each request
passport.use('validate', new JWTStrategy({
  jwtFromRequest: CookieExtractor,
  secretOrKey: process.env.SESSION_SECRET
}, async (token: any, done: Function) => {
  try {
    return done(null, token.user);
  } catch (err) {
    return done(err);
  }
}));
