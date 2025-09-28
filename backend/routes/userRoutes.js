// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { setMockUser, getMockUser } = require('../middleware/auth');

// POST /api/auth/signup - Register a new user (simplified without JWT)
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();

    // Return user info without token
    res.status(201).json({
      message: 'User registered successfully',
      data: {
        user: {
          _id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          createdAt: savedUser.createdAt
        }
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST /api/auth/login - Login user (simplified without JWT)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Return user info without token
    res.json({
      message: 'Login successful',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt
        }
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/profile - Get user profile (returns mock user)
router.get('/profile', (req, res) => {
  try {
    const mockUser = getMockUser();
    res.json({
      message: 'Profile retrieved successfully',
      data: {
        user: {
          _id: mockUser._id,
          name: mockUser.name,
          email: mockUser.email,
          phone: mockUser.phone,
          createdAt: new Date().toISOString()
        }
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/auth/profile - Update user profile (simplified)
router.put('/profile', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // For simplicity, we'll just return the updated mock user
    const mockUser = getMockUser();
    const updatedUser = {
      ...mockUser,
      name: name || mockUser.name,
      email: email || mockUser.email
    };

    res.json({
      message: 'Profile updated successfully',
      data: {
        user: updatedUser
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/users - List all users (for dev/test only)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // hide passwords
    res.json({
      message: 'Users retrieved successfully',
      data: { users }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

module.exports = router;
