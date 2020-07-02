var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cfg = require('./cfg/cfg');

if (!cfg) {
  console.log('./cfg/cfg.js fiule not exists');
  process.exit(1);
}

var app = express();

if (cfg.web.cors) {
  app.use(require('cors')());
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'fe', 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/api/data'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect(cfg.db.url, (err) => {
  if (err) return console.error(err);
  console.log('mongoose connected');
});

module.exports = app;
