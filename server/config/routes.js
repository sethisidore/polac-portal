const path = require('path');

const auth = require('../modules/auth/');
const Course = require('../modules/course');
const Dept = require('../modules/dept');
const { Student, Lecturer /* , Admin */} = require('../modules/users');

module.exports = (app, passport) => {
  app.use('/auth', auth);
  app.use('/courses', Course);
  app.use('/depts', Dept);
  app.use('/students', passport.authenticate('jwt-student', { session: false }), Student);
  app.use('/lecturers', passport.authenticate('jwt-lecturer', { session: false }), Lecturer);
  // app.use('/admins', Admin);

  // Front-End Application: Send all other request to Angular
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });
};
