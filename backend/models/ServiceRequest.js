// backend/models/ServiceRequest.js

const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['insurance', 'loan', 'service', 'roadside-assistance', 'warranty']
  },
  vehicleDetails: {
    type: {
      type: String,
      enum: ['bike', 'scooter', 'car']
    },
    brand: String,
    model: String,
    year: Number,
    registrationNumber: String
  },
  contactInfo: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String
    }
  },
  serviceDetails: {
    description: String,
    preferredDate: Date,
    preferredTime: String,
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  assignedTo: {
    type: String,
    default: null
  },
  estimatedCost: {
    type: Number,
    default: 0
  },
  actualCost: {
    type: Number,
    default: 0
  },
  notes: [{
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    addedBy: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

serviceRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

module.exports = ServiceRequest;