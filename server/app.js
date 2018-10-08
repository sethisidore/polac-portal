const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');

const mongoDB = require('./config/database');
const { asyncHandler } = require('./modules/utils');

require('dotenv').config({ path: 'C:/Development/portalApp/server/config/env/.env'});
require('dotenv').config({ path: 'C:/Development/portalApp/server/config/env/.env.' + process.env.NODE_ENV });

const app = express();

// Connect to database
mongoDB.open();

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../client/assets', 'favicon.ico')));
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, '../client')));

// Configure and Authenticate Route MiddleWare
require('./config/routes')(app, passport);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(asyncHandler);

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
