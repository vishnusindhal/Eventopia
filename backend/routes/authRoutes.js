const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic input validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email and password are required' });
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email or username already exists' });
        }

        // Create user (password will be hashed by model middleware)
        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Registration successful!',
            user: {
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;

const jwt = require('jsonwebtoken'); // if you're using JWT (optional)

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if both fields are present
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user by email and include password field
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Update last login time
        await user.updateLastLogin();

        // Generate JWT token (optional)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '1d'
        });

        res.status(200).json({
            success: true,
            message: 'Login successful!',
            token, // you can use this on frontend if needed
            user: {
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
});

