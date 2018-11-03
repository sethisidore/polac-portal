import * as passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
// import { Request } from 'express';

import { User, UserType } from '../components/user/user.model';

passport.use(User.createStrategy());

/**
 * Jwt Middleware
 */
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromRequestCookies(),
  secretOrKey: 'THis is a secret',
}, async (jwtPayload: any, done: Function) => {
  try {
    const user: UserType = await User.findById(jwtPayload.id);
    if (user) {
      return done(null, user);
    }
  } catch (err) {
    return done(err);
  }
}));

/*
function cookieExtractor () {
  return (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['AuthToken'];
    }
    return token;
  };
}*/
