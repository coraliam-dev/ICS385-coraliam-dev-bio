require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const initPassport = require('./passport-config');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Basic express setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB and start server after successful connection
mongoose.set('strictQuery', false);
// Fail fast: don't buffer mongoose model operations indefinitely when the DB is unreachable
mongoose.set('bufferCommands', false);

const mongooseOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Give up faster when the server selection fails so we surface errors quickly
  serverSelectionTimeoutMS: 5000,
  // Connection/socket tuning
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  maxPoolSize: Number(process.env.MONGO_MAX_POOL || 10),
  minPoolSize: Number(process.env.MONGO_MIN_POOL || 0),
  // heartbeat frequency for monitoring (ms)
  heartbeatFrequencyMS: Number(process.env.MONGO_HEARTBEAT_MS || 10000)
};

mongoose.connection.on('error', err => console.error('MongoDB connection error:', err));
mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected'));
mongoose.connection.on('reconnected', () => console.log('MongoDB reconnected'));

// Optionally enable mongoose debug via env var
if (process.env.ENABLE_MONGOOSE_DEBUG === 'true') {
  mongoose.set('debug', true);
}

// Wrap connect in a retry helper so transient network issues don't immediately kill the process.
function startServerAfterConnect() {
  console.log('MongoDB connected');

  // Session middleware (must come BEFORE passport.initialize())
  app.use(cookieParser());

  app.use((req, res, next) => {
    try {
      const sid = req.cookies && (req.cookies['connect.sid'] || req.cookies['sid']);
      if (sid && mongoose.connection && mongoose.connection.db) {
        const coll = mongoose.connection.db.collection('sessions');
        coll.findOne({ _id: sid }).then(doc => {
          if (!doc) res.clearCookie('connect.sid');
        }).catch(() => {});
      }
    } catch (e) {}
    next();
  });

  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { secure: false }
  }));

  // Passport setup
  initPassport(passport);
  app.use(passport.initialize());
  app.use(passport.session());

  // CSRF protection using cookie-based tokens (can be disabled for troubleshooting)
  if (process.env.DISABLE_CSRF === 'true') {
    console.warn('CSRF protection is DISABLED (DISABLE_CSRF=true)');
  } else {
    console.log('CSRF protection is ENABLED (cookie-based)');
    const csrfProtection = csurf({ cookie: { httpOnly: true } });
    app.use((req, res, next) => csrfProtection(req, res, next));
    app.use((req, res, next) => {
      try {
        res.locals.csrfToken = req.csrfToken();
      } catch (e) {
        res.locals.csrfToken = null;
      }
      next();
    });
  }

  // Mount routes
  app.use('/admin', require('./routes/auth'));
  app.use('/admin', require('./routes/admin'));

  // Health check endpoint for orchestration / load balancers
  app.get('/healthz', async (req, res) => {
    const ok = mongoose.connection && mongoose.connection.readyState === 1;
    const info = {
      uptime: process.uptime(),
      mongooseReadyState: mongoose.connection.readyState,
      connected: ok
    };
    res.status(ok ? 200 : 503).json(info);
  });

  // Simple index route
  app.get('/', (req, res) => res.send('Week14 Term Project - auth demo'));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Attempt connection with retries/backoff
let connectAttempts = 0;
const MAX_CONNECT_ATTEMPTS = Number(process.env.MONGO_CONNECT_RETRIES || 5);
const BASE_DELAY_MS = 2000;

function connectWithRetry() {
  connectAttempts += 1;
  console.log(`Attempting MongoDB connection (attempt ${connectAttempts}/${MAX_CONNECT_ATTEMPTS})`);
  mongoose.connect(process.env.MONGODB_URI, mongooseOpts)
    .then(() => startServerAfterConnect())
    .catch(err => {
      console.error('MongoDB connection failed:', err.message || err);
      if (connectAttempts < MAX_CONNECT_ATTEMPTS) {
        const delay = BASE_DELAY_MS * connectAttempts;
        console.log(`Retrying in ${delay}ms...`);
        setTimeout(connectWithRetry, delay);
      } else {
        console.error('Exceeded MongoDB connect attempts, exiting.');
        process.exit(1);
      }
    });
}

// Listen for connection lifecycle events
mongoose.connection.on('connected', () => console.log('Mongoose connected event'));
mongoose.connection.on('error', err => console.error('MongoDB connection error:', err));
mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected'));
mongoose.connection.on('reconnected', () => console.log('MongoDB reconnected'));

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('SIGINT received: closing mongoose connection');
  try {
    await mongoose.connection.close(false);
    process.exit(0);
  } catch (e) {
    process.exit(1);
  }
});

connectWithRetry();

// Global error handler for CSRF so we give a helpful message
app.use((err, req, res, next) => {
  if (err && err.code === 'EBADCSRFTOKEN') {
    console.warn('Invalid CSRF token detected for request:', req.method, req.originalUrl);
    // If this was a form submission, redirect to login with a short message
    if (req.originalUrl && req.originalUrl.startsWith('/admin')) {
      return res.status(403).render('admin/login', { error: 'csrf', csrfToken: req.csrfToken ? req.csrfToken() : null });
    }
    return res.status(403).send('Invalid CSRF token. Please clear site cookies and retry.');
  }
  next(err);
});
