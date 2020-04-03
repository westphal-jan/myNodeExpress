const express = require('express');
const passport = require('passport');

require('./../../models/user');

const router = express.Router();

router.post('/register', (req, res, next) => {
  // console.log(req.body);
  handler = passport.authenticate('local-register', {
    successRedirect: '/dashboard',
    failureRedirect: '/register',
    failureFlash: req.flash('message'),
  });
  handler(req, res, next);
});

router.post('/login', (req, res, next) => {
  handler = passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: req.flash('message'),
  });
  handler(req, res, next);
});
  

router.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
