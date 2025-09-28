// backend/routes/serviceRoutes.js

const express = require('express');
const router = express.Router();
const ServiceRequest = require('../models/ServiceRequest');
const { setMockUser } = require('../middleware/auth');

// POST /api/services/request - Create a new service request (no auth required)
router.post('/request', setMockUser, async (req, res) => {
  try {
    const serviceRequest = new ServiceRequest({
      ...req.body,
      user: req.user._id
    });

    const savedRequest = await serviceRequest.save();
    await savedRequest.populate('user', 'name email');

    res.status(201).json({
      message: 'Service request created successfully',
      data: { serviceRequest: savedRequest }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/services/my-requests - Get user's service requests (no auth required)
router.get('/my-requests', setMockUser, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const filter = { user: req.user._id };
    if (status) filter.status = status;

    const requests = await ServiceRequest.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ServiceRequest.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      message: 'Service requests retrieved successfully',
      data: {
        requests,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCount: total,
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/services/request/:id - Get specific service request (no auth required)
router.get('/request/:id', setMockUser, async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id)
      .populate('user', 'name email');

    if (!request) {
      return res.status(404).json({ message: 'Service request not found' });
    }

    // Check if user owns this request
    if (request.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this request' });
    }

    res.json({
      message: 'Service request retrieved successfully',
      data: { request }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/services/request/:id - Update service request (no auth required)
router.put('/request/:id', setMockUser, async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Service request not found' });
    }

    // Check if user owns this request
    if (request.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this request' });
    }

    // Only allow updates if status is pending
    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Cannot update request that is already in progress' });
    }

    const updatedRequest = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    res.json({
      message: 'Service request updated successfully',
      data: { request: updatedRequest }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/services/request/:id - Cancel service request (no auth required)
router.delete('/request/:id', setMockUser, async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Service request not found' });
    }

    // Check if user owns this request
    if (request.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this request' });
    }

    // Only allow cancellation if status is pending
    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Cannot cancel request that is already in progress' });
    }

    request.status = 'cancelled';
    await request.save();

    res.json({
      message: 'Service request cancelled successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/services/types - Get available service types
router.get('/types', (req, res) => {
  const serviceTypes = [
    {
      id: 'insurance',
      name: 'Vehicle Insurance',
      description: 'Comprehensive vehicle insurance services',
      estimatedTime: '1-3 business days'
    },
    {
      id: 'loan',
      name: 'Vehicle Loan',
      description: 'Easy vehicle loan processing',
      estimatedTime: '3-7 business days'
    },
    {
      id: 'service',
      name: 'Vehicle Service',
      description: 'Regular maintenance and repair services',
      estimatedTime: '1-2 days'
    },
    {
      id: 'roadside-assistance',
      name: 'Roadside Assistance',
      description: '24/7 emergency roadside assistance',
      estimatedTime: '30-60 minutes'
    },
    {
      id: 'warranty',
      name: 'Extended Warranty',
      description: 'Extended warranty services',
      estimatedTime: '1-2 business days'
    }
  ];

  res.json({
    message: 'Service types retrieved successfully',
    data: { serviceTypes }
  });
});

// POST /api/services/emi-calculator - EMI Calculator
router.post('/emi-calculator', (req, res) => {
  try {
    const { principal, rate, tenure } = req.body;

    if (!principal || !rate || !tenure) {
      return res.status(400).json({ message: 'Principal, rate, and tenure are required' });
    }

    const monthlyRate = rate / (12 * 100);
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - principal;

    res.json({
      message: 'EMI calculated successfully',
      data: {
        emi: Math.round(emi),
        totalAmount: Math.round(totalAmount),
        totalInterest: Math.round(totalInterest),
        principal: principal,
        rate: rate,
        tenure: tenure
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;