const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  // passReqToCallback : true,
}, (email, password, next) => {
  User.findOne({ 
    email,
  }).then((user) => {
    if (!user || !user.validatePassword(password)) {
      next(null, null, { message: 'Email or password is invalid' });
    } else {
      return next(null, user);
    }
  });
}));

passport.use('local-register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, next) => {
  User.findOne({
    email,
  }, function(err, user) {
    if (err) next(err);
    if (user) next(null, null, { message: 'There was an issue during registatration' });
    else {
      const newUser = new User({
        email: email,
        password: User.encrypt(password),
      });
      newUser.save(function(err) {
        next(err, newUser);
      });
    }
  });
}));

passport.serializeUser((user, next) => {
  next(null, user._id);
});

passport.deserializeUser((id, next) => {
  User.findById(id, function(err, user) {
    next(err, user);
  });
});
