const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// Helper function for building query filters
const buildQuery = (queryParams) => {
  const query = {};
  
  // Status filter
  if (queryParams.status) {
    query.status = queryParams.status;
  }
  
  // Category filter
  if (queryParams.category) {
    query.category = queryParams.category;
  }
  
  // Priority filter
  if (queryParams.priority) {
    query.priority = queryParams.priority;
  }
  
  // Date range filter
  if (queryParams.startDate || queryParams.endDate) {
    query.createdAt = {};
    if (queryParams.startDate) {
      query.createdAt.$gte = new Date(queryParams.startDate);
    }
    if (queryParams.endDate) {
      query.createdAt.$lte = new Date(queryParams.endDate);
    }
  }
  
  // Search filter (name, email, subject, message)
  if (queryParams.search) {
    query.$or = [
      { name: { $regex: queryParams.search, $options: 'i' } },
      { email: { $regex: queryParams.search, $options: 'i' } },
      { subject: { $regex: queryParams.search, $options: 'i' } },
      { message: { $regex: queryParams.search, $options: 'i' } }
    ];
  }
  
  // Email filter
  if (queryParams.email) {
    query.email = { $regex: queryParams.email, $options: 'i' };
  }
  
  return query;
};

// GET /api/contacts - Get all contacts with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build query from request parameters
    const query = buildQuery(req.query);
    
    // Build sort criteria
    let sort = {};
    if (req.query.sortBy) {
      const sortField = req.query.sortBy;
      const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
      sort[sortField] = sortOrder;
    } else {
      sort = { createdAt: -1 }; // Default: newest first
    }
    
    // Execute query with pagination
    const contacts = await Contact.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-internalNotes'); // Hide internal notes from regular API calls
    
    // Get total count for pagination
    const totalContacts = await Contact.countDocuments(query);
    const totalPages = Math.ceil(totalContacts / limit);
    
    res.json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: page,
        totalPages,
        totalContacts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
});

// GET /api/contacts/stats - Get contact statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Contact.getStatistics();
    const categoryStats = await Contact.getCategoryStats();
    
    // Get recent contacts (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentContacts = await Contact.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });
    
    // Get pending contacts (new + in-progress)
    const pendingContacts = await Contact.countDocuments({
      status: { $in: ['new', 'in-progress'] }
    });
    
    res.json({
      success: true,
      data: {
        ...stats,
        recentContacts,
        pendingContacts,
        categoryBreakdown: categoryStats
      }
    });
  } catch (error) {
    console.error('Error fetching contact statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact statistics',
      error: error.message
    });
  }
});

// GET /api/contacts/:id - Get single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error fetching contact',
      error: error.message
    });
  }
});

// POST /api/contacts - Create new contact
router.post('/', async (req, res) => {
  try {
    // Extract IP address and user agent for tracking
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    
    const contactData = {
      ...req.body,
      ipAddress,
      userAgent
    };
    
    const contact = new Contact(contactData);
    await contact.save();
    
    res.status(201).json({
      success: true,
      message: 'Contact message submitted successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error creating contact',
      error: error.message
    });
  }
});

// PUT /api/contacts/:id - Update contact (admin only)
router.put('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID format'
      });
    }
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating contact',
      error: error.message
    });
  }
});

// PATCH /api/contacts/:id/status - Update contact status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, responseMessage, respondedBy } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }
    
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    contact.status = status;
    if (responseMessage) {
      contact.responseMessage = responseMessage;
    }
    if (respondedBy) {
      contact.respondedBy = respondedBy;
    }
    
    await contact.save();
    
    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error updating contact status:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating contact status',
      error: error.message
    });
  }
});

// PATCH /api/contacts/:id/tags - Add/Remove tags
router.patch('/:id/tags', async (req, res) => {
  try {
    const { action, tag } = req.body; // action: 'add' or 'remove'
    
    if (!action || !tag) {
      return res.status(400).json({
        success: false,
        message: 'Action and tag are required'
      });
    }
    
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    if (action === 'add') {
      await contact.addTag(tag);
    } else if (action === 'remove') {
      await contact.removeTag(tag);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid action. Use "add" or "remove"'
      });
    }
    
    res.json({
      success: true,
      message: `Tag ${action}ed successfully`,
      data: contact
    });
  } catch (error) {
    console.error('Error updating contact tags:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating contact tags',
      error: error.message
    });
  }
});

// DELETE /api/contacts/:id - Delete contact (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Contact deleted successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error deleting contact',
      error: error.message
    });
  }
});

// GET /api/contacts/category/:category - Get contacts by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const contacts = await Contact.find({ category })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-internalNotes');
    
    const totalContacts = await Contact.countDocuments({ category });
    const totalPages = Math.ceil(totalContacts / limit);
    
    res.json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: page,
        totalPages,
        totalContacts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching contacts by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts by category',
      error: error.message
    });
  }
});

// GET /api/contacts/priority/:priority - Get contacts by priority
router.get('/priority/:priority', async (req, res) => {
  try {
    const { priority } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const contacts = await Contact.find({ priority })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-internalNotes');
    
    const totalContacts = await Contact.countDocuments({ priority });
    const totalPages = Math.ceil(totalContacts / limit);
    
    res.json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: page,
        totalPages,
        totalContacts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching contacts by priority:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts by priority',
      error: error.message
    });
  }
});

module.exports = router;