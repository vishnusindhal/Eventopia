const path = require('path');

// Make your frontend folder public
app.use(express.static(path.join(__dirname, 'index')));

// Optional: Serve specific HTML pages
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'index', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'index', 'register.html'));
});

app.get('/dashboard', isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, 'index', 'dashboard.html'));
});
