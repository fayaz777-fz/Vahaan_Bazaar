const mongoose = require('mongoose');

// Contact Schema for handling customer inquiries and messages
const contactSchema = new mongoose.Schema({
  // Personal Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  
  // Message Details
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    minlength: [5, 'Subject must be at least 5 characters long'],
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters long'],
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  
  // Contact Type/Category
  category: {
    type: String,
    enum: ['general', 'support', 'sales', 'feedback', 'complaint', 'partnership'],
    default: 'general'
  },
  
  // Priority Level
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Status Management
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved', 'closed'],
    default: 'new'
  },
  
  // Response Information
  responseMessage: {
    type: String,
    trim: true,
    maxlength: [2000, 'Response message cannot exceed 2000 characters']
  },
  
  respondedBy: {
    type: String,
    trim: true
  },
  
  respondedAt: {
    type: Date
  },
  
  // Additional Information
  source: {
    type: String,
    enum: ['website', 'mobile-app', 'phone', 'email', 'social-media'],
    default: 'website'
  },
  
  // IP Address for tracking (optional)
  ipAddress: {
    type: String,
    trim: true
  },
  
  // User Agent for device tracking (optional)
  userAgent: {
    type: String,
    trim: true
  },
  
  // Tags for better organization
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Internal Notes (admin only)
  internalNotes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Internal notes cannot exceed 1000 characters']
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual Properties
contactSchema.virtual('responseTime').get(function() {
  if (this.respondedAt && this.createdAt) {
    return Math.abs(this.respondedAt - this.createdAt);
  }
  return null;
});

contactSchema.virtual('isResolved').get(function() {
  return this.status === 'resolved' || this.status === 'closed';
});

contactSchema.virtual('daysSinceCreated').get(function() {
  const now = new Date();
  const diffTime = Math.abs(now - this.createdAt);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Indexes for better query performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ category: 1 });
contactSchema.index({ priority: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ name: 'text', subject: 'text', message: 'text' });

// Pre-save middleware
contactSchema.pre('save', function(next) {
  // Auto-assign priority based on category
  if (this.isNew) {
    if (this.category === 'complaint' || this.category === 'support') {
      this.priority = 'high';
    } else if (this.category === 'sales' || this.category === 'partnership') {
      this.priority = 'medium';
    }
  }
  
  // Set responded timestamp when status changes to resolved/closed
  if (this.isModified('status') && this.isResolved && !this.respondedAt) {
    this.respondedAt = new Date();
  }
  
  next();
});

// Static Methods
contactSchema.statics.getStatistics = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        new: { $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] } },
        inProgress: { $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] } },
        resolved: { $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] } },
        closed: { $sum: { $cond: [{ $eq: ['$status', 'closed'] }, 1, 0] } },
        urgent: { $sum: { $cond: [{ $eq: ['$priority', 'urgent'] }, 1, 0] } },
        high: { $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] } },
        medium: { $sum: { $cond: [{ $eq: ['$priority', 'medium'] }, 1, 0] } },
        low: { $sum: { $cond: [{ $eq: ['$priority', 'low'] }, 1, 0] } }
      }
    }
  ]);
  
  return stats[0] || {
    total: 0, new: 0, inProgress: 0, resolved: 0, closed: 0,
    urgent: 0, high: 0, medium: 0, low: 0
  };
};

contactSchema.statics.getCategoryStats = async function() {
  return await this.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        avgResponseTime: { $avg: '$responseTime' }
      }
    },
    { $sort: { count: -1 } }
  ]);
};

// Instance Methods
contactSchema.methods.markAsResponded = function(responseMessage, respondedBy) {
  this.responseMessage = responseMessage;
  this.respondedBy = respondedBy;
  this.respondedAt = new Date();
  this.status = 'resolved';
  return this.save();
};

contactSchema.methods.addTag = function(tag) {
  if (!this.tags.includes(tag.toLowerCase())) {
    this.tags.push(tag.toLowerCase());
  }
  return this.save();
};

contactSchema.methods.removeTag = function(tag) {
  this.tags = this.tags.filter(t => t !== tag.toLowerCase());
  return this.save();
};

module.exports = mongoose.model('Contact', contactSchema);