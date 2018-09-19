const passport = require('passport');
const { Strategy: JWTStrategy, ExtractJWT } = require('passport-jwt');

const { UserLecturer, UserStudent } = require('../../modules/users/');

passport.use('jwt-student', new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'Your_Own_jWt_SeCrEt',
}, (jwtPayload, done) => UserStudent.findById(jwtPayload.id)
  .then(user => done(null, user))
  .catch(err => done(err))));

passport.use('jwt-lecturer', new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'Your_Own_jWt_SeCrEt',
}, (jwtPayload, done) => UserLecturer.findById(jwtPayload.id)
  .then(user => done(null, user))
  .catch(err => done(err))));
