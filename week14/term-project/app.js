require('dotenv').config();
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const csurf = require('csurf');
const mongoose = require('mongoose');

const initPassport = require('./config/passport');
const publicRoutes = require('./routes/public');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

function createSessionStore() {
  if (process.env.NODE_ENV === 'test') {
    return undefined;
  }

  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGO_URI is required');
  }

  return MongoStore.create({ mongoUrl: mongoUri });
}

function createApp() {
  const app = express();

  app.set('trust proxy', process.env.NODE_ENV === 'production' ? 1 : 0);
  app.use(helmet());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));
  app.use(cookieParser());
  app.use(session({
    secret: process.env.SESSION_SECRET || 'development-session-secret',
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    }
  }));

  initPassport(passport);
  app.use(passport.initialize());
  app.use(passport.session());

  if (process.env.NODE_ENV !== 'test' && process.env.DISABLE_CSRF !== 'true') {
    const csrfProtection = csurf({ cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' } });
    app.use(csrfProtection);
    app.use((req, res, next) => {
      res.locals.csrfToken = req.csrfToken();
      next();
    });
  } else {
    app.use((req, res, next) => {
      res.locals.csrfToken = null;
      next();
    });
  }

  app.use('/', publicRoutes);
  app.use('/', authRoutes);
  app.use('/admin', authRoutes);
  app.use('/', adminRoutes);
  app.use('/admin', adminRoutes);

  app.get('/healthz', (req, res) => {
    const connected = mongoose.connection.readyState === 1;
    res.status(connected ? 200 : 503).json({
      connected,
      mongooseReadyState: mongoose.connection.readyState,
      uptime: process.uptime()
    });
  });

  app.use((err, req, res, next) => {
    if (err && err.code === 'EBADCSRFTOKEN') {
      return res.status(403).render('admin/login', {
        error: 'csrf',
        errors: [],
        csrfToken: res.locals.csrfToken
      });
    }

    next(err);
  });

  return app;
}

module.exports = createApp();