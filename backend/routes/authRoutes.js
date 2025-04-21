const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Register endpoint
router.post('/register', async (req, res) => {
    try {
        // Input validation
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ 
                error: 'Username, email and password are required' 
            });
        }

        // Validate email format
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Validate password strength
        if (password.length < 6) {
            return res.status(400).json({ 
                error: 'Password must be at least 6 characters' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({ 
            username,
            email,
            password: hashedPassword
        });
        
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
        // Handle duplicate email error
        if (err.code === 11000) {
            return res.status(400).json({ 
                success: false,
                error: 'Email already exists' 
            });
        }
        res.status(400).json({ 
            success: false,
            error: err.message 
        });
    }
});

module.exports = router;