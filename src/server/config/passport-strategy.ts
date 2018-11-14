import * as passport from 'passport';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import { User, UserType } from '../components/user/user.model';

// set up environment variables
if (process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(__dirname, 'env/.env') });
  dotenv.config({ path: path.join(__dirname, `env/.env.${process.env.NODE_ENV}`) });
}

// create a local strategy using passport-local-mongoose static method
passport.use(User.createStrategy());

/**
 * Jwt Middleware
 */
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SESSION_SECRET as string,
}, async (jwtPayload: any, done: Function) => {
  try {
    const user: UserType = await User.findByUsername(jwtPayload.username, false);
    if (user) {
      return done(null, user);
    }
  } catch (err) {
    return done(err);
  }
}));
