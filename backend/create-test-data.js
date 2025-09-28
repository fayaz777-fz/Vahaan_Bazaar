// Create test user and feedback data
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function createTestData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Import models
    const User = require('./models/User');
    const Feedback = require('./models/Feedback');

    // Check if test user exists
    let testUser = await User.findOne({ email: 'test@vahaanbazaar.com' });
    
    if (!testUser) {
      console.log('Creating test user...');
      testUser = new User({
        name: 'Test User',
        email: 'test@vahaanbazaar.com',
        password: 'testpass123!'
      });
      await testUser.save();
      console.log('✅ Test user created');
    } else {
      console.log('✅ Test user already exists');
    }

    // Check feedback count
    const feedbackCount = await Feedback.countDocuments({ user: testUser._id });
    console.log(`📊 Test user has ${feedbackCount} feedback entries`);

    if (feedbackCount === 0) {
      console.log('Creating sample feedback...');
      
      const sampleFeedback = [
        {
          user: testUser._id,
          type: 'general',
          subject: 'Great Platform!',
          message: 'I love using Vahaan Bazaar. The interface is clean and easy to use.',
          rating: 5,
          status: 'open',
          priority: 'medium'
        },
        {
          user: testUser._id,
          type: 'suggestion',
          subject: 'Add more search filters',
          message: 'It would be great to have more advanced search filters for vehicles.',
          rating: 4,
          status: 'in-review',
          priority: 'low'
        },
        {
          user: testUser._id,
          type: 'bug-report',
          subject: 'Loading issue on mobile',
          message: 'The page loads slowly on mobile devices.',
          rating: 3,
          status: 'resolved',
          priority: 'high'
        }
      ];

      for (const feedbackData of sampleFeedback) {
        const feedback = new Feedback(feedbackData);
        await feedback.save();
      }
      
      console.log('✅ Sample feedback created');
    }

    console.log('\n🎉 Test data setup complete!');
    console.log('📧 Test user email: test@vahaanbazaar.com');
    console.log('🔑 Test user password: testpass123!');
    
  } catch (error) {
    console.error('❌ Error creating test data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

createTestData();