const path = require('path');
const Course = require('../modules/course');
const Dept = require('../modules/dept');
const { Student, Lecturer /* , Admin */} = require('../modules/users');

module.exports = (app) => {
  app.use('/courses', Course);
  app.use('/depts', Dept);
  app.use('/students', Student);
  app.use('/lecturers', Lecturer);
  // app.use('/admins', Admin);

  // Front-End Application: Send all other request to Angular
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });
};
