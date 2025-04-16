const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User'); // Your User model

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/eventopia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// CORS to allow frontend to send cookies
app.use(cors({
  origin: 'http://localhost:5500', // Replace with your frontend port
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Serve frontend files
app.use(express.static(path.join(__dirname, 'index')));

// Routes
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'index', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'index', 'register.html'));
});

app.get('/dashboard', isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, 'index', 'dashboard.html'));
});

// Registration handler
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ username: email });
    await User.register(user, password);
    res.status(200).json({ success: true, message: 'Registered successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Login handler
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

// Logout handler
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.json({ success: true, message: 'Logged out' });
  });
});

// Login check middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
