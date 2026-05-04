const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

function getGoogleCallbackURL() {
  return process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback';
}

module.exports = function initPassport(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const normalizedEmail = email ? email.trim().toLowerCase() : '';
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      const matches = await user.comparePassword(password);
      if (!matches) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: getGoogleCallbackURL()
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            return done(null, user);
          }

          const emailAddress = profile.emails && profile.emails[0] ? profile.emails[0].value.toLowerCase() : null;
          const emailVerified = Boolean(
            profile._json && (profile._json.email_verified === true || profile._json.verified_email === true)
          );

          if (emailAddress && emailVerified) {
            user = await User.findOne({ email: emailAddress });
            if (user) {
              user.googleId = profile.id;
              if (!user.displayName) {
                user.displayName = profile.displayName;
              }
              await user.save();
              return done(null, user);
            }
          }

          const createdEmail = emailAddress || `google_${profile.id}@placeholder.invalid`;
          const createdUser = await User.create({
            email: createdEmail,
            displayName: profile.displayName || 'Google User',
            googleId: profile.id,
            provider: 'google'
          });

          return done(null, createdUser);
        } catch (error) {
          return done(error);
        }
      }
    ));
  }

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).select('-password');
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};