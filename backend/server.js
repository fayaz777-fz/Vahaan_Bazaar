// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const bikeRoutes = require('./routes/bikeRoutes');
const scooterRoutes = require('./routes/scooterRoutes');
const contactRoutes = require('./routes/contactRoutes');
const apiDocs = require('./routes/apiDocs');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Security and performance middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.originalUrl}`);
  next();
});

// Connect to MongoDB with better error handling
mongoose.connect(MONGODB_URI, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log(`📊 Database: ${mongoose.connection.name}`);
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// MongoDB connection event handlers
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected');
});

// API Routes
app.use('/api/auth', userRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/bikes', bikeRoutes);
app.use('/api/scooters', scooterRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/docs', apiDocs);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Server is healthy',
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to VAHAAN BAZAAR API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      bikes: '/api/bikes',
      scooters: '/api/scooters',
      contacts: '/api/contacts',
      vehicles: '/api/vehicles',
      reviews: '/api/reviews',
      services: '/api/services',
      feedback: '/api/feedback',
      health: '/api/health'
    }
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('❌ Global error handler:', error);
  
  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => err.message);
    return res.status(400).json({
      message: 'Validation Error',
      errors: errors
    });
  }
  
  // Mongoose duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return res.status(400).json({
      message: `${field} already exists`,
      field: field
    });
  }
  
  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }
  
  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Token expired'
    });
  }
  
  // Default error
  res.status(error.status || 500).json({
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Start server with graceful shutdown handling
const server = app.listen(PORT, () => {
  console.log('\n🚀 VAHAAN BAZAAR API Server Started');
  console.log(`🌐 Server running at http://localhost:${PORT}`);
  console.log(`🔄 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('📊 Available endpoints:');
  console.log('   - GET  /api/health          (Health check)');
  console.log('   - POST /api/auth/signup     (User registration)');
  console.log('   - POST /api/auth/login      (User login)');
  console.log('   - GET  /api/bikes           (Get bikes)');
  console.log('   - POST /api/bikes           (Create bike listing)');
  console.log('   - GET  /api/scooters        (Get scooters)');
  console.log('   - POST /api/scooters        (Create scooter listing)');
  console.log('   - GET  /api/contacts        (Get contacts)');
  console.log('   - POST /api/contacts        (Create contact message)');
  console.log('   - GET  /api/vehicles        (Get vehicles)');
  console.log('   - POST /api/vehicles        (Create vehicle)');
  console.log('   - GET  /api/reviews         (Get reviews)');
  console.log('   - POST /api/services/request (Service request)');
  console.log('   - GET  /api/feedback        (Get feedback)');
  console.log('\n✅ Server ready to accept connections\n');
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('\n🚨 SIGTERM received. Starting graceful shutdown...');
  server.close(() => {
    console.log('💫 HTTP server closed.');
    mongoose.connection.close(false, () => {
      console.log('💫 MongoDB connection closed.');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  console.log('\n🚨 SIGINT received. Starting graceful shutdown...');
  server.close(() => {
    console.log('💫 HTTP server closed.');
    mongoose.connection.close(false, () => {
      console.log('💫 MongoDB connection closed.');
      process.exit(0);
    });
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});
