const express = require('express');
const Scooter = require('../models/Scooter');

const router = express.Router();

// Get all scooters with filtering and pagination
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
    const scooters = await Scooter.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Get total count for pagination
    const totalCount = await Scooter.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limitNum);

    res.json({
      message: 'Scooters retrieved successfully',
      data: {
        scooters,
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
    console.error('Error fetching scooters:', error);
    res.status(500).json({
      message: 'Error fetching scooters',
      error: error.message
    });
  }
});

// Get scooter by ID
router.get('/:id', async (req, res) => {
  try {
    const scooter = await Scooter.findById(req.params.id);

    if (!scooter) {
      return res.status(404).json({
        message: 'Scooter not found'
      });
    }

    // Increment view count
    await scooter.incrementViewCount();

    res.json({
      message: 'Scooter retrieved successfully',
      data: scooter
    });
  } catch (error) {
    console.error('Error fetching scooter:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid scooter ID format'
      });
    }

    res.status(500).json({
      message: 'Error fetching scooter',
      error: error.message
    });
  }
});

// Create new scooter listing
router.post('/', async (req, res) => {
  try {
    const scooterData = {
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

    const scooter = new Scooter(scooterData);
    const savedScooter = await scooter.save();

    res.status(201).json({
      message: 'Scooter listed successfully',
      data: savedScooter
    });
  } catch (error) {
    console.error('Error creating scooter listing:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation error',
        errors: errors
      });
    }

    res.status(500).json({
      message: 'Error creating scooter listing',
      error: error.message
    });
  }
});

// Update scooter listing
router.put('/:id', async (req, res) => {
  try {
    const updatedScooter = await Scooter.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedScooter) {
      return res.status(404).json({
        message: 'Scooter not found'
      });
    }

    res.json({
      message: 'Scooter updated successfully',
      data: updatedScooter
    });
  } catch (error) {
    console.error('Error updating scooter:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid scooter ID format'
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
      message: 'Error updating scooter',
      error: error.message
    });
  }
});

// Delete scooter listing (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const scooter = await Scooter.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!scooter) {
      return res.status(404).json({
        message: 'Scooter not found'
      });
    }

    res.json({
      message: 'Scooter listing deleted successfully',
      data: scooter
    });
  } catch (error) {
    console.error('Error deleting scooter:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid scooter ID format'
      });
    }

    res.status(500).json({
      message: 'Error deleting scooter',
      error: error.message
    });
  }
});

// Mark scooter as sold
router.patch('/:id/sold', async (req, res) => {
  try {
    const scooter = await Scooter.findById(req.params.id);

    if (!scooter) {
      return res.status(404).json({
        message: 'Scooter not found'
      });
    }

    await scooter.markAsSold();

    res.json({
      message: 'Scooter marked as sold successfully',
      data: scooter
    });
  } catch (error) {
    console.error('Error marking scooter as sold:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid scooter ID format'
      });
    }

    res.status(500).json({
      message: 'Error marking scooter as sold',
      error: error.message
    });
  }
});

// Get scooters by type
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
        message: 'Invalid scooter type. Must be Petrol or Electric'
      });
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const scooters = await Scooter.findByType(type)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();

    const totalCount = await Scooter.countDocuments({
      type: type,
      availability: 'available',
      isActive: true
    });

    const totalPages = Math.ceil(totalCount / limitNum);

    res.json({
      message: `${type} scooters retrieved successfully`,
      data: {
        scooters,
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
    console.error('Error fetching scooters by type:', error);
    res.status(500).json({
      message: 'Error fetching scooters by type',
      error: error.message
    });
  }
});

// Get scooters within price range
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

    const scooters = await Scooter.findByPriceRange(min, max)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();

    const totalCount = await Scooter.countDocuments({
      presentPrice: { $gte: min, $lte: max },
      availability: 'available',
      isActive: true
    });

    const totalPages = Math.ceil(totalCount / limitNum);

    res.json({
      message: `Scooters in price range ₹${min.toLocaleString()} - ₹${max.toLocaleString()} retrieved successfully`,
      data: {
        scooters,
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
    console.error('Error fetching scooters by price range:', error);
    res.status(500).json({
      message: 'Error fetching scooters by price range',
      error: error.message
    });
  }
});

// Get scooter statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalScooters = await Scooter.countDocuments({ isActive: true });
    const availableScooters = await Scooter.countDocuments({ availability: 'available', isActive: true });
    const soldScooters = await Scooter.countDocuments({ availability: 'sold', isActive: true });
    
    const petrolScooters = await Scooter.countDocuments({ type: 'Petrol', isActive: true });
    const electricScooters = await Scooter.countDocuments({ type: 'Electric', isActive: true });

    const priceStats = await Scooter.aggregate([
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
      message: 'Scooter statistics retrieved successfully',
      data: {
        total: totalScooters,
        available: availableScooters,
        sold: soldScooters,
        petrol: petrolScooters,
        electric: electricScooters,
        priceStats: priceStats[0] || {
          avgPrice: 0,
          minPrice: 0,
          maxPrice: 0
        }
      }
    });
  } catch (error) {
    console.error('Error fetching scooter statistics:', error);
    res.status(500).json({
      message: 'Error fetching scooter statistics',
      error: error.message
    });
  }
});

module.exports = router;