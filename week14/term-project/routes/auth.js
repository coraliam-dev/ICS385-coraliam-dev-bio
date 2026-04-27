const express = require('express');
const passport = require('passport');
const router = express.Router();

// GET /admin/login — render the login form
router.get('/login', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/admin/dashboard');
  const error = req.query.error || null;
  res.render('admin/login', { error });
});

// POST /admin/login — Passport handles credential verification
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin/login?error=1',
    failureFlash: false
  })
);

// GET /admin/logout — destroy session and redirect
router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect('/admin/login');
  });
});

module.exports = router;
