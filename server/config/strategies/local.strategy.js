const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const { UserLecturer, UserCadet } = require('../../modules/users/');

passport.use(new LocalStrategy({
  passReqToCallback: true,
}, ((req, username, password, done) => {
  if (req.body.role === 'lecturer') {
    UserLecturer.findById({ username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.',
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.',
        });
      }
      return done(null, user);
    });
  }
  if (req.body.role === 'cadet') {
    UserCadet.findById({ username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.',
        });
      }
      return done(null, user);
    });
  }
})));

passport.use('local-register', new LocalStrategy({
  passReqToCallback: true,
}, ((req, done) => {
  if (req.body.isUser === 'lecturer') {
    const User = new UserLecturer(req.body);
    User.save(done);
  }
  if (req.body.isUser === 'cadet') {
    const User = new UserCadet(req.body);
    User.save(done);
  }
})));
