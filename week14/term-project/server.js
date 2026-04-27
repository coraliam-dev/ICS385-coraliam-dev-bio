require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const initPassport = require('./passport-config');
const csurf = require('csurf');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Basic express setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => console.error(err));

// Session middleware (must come BEFORE passport.initialize())
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

// CSRF protection for forms (requires sessions)
app.use(csurf());
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Mount routes
app.use('/admin', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));

// Simple index route
app.get('/', (req, res) => res.send('Week14 Term Project - auth demo'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
