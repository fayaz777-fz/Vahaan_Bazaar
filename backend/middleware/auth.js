// backend/middleware/auth.js

const User = require('../models/User');

// Simple middleware for optional user identification (no authentication required)
const optionalAuth = async (req, res, next) => {
  // For now, we'll just continue without user authentication
  // This can be extended later if needed
  next();
};

// Middleware that does nothing (for compatibility with existing routes)
const authenticateToken = async (req, res, next) => {
  // Skip authentication - just continue
  next();
};

// Mock user for testing purposes (you can modify this as needed)
const getMockUser = () => {
  return {
    _id: '64f1b2c3d4e5f6789abcdef0',
    name: 'Guest User',
    email: 'guest@vahaanbazaar.com',
    phone: '+91 9876543210'
  };
};

// Middleware to set a mock user (for routes that need user info)
const setMockUser = (req, res, next) => {
  req.user = getMockUser();
  next();
};

// Middleware to check if user owns a resource (simplified without authentication)
const checkOwnership = (resourceModel, resourceIdField = 'id') => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params[resourceIdField];
      const resource = await resourceModel.findById(resourceId);
      
      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      
      // Without authentication, we'll allow access to all resources
      req.resource = resource;
      next();
    } catch (error) {
      console.error('Resource check error:', error);
      res.status(500).json({ message: 'Resource error' });
    }
  };
};

module.exports = {
  authenticateToken,
  optionalAuth,
  checkOwnership,
  setMockUser,
  getMockUser
};