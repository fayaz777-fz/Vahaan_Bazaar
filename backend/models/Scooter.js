const mongoose = require('mongoose');

const scooterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Scooter name is required'],
    trim: true,
    maxLength: [100, 'Scooter name cannot exceed 100 characters']
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true,
    maxLength: [50, 'Brand cannot exceed 50 characters']
  },
  model: {
    type: String,
    trim: true,
    maxLength: [50, 'Model cannot exceed 50 characters']
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [2000, 'Year must be 2000 or later'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
  },
  daysUsed: {
    type: Number,
    required: [true, 'Days used is required'],
    min: [0, 'Days used cannot be negative']
  },
  condition: {
    type: String,
    required: [true, 'Condition is required'],
    enum: {
      values: ['Excellent', 'Good', 'Fair', 'Poor'],
      message: 'Condition must be one of: Excellent, Good, Fair, Poor'
    }
  },
  mileage: {
    type: Number,
    required: [true, 'Mileage is required'],
    min: [0, 'Mileage cannot be negative']
  },
  presentPrice: {
    type: Number,
    required: [true, 'Present price is required'],
    min: [0, 'Present price cannot be negative']
  },
  pastPrice: {
    type: Number,
    required: [true, 'Original price is required'],
    min: [0, 'Original price cannot be negative']
  },
  license: {
    type: String,
    required: [true, 'License number is required'],
    trim: true,
    uppercase: true,
    match: [/^[A-Z0-9]+$/, 'Please enter a valid license number']
  },
  type: {
    type: String,
    required: [true, 'Scooter type is required'],
    enum: {
      values: ['Petrol', 'Electric'],
      message: 'Type must be either Petrol or Electric'
    }
  },
  engineCapacity: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return this.type !== 'Petrol' || (v && v.length > 0);
      },
      message: 'Engine capacity is required for petrol scooters'
    }
  },
  batteryCapacity: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return this.type !== 'Electric' || (v && v.length > 0);
      },
      message: 'Battery capacity is required for electric scooters'
    }
  },
  topSpeed: {
    type: Number,
    required: [true, 'Top speed is required'],
    min: [0, 'Top speed cannot be negative']
  },
  images: [{
    type: String,
    validate: {
      validator: function(v) {
        return /^data:image\/(jpeg|jpg|png|gif);base64,/.test(v) || /^https?:\/\//.test(v);
      },
      message: 'Please provide a valid image URL or base64 string'
    }
  }],
  description: {
    type: String,
    trim: true,
    maxLength: [1000, 'Description cannot exceed 1000 characters']
  },
  features: [{
    type: String,
    trim: true
  }],
  location: {
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      trim: true,
      default: 'India'
    }
  },
  seller: {
    name: {
      type: String,
      required: [true, 'Seller name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Seller email is required'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    }
  },
  contactInfo: {
    phone: {
      type: String,
      trim: true,
      match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    whatsapp: {
      type: String,
      trim: true,
      match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit WhatsApp number']
    }
  },
  availability: {
    type: String,
    enum: ['available', 'sold', 'reserved'],
    default: 'available'
  },
  isPromoted: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  viewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for calculating discount percentage
scooterSchema.virtual('discount').get(function() {
  if (this.pastPrice && this.presentPrice) {
    return Math.round(((this.pastPrice - this.presentPrice) / this.pastPrice) * 100);
  }
  return 0;
});

// Virtual for calculating price difference
scooterSchema.virtual('priceDifference').get(function() {
  if (this.pastPrice && this.presentPrice) {
    return this.pastPrice - this.presentPrice;
  }
  return 0;
});

// Index for better search performance
scooterSchema.index({ brand: 1, name: 1 });
scooterSchema.index({ presentPrice: 1 });
scooterSchema.index({ type: 1 });
scooterSchema.index({ condition: 1 });
scooterSchema.index({ availability: 1 });
scooterSchema.index({ isActive: 1 });
scooterSchema.index({ createdAt: -1 });

// Pre-save middleware to ensure data consistency
scooterSchema.pre('save', function(next) {
  // Ensure seller contact info is properly set
  if (!this.contactInfo.email && this.seller.email) {
    this.contactInfo.email = this.seller.email;
  }
  
  // Validate engine or battery capacity based on type
  if (this.type === 'Petrol' && !this.engineCapacity) {
    return next(new Error('Engine capacity is required for petrol scooters'));
  }
  
  if (this.type === 'Electric' && !this.batteryCapacity) {
    return next(new Error('Battery capacity is required for electric scooters'));
  }
  
  next();
});

// Static method to find available scooters
scooterSchema.statics.findAvailable = function() {
  return this.find({ availability: 'available', isActive: true });
};

// Static method to find scooters by type
scooterSchema.statics.findByType = function(type) {
  return this.find({ type: type, availability: 'available', isActive: true });
};

// Static method to find scooters within price range
scooterSchema.statics.findByPriceRange = function(minPrice, maxPrice) {
  return this.find({
    presentPrice: { $gte: minPrice, $lte: maxPrice },
    availability: 'available',
    isActive: true
  });
};

// Instance method to increment view count
scooterSchema.methods.incrementViewCount = function() {
  this.viewCount += 1;
  return this.save();
};

// Instance method to mark as sold
scooterSchema.methods.markAsSold = function() {
  this.availability = 'sold';
  return this.save();
};

const Scooter = mongoose.model('Scooter', scooterSchema);

module.exports = Scooter;