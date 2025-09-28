#!/usr/bin/env node

// Simple test script to verify the scooter backend API
const https = require('http');

const testScooterAPI = async () => {
  console.log('🛵 Testing Scooter Selling Backend API...\n');

  // Test 1: Health Check
  console.log('1️⃣ Testing Health Check...');
  try {
    const response = await fetch('http://localhost:5000/api/health');
    const data = await response.json();
    console.log('✅ Health Check:', data.message);
  } catch (error) {
    console.log('❌ Health Check Failed:', error.message);
  }

  // Test 2: Get Scooters
  console.log('\n2️⃣ Testing Get Scooters...');
  try {
    const response = await fetch('http://localhost:5000/api/scooters');
    const data = await response.json();
    console.log('✅ Get Scooters:', data.message);
    console.log('📊 Found', data.data?.scooters?.length || 0, 'scooters');
  } catch (error) {
    console.log('❌ Get Scooters Failed:', error.message);
  }

  // Test 3: Create Scooter Listing
  console.log('\n3️⃣ Testing Create Scooter Listing...');
  try {
    const testScooter = {
      name: 'Honda Activa 6G Test',
      brand: 'Honda',
      daysUsed: 730,
      condition: 'Good',
      mileage: 45,
      presentPrice: 75000,
      pastPrice: 85000,
      license: 'TESTSC123',
      type: 'Petrol',
      year: 2022,
      engineCapacity: '109cc',
      topSpeed: 83,
      sellerName: 'Test User',
      sellerEmail: 'test@example.com',
      sellerPhone: '1234567890'
    };

    const response = await fetch('http://localhost:5000/api/scooters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testScooter)
    });

    const data = await response.json();
    console.log('✅ Create Scooter:', data.message);
    console.log('🆔 Scooter ID:', data.data?._id);
    
    // Store ID for further tests
    global.testScooterId = data.data?._id;
  } catch (error) {
    console.log('❌ Create Scooter Failed:', error.message);
  }

  // Test 4: Create Electric Scooter
  console.log('\n4️⃣ Testing Create Electric Scooter...');
  try {
    const testElectricScooter = {
      name: 'Ola S1 Pro Test',
      brand: 'Ola',
      daysUsed: 365,
      condition: 'Excellent',
      mileage: 120, // km per charge
      presentPrice: 110000,
      pastPrice: 125000,
      license: 'TESTESC456',
      type: 'Electric',
      year: 2023,
      batteryCapacity: '3.97kWh',
      topSpeed: 110,
      sellerName: 'Test User',
      sellerEmail: 'test@example.com',
      sellerPhone: '1234567890'
    };

    const response = await fetch('http://localhost:5000/api/scooters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testElectricScooter)
    });

    const data = await response.json();
    console.log('✅ Create Electric Scooter:', data.message);
    console.log('🆔 Electric Scooter ID:', data.data?._id);
  } catch (error) {
    console.log('❌ Create Electric Scooter Failed:', error.message);
  }

  // Test 5: Get Scooter Stats
  console.log('\n5️⃣ Testing Get Scooter Stats...');
  try {
    const response = await fetch('http://localhost:5000/api/scooters/stats/overview');
    const data = await response.json();
    console.log('✅ Scooter Stats:', data.message);
    console.log('📈 Total scooters:', data.data?.total);
    console.log('🟢 Available:', data.data?.available);
    console.log('⛽ Petrol:', data.data?.petrol);
    console.log('🔋 Electric:', data.data?.electric);
  } catch (error) {
    console.log('❌ Get Stats Failed:', error.message);
  }

  // Test 6: Get Scooters by Type
  console.log('\n6️⃣ Testing Get Electric Scooters...');
  try {
    const response = await fetch('http://localhost:5000/api/scooters/type/Electric');
    const data = await response.json();
    console.log('✅ Electric Scooters:', data.message);
    console.log('🔋 Found', data.data?.scooters?.length || 0, 'electric scooters');
  } catch (error) {
    console.log('❌ Get Electric Scooters Failed:', error.message);
  }

  // Test 7: Get Scooters by Price Range
  console.log('\n7️⃣ Testing Get Scooters by Price Range...');
  try {
    const response = await fetch('http://localhost:5000/api/scooters/price-range/50000/100000');
    const data = await response.json();
    console.log('✅ Price Range Scooters:', data.message);
    console.log('💰 Found', data.data?.scooters?.length || 0, 'scooters in ₹50k-₹100k range');
  } catch (error) {
    console.log('❌ Get Price Range Scooters Failed:', error.message);
  }

  // Test 8: Get Specific Scooter
  if (global.testScooterId) {
    console.log('\n8️⃣ Testing Get Specific Scooter...');
    try {
      const response = await fetch(`http://localhost:5000/api/scooters/${global.testScooterId}`);
      const data = await response.json();
      console.log('✅ Get Specific Scooter:', data.message);
      console.log('🛵 Scooter Name:', data.data?.name);
      console.log('👀 View Count:', data.data?.viewCount);
    } catch (error) {
      console.log('❌ Get Specific Scooter Failed:', error.message);
    }
  }

  console.log('\n🎉 Scooter API Testing Complete!');
  console.log('\n💡 Tips:');
  console.log('   - Check your MongoDB to see the created scooter listings');
  console.log('   - Try the frontend at http://localhost:5173 to test the UI');
  console.log('   - Use the refresh button to see backend data in the frontend');
};

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.log('❌ This script requires Node.js 18+ with fetch support');
  console.log('   Run: node --version to check your Node.js version');
  process.exit(1);
}

testScooterAPI().catch(console.error);