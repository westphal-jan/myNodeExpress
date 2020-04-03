const express = require('express');
const passport = require('passport');

const router = express.Router();

/* GET home page. */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

router.get('/register', function(req, res, next) {
  const message = req.flash('error');
  res.render('register', { message });
});

router.get('/login', function(req, res, next) {
  const message = req.flash('error');
  res.render('login', { message });
});

module.exports = router;
