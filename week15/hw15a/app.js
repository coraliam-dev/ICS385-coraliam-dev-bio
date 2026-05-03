require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { connectDB } = require('./config/db');
const passport = require('passport');
require('./config/passport');

const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  // support different connect-mongo versions
  store: (function(){
    try {
      if (typeof MongoStore.create === 'function') return MongoStore.create({ mongoUrl: process.env.MONGO_URI });
      if (typeof MongoStore === 'function') return MongoStore({ mongoUrl: process.env.MONGO_URI });
    } catch (e) {}
    try {
      const MongoStoreFactory = require('connect-mongo')(session);
      return new MongoStoreFactory({ url: process.env.MONGO_URI });
    } catch (e) {
      return undefined;
    }
  })(),
  cookie: { httpOnly: true, maxAge: 86400000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.render('home', { user: req.user }));

app.get('/profile', require('./middleware/ensureAuth'), (req, res) => {
  res.render('profile', { user: req.user });
});

app.use('/auth', require('./routes/auth'));

app.post('/logout', (req, res, next) => {
  req.logout(function(err){
    if (err) return next(err);
    req.session.destroy(() => res.redirect('/'));
  });
});

const PORT = process.env.PORT || 3000;
async function startServer() {
  try {
    await connectDB();
    console.log('[OK] MongoDB connected');
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  } catch (err) {
    console.error('[ERR] MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

startServer();
