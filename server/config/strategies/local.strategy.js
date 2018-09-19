const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const { UserLecturer, UserStudent } = require('../../modules/users/');

passport.use(new LocalStrategy({
  passReqToCallback: true,
}, ((req, username, password, done) => {
  if (req.body.isUser === 'lecturer') {
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
  if (req.body.isUser === 'student') {
    UserStudent.findById({ username }, (err, user) => {
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
    const User = new UserLecturer({
      username: req.body.username,
      Fname: req.body.first_name,
      Lname: req.body.last_name,
      Oname: req.body.mid_name,
      sex: req.body.sex,
      DOB: req.body.date_of_birth,
      rank: req.body.rank,
      degrees: req.body.degrees,
    });
    User.save(done);
  }
  if (req.body.isUser === 'student') {
    const User = new UserStudent({
      username: req.body.username,
      Fname: req.body.first_name,
      Lname: req.body.last_name,
      Oname: req.body.mid_name,
      sex: req.body.sex,
      DOB: req.body.date_of_birth,
      dept: req.body.dept,
      squad: req.body.squad,
      RC: req.body.RC,
    });
    User.save(done);
  }
})));
