// backend/routes/feedbackRoutes.js

const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { setMockUser } = require('../middleware/auth');

// POST /api/feedback - Submit feedback (no auth required)
router.post('/', setMockUser, async (req, res) => {
  try {
    const feedback = new Feedback({
      ...req.body,
      user: req.user._id
    });

    const savedFeedback = await feedback.save();
    await savedFeedback.populate('user', 'name email');

    res.status(201).json({
      message: 'Feedback submitted successfully',
      data: { feedback: savedFeedback }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/feedback/meta/types - Get feedback types
router.get('/meta/types', (req, res) => {
  const feedbackTypes = [
    {
      id: 'general',
      name: 'General Feedback',
      description: 'General comments or suggestions'
    },
    {
      id: 'bug-report',
      name: 'Bug Report',
      description: 'Report technical issues or bugs'
    },
    {
      id: 'feature-request',
      name: 'Feature Request',
      description: 'Request new features or improvements'
    },
    {
      id: 'complaint',
      name: 'Complaint',
      description: 'Report problems or issues with service'
    },
    {
      id: 'suggestion',
      name: 'Suggestion',
      description: 'Suggest improvements or new ideas'
    }
  ];

  res.json({
    message: 'Feedback types retrieved successfully',
    data: { feedbackTypes }
  });
});

// GET /api/feedback/my-feedback - Get user's feedback (no auth required)
router.get('/my-feedback', setMockUser, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const filter = { user: req.user._id };
    if (status) filter.status = status;

    const feedback = await Feedback.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Feedback.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      message: 'Feedback retrieved successfully',
      data: {
        feedback,
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

// GET /api/feedback/:id - Get specific feedback (no auth required)
router.get('/:id', setMockUser, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate('user', 'name email');

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Check if user owns this feedback
    if (feedback.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this feedback' });
    }

    res.json({
      message: 'Feedback retrieved successfully',
      data: { feedback }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/feedback/:id - Update feedback (no auth required)
router.put('/:id', setMockUser, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Check if user owns this feedback
    if (feedback.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this feedback' });
    }

    // Only allow updates if status is open
    if (feedback.status !== 'open') {
      return res.status(400).json({ message: 'Cannot update feedback that is already being processed' });
    }

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    res.json({
      message: 'Feedback updated successfully',
      data: { feedback: updatedFeedback }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/feedback/:id - Delete feedback (no auth required)
router.delete('/:id', setMockUser, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Check if user owns this feedback
    if (feedback.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this feedback' });
    }

    // Only allow deletion if status is open
    if (feedback.status !== 'open') {
      return res.status(400).json({ message: 'Cannot delete feedback that is already being processed' });
    }

    await Feedback.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Feedback deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;