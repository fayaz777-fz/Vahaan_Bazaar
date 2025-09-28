const express = require('express');
const Bike = require('../models/Bike');

const router = express.Router();

// Get all bikes with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = '-createdAt',
      type,
      condition,
      minPrice,
      maxPrice,
      brand,
      search,
      availability = 'available'
    } = req.query;

    // Build filter object
    const filter = {
      isActive: true,
      availability: availability
    };

    // Add type filter
    if (type && ['Petrol', 'Electric'].includes(type)) {
      filter.type = type;
    }

    // Add condition filter
    if (condition && ['Excellent', 'Good', 'Fair', 'Poor'].includes(condition)) {
      filter.condition = condition;
    }

    // Add brand filter
    if (brand) {
      filter.brand = { $regex: brand, $options: 'i' };
    }

    // Add price range filter
    if (minPrice || maxPrice) {
      filter.presentPrice = {};
      if (minPrice) filter.presentPrice.$gte = parseInt(minPrice);
      if (maxPrice) filter.presentPrice.$lte = parseInt(maxPrice);
    }

    // Add search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query with pagination
    const bikes = await Bike.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Get total count for pagination
    const totalCount = await Bike.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limitNum);

    res.json({
      message: 'Bikes retrieved successfully',
      data: {
        bikes,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalCount,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching bikes:', error);
    res.status(500).json({
      message: 'Error fetching bikes',
      error: error.message
    });
  }
});

// Get bike by ID
router.get('/:id', async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);

    if (!bike) {
      return res.status(404).json({
        message: 'Bike not found'
      });
    }

    // Increment view count
    await bike.incrementViewCount();

    res.json({
      message: 'Bike retrieved successfully',
      data: bike
    });
  } catch (error) {
    console.error('Error fetching bike:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid bike ID format'
      });
    }

    res.status(500).json({
      message: 'Error fetching bike',
      error: error.message
    });
  }
});

// Create new bike listing
router.post('/', async (req, res) => {
  try {
    const bikeData = {
      ...req.body,
      // Ensure seller information is properly set
      seller: {
        name: req.body.seller?.name || req.body.sellerName || 'Anonymous',
        email: req.body.seller?.email || req.body.sellerEmail || 'noreply@example.com',
        phone: req.body.seller?.phone || req.body.sellerPhone
      },
      // Set contact info from seller if not provided separately
      contactInfo: {
        phone: req.body.contactInfo?.phone || req.body.seller?.phone || req.body.sellerPhone,
        email: req.body.contactInfo?.email || req.body.seller?.email || req.body.sellerEmail,
        whatsapp: req.body.contactInfo?.whatsapp || req.body.whatsapp
      }
    };

    const bike = new Bike(bikeData);
    const savedBike = await bike.save();

    res.status(201).json({
      message: 'Bike listed successfully',
      data: savedBike
    });
  } catch (error) {
    console.error('Error creating bike listing:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation error',
        errors: errors
      });
    }

    res.status(500).json({
      message: 'Error creating bike listing',
      error: error.message
    });
  }
});

// Update bike listing
router.put('/:id', async (req, res) => {
  try {
    const updatedBike = await Bike.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedBike) {
      return res.status(404).json({
        message: 'Bike not found'
      });
    }

    res.json({
      message: 'Bike updated successfully',
      data: updatedBike
    });
  } catch (error) {
    console.error('Error updating bike:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid bike ID format'
      });
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation error',
        errors: errors
      });
    }

    res.status(500).json({
      message: 'Error updating bike',
      error: error.message
    });
  }
});

// Delete bike listing (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const bike = await Bike.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!bike) {
      return res.status(404).json({
        message: 'Bike not found'
      });
    }

    res.json({
      message: 'Bike listing deleted successfully',
      data: bike
    });
  } catch (error) {
    console.error('Error deleting bike:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid bike ID format'
      });
    }

    res.status(500).json({
      message: 'Error deleting bike',
      error: error.message
    });
  }
});

// Mark bike as sold
router.patch('/:id/sold', async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);

    if (!bike) {
      return res.status(404).json({
        message: 'Bike not found'
      });
    }

    await bike.markAsSold();

    res.json({
      message: 'Bike marked as sold successfully',
      data: bike
    });
  } catch (error) {
    console.error('Error marking bike as sold:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid bike ID format'
      });
    }

    res.status(500).json({
      message: 'Error marking bike as sold',
      error: error.message
    });
  }
});

// Get bikes by type
router.get('/type/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const {
      page = 1,
      limit = 10,
      sort = '-createdAt'
    } = req.query;

    if (!['Petrol', 'Electric'].includes(type)) {
      return res.status(400).json({
        message: 'Invalid bike type. Must be Petrol or Electric'
      });
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const bikes = await Bike.findByType(type)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();

    const totalCount = await Bike.countDocuments({
      type: type,
      availability: 'available',
      isActive: true
    });

    const totalPages = Math.ceil(totalCount / limitNum);

    res.json({
      message: `${type} bikes retrieved successfully`,
      data: {
        bikes,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalCount,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching bikes by type:', error);
    res.status(500).json({
      message: 'Error fetching bikes by type',
      error: error.message
    });
  }
});

// Get bikes within price range
router.get('/price-range/:minPrice/:maxPrice', async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.params;
    const {
      page = 1,
      limit = 10,
      sort = '-createdAt'
    } = req.query;

    const min = parseInt(minPrice);
    const max = parseInt(maxPrice);

    if (isNaN(min) || isNaN(max) || min < 0 || max < 0 || min > max) {
      return res.status(400).json({
        message: 'Invalid price range'
      });
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const bikes = await Bike.findByPriceRange(min, max)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();

    const totalCount = await Bike.countDocuments({
      presentPrice: { $gte: min, $lte: max },
      availability: 'available',
      isActive: true
    });

    const totalPages = Math.ceil(totalCount / limitNum);

    res.json({
      message: `Bikes in price range ₹${min.toLocaleString()} - ₹${max.toLocaleString()} retrieved successfully`,
      data: {
        bikes,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalCount,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching bikes by price range:', error);
    res.status(500).json({
      message: 'Error fetching bikes by price range',
      error: error.message
    });
  }
});

// Get bike statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalBikes = await Bike.countDocuments({ isActive: true });
    const availableBikes = await Bike.countDocuments({ availability: 'available', isActive: true });
    const soldBikes = await Bike.countDocuments({ availability: 'sold', isActive: true });
    
    const petrolBikes = await Bike.countDocuments({ type: 'Petrol', isActive: true });
    const electricBikes = await Bike.countDocuments({ type: 'Electric', isActive: true });

    const priceStats = await Bike.aggregate([
      { $match: { isActive: true, availability: 'available' } },
      {
        $group: {
          _id: null,
          avgPrice: { $avg: '$presentPrice' },
          minPrice: { $min: '$presentPrice' },
          maxPrice: { $max: '$presentPrice' }
        }
      }
    ]);

    res.json({
      message: 'Bike statistics retrieved successfully',
      data: {
        total: totalBikes,
        available: availableBikes,
        sold: soldBikes,
        petrol: petrolBikes,
        electric: electricBikes,
        priceStats: priceStats[0] || {
          avgPrice: 0,
          minPrice: 0,
          maxPrice: 0
        }
      }
    });
  } catch (error) {
    console.error('Error fetching bike statistics:', error);
    res.status(500).json({
      message: 'Error fetching bike statistics',
      error: error.message
    });
  }
});

module.exports = router;