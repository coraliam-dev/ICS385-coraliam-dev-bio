const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { connectDB, mongoose } = require('./db');

async function ensureMongoConnected() {
  if (mongoose.connection.readyState === 1) return;
  await connectDB();
}

function usersCollection() {
  if (!mongoose.connection.db) {
    throw new Error('MongoDB connection is not ready');
  }
  return mongoose.connection.db.collection('users');
}

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('[PASSPORT] verify callback called for profile id:', profile.id);
    console.log('[PASSPORT] profile:', { id: profile.id, displayName: profile.displayName, email: profile.emails && profile.emails[0] ? profile.emails[0].value : null });
    await ensureMongoConnected();
    console.log('[PASSPORT] mongoose readyState:', mongoose.connection.readyState);
    let user;
    try {
      user = await usersCollection().findOne({ googleId: profile.id });
    } catch (e) {
      console.error('[PASSPORT] collection findOne error:', e);
      throw e;
    }
    if (!user) {
      const doc = {
        googleId: profile.id,
        email: profile.emails[0].value.toLowerCase(),
        displayName: profile.displayName,
        provider: 'google',
        createdAt: new Date()
      };
      const result = await usersCollection().insertOne(doc);
      user = Object.assign({ _id: result.insertedId }, doc);
    }

    console.log('[PASSPORT] verified user:', user && (user._id || user.id));
    done(null, user);
  } catch (err) {
    console.error('[PASSPORT] verify error:', err);
    done(err);
  }
}));

passport.serializeUser((user, done) => {
  try {
    const id = user._id ? user._id.toString() : (user.id ? user.id.toString() : null);
    done(null, id);
  } catch (e) { done(e); }
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log('[PASSPORT] deserializeUser id:', id);
    console.log('[PASSPORT] mongoose readyState:', mongoose.connection.readyState);
    await ensureMongoConnected();
    const user = await usersCollection().findOne({ _id: new mongoose.Types.ObjectId(id) });
    console.log('[PASSPORT] deserialized user:', user && (user._id || user.id));
    done(null, user);
  }
  catch (e) { console.error('[PASSPORT] deserialize error:', e); done(e); }
});

module.exports = passport;
