const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = 3000;

// CORS Setup
app.use(cors({
    origin: 'http://localhost:5500', // your frontend port
    credentials: true
}));

// Static files (HTML pages)
app.use(express.static(path.join(__dirname, 'index')));

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// File upload setup using multer
const upload = multer({ dest: 'uploads/' });

// Serve registration page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'index', 'registration.html'));
});

// Handle form submission
app.post('/register', upload.single('studentPhoto'), (req, res) => {
    const {
        rollNo,
        firstName,
        lastName,
        fatherName,
        dob,
        mobile,
        username,
        password,
        gender,
        course,
        city,
        address
    } = req.body;

    const studentPhoto = req.file;

    console.log('Form data received:', req.body);
    console.log('Uploaded file info:', studentPhoto);

    // TODO: Save data to DB if needed

    res.send('Registration successful!');
});

// Start the server
app.listen(PORT, () => {
            console.log(Server running at http: //localhost:${PORT});
            });