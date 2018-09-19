const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const mongoDB = require('./config/database');

const utils = require('./modules/utils');

const app = express();

// Mongoose Database setup
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB.url)
  .then((() => console.log('Connected to DB')))
  .catch((err => console.log(err)));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../client/assets', 'favicon.ico')));
app.use(logger('dev'));
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

app.use(utils.wrapper);

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
