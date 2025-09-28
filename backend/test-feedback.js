// Test feedback endpoints
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('Testing feedback functionality...');

async function testFeedback() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Import models
    const Feedback = require('./models/Feedback');
    const User = require('./models/User');

    // Check if we have any users
    const userCount = await User.countDocuments();
    console.log(`📊 Total users in database: ${userCount}`);

    // Check if we have any feedback
    const feedbackCount = await Feedback.countDocuments();
    console.log(`📊 Total feedback in database: ${feedbackCount}`);

    // Test creating a sample feedback (only if we have users)
    if (userCount > 0) {
      const firstUser = await User.findOne();
      console.log(`👤 Testing with user: ${firstUser.email}`);

      // Create test feedback
      const testFeedback = new Feedback({
        user: firstUser._id,
        type: 'general',
        subject: 'Test Feedback',
        message: 'This is a test feedback to verify the system is working.',
        rating: 5,
        isAnonymous: false
      });

      const savedFeedback = await testFeedback.save();
      console.log('✅ Test feedback created successfully:', savedFeedback._id);

      // Retrieve the feedback
      const retrievedFeedback = await Feedback.findById(savedFeedback._id).populate('user', 'name email');
      console.log('✅ Feedback retrieved successfully:', {
        id: retrievedFeedback._id,
        subject: retrievedFeedback.subject,
        user: retrievedFeedback.user.email,
        status: retrievedFeedback.status
      });

      // Clean up test data
      await Feedback.findByIdAndDelete(savedFeedback._id);
      console.log('✅ Test feedback cleaned up');
    } else {
      console.log('⚠️  No users found in database. Cannot test feedback creation.');
    }

    console.log('✅ All feedback tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

testFeedback();