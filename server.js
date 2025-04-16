const express = require('express');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'index')));

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index', 'login.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'index', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'index', 'registration.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'index', 'dashboard.html')); // Optional if you add a dashboard
});

// File Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// In-memory user store (replace with DB in real app)
const users = [];

// Registration POST route
app.post('/register', upload.single('studentPhoto'), (req, res) => {
  const {
    rollNo, firstName, lastName, fatherName, dob, mobile,
    username, password, gender, course, city, address
  } = req.body;

  // Basic check for duplicate email
  if (users.find(u => u.username === username)) {
    return res.status(409).send('User already exists');
  }

  const newUser = {
    rollNo, firstName, lastName, fatherName, dob, mobile,
    username, password, gender, course, city, address,
    photo: req.file ? req.file.filename : null
  };

  users.push(newUser);
  res.send('Registration successful!');
});

// Login POST route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return res.send(`Welcome, ${user.firstName}! Login successful.`);
  } else {
    return res.status(401).send('Invalid credentials');
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
