var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var expressSession = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const viewRouter = require('./routes/index');
const apiRouter = require('./routes/api/index');

require('./models/user');
require('./config/passport');

mongoose.connect('mongodb://localhost:27017/test-db', { useNewUrlParser: true, useUnifiedTopology: true });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret: "fa;sdjnhf;aosdjgfasjdf;lasjd;lfaasl;fsafdas", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', viewRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
