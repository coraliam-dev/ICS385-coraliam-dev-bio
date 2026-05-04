const express = require('express');
const passport = require('passport');
const router = express.Router();

// GET /admin/login — render the login form
router.get('/login', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/admin/dashboard');
  const error = req.query.error || null;
  // Generate and pass CSRF token explicitly to avoid token mismatch
  const csrfToken = req.csrfToken ? req.csrfToken() : null;
  console.log('rendering /admin/login csrfToken:', JSON.stringify(csrfToken));

  // If the browser has a session cookie but the server has no session, clear the cookie
  try {
    console.log('/admin/login GET — sessionID:', req.sessionID, 'session.csrfSecret:', req.session && req.session.csrfSecret);
    const sidCookie = req.cookies && (req.cookies['connect.sid'] || req.cookies['sid']);
    if (sidCookie && !req.session) {
      console.warn('Detected stale session cookie with no server session; clearing cookie');
      res.clearCookie('connect.sid');
    }
  } catch (e) {}

  res.render('admin/login', { error, csrfToken });
});

// POST /admin/login — Passport handles credential verification
router.post('/login',
  (req, res, next) => {
    // Debug: log minimal info to help diagnose CSRF/session issues
    try {
      console.log('/admin/login POST — email:', req.body && req.body.email, 'body._csrf:', req.body && req.body._csrf);
      console.log('/admin/login POST — cookies header:', !!req.headers && !!req.headers.cookie, 'cookie header:', req.headers && req.headers.cookie);
      console.log('/admin/login POST — req.cookies:', req.cookies);
      console.log('/admin/login POST — req.headers:', { host: req.headers.host, origin: req.headers.origin });
      try {
        console.log('/admin/login POST — sessionID:', req.sessionID, 'session.csrfSecret:', req.session && req.session.csrfSecret);
      } catch (e) {}
    } catch (e) {
      console.error('Error logging login POST', e);
    }
    next();
  },
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
