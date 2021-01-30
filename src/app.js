'use strict';
const createHttpError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const router = require('./router');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'pug');

app.use(
  cors({
    credentials: true,
    origin: (req, cb) => {
      // allow origin from anywhere
      cb(null, true);
    },
  }),
);
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  sassMiddleware({
    src: path.join(__dirname, '..', 'public'),
    dest: path.join(__dirname, '..', 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
  }),
);

app.use('/', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createHttpError(404));
});

// error handler
app.use(function (err, req, res, _) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json(res.locals);
});

module.exports = app;
