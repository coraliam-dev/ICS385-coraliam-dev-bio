// Apply this middleware to any route that should only be accessible when logged in.
module.exports = function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/admin/login');
};
