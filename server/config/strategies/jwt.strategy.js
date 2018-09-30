const passport = require('passport');
const { Strategy: JWTStrategy, ExtractJWT } = require('passport-jwt');

const { UserLecturer, UserCadet } = require('../../modules/users/');

passport.use('jwt-cadet', new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PASSPORT_JWT_SECRET,
}, (jwtPayload, done) => UserCadet.findById(jwtPayload.id)
  .then(user => done(null, user))
  .catch(err => done(err))));

passport.use('jwt-lecturer', new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PASSPORT_JWT_SECRET,
}, (jwtPayload, done) => UserLecturer.findById(jwtPayload.id)
  .then(user => done(null, user))
  .catch(err => done(err))));
