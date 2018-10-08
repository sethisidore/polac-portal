const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JWTStrategy } = require('passport-jwt');

const { User } = require('../../modules/users/');

passport.use(new LocalStrategy({
}, ((username, password, done) => {
  return User.findOne({ username })
    .then((err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect Username.',
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.',
        });
      }
      return done(null, user);
    });
})));

// passport-local-mongoose support
passport.use(new LocalStrategy(User.authenticate()));

/*
* @method {jwt}
* @memberOf {Strategy}
*
*/
passport.use(new JWTStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.PASSPORT_JWT_SECRET,
}, (jwt_payload, done) => User.findById(jwt_payload.sub)
  .then(user => done(null, user))
  .catch(err => done(err))));

/*
*@method {cookieExtractor}
*@memberOf {jwt}
*@return {[type]}
*
*/
function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
}
