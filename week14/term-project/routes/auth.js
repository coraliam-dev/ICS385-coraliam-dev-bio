const express = require('express');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const router = express.Router();

function renderLogin(res, options = {}) {
  return res.status(options.statusCode || 200).render('admin/login', {
    error: options.error || null,
    errors: options.errors || [],
    csrfToken: options.csrfToken || null
  });
}

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/dashboard');
  return renderLogin(res, {
    error: req.query.error || null,
    csrfToken: res.locals.csrfToken || null
  });
});

const loginValidators = [
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid').normalizeEmail(),
  body('password').trim().notEmpty().withMessage('Password is required')
];

router.post('/login', loginValidators, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return renderLogin(res, {
      statusCode: 400,
      errors: errors.array(),
      csrfToken: res.locals.csrfToken || null
    });
  }

  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login?error=1',
    failureFlash: false
  })(req, res, next);
});

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect('/login');
  });
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login?error=google' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

module.exports = router;
