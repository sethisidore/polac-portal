const path = require('path');
require('./strategies/local.strategy');

const Auth = require('../modules/auth/');
const Course = require('../modules/course');
const Dept = require('../modules/dept');
const { UserApi } = require('../modules/users');
const Faculty = require('../modules/faculty');

module.exports = (app, passport) => {
  app.use('/', Auth);
  app.use('/courses', Course);
  app.use('/depts', Dept);
  app.use('/facs', Faculty);
  app.use('/user', passport.authenticate('jwt', { session: false }), UserApi);
  
  // Front-End Application: Send all other request to Angular
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });
};
