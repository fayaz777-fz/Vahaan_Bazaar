#!/usr/bin/env node

// Simple test script to verify the bike backend API
const https = require('http');

const testAPI = async () => {
  console.log('🧪 Testing Bike Selling Backend API...\n');

  // Test 1: Health Check
  console.log('1️⃣ Testing Health Check...');
  try {
    const response = await fetch('http://localhost:5000/api/health');
    const data = await response.json();
    console.log('✅ Health Check:', data.message);
  } catch (error) {
    console.log('❌ Health Check Failed:', error.message);
  }

  // Test 2: Get Bikes
  console.log('\n2️⃣ Testing Get Bikes...');
  try {
    const response = await fetch('http://localhost:5000/api/bikes');
    const data = await response.json();
    console.log('✅ Get Bikes:', data.message);
    console.log('📊 Found', data.data?.bikes?.length || 0, 'bikes');
  } catch (error) {
    console.log('❌ Get Bikes Failed:', error.message);
  }

  // Test 3: Create Bike Listing
  console.log('\n3️⃣ Testing Create Bike Listing...');
  try {
    const testBike = {
      name: 'Test Bike',
      brand: 'Test Brand',
      daysUsed: 365,
      condition: 'Good',
      mileage: 35,
      presentPrice: 150000,
      pastPrice: 200000,
      license: 'TEST123',
      type: 'Petrol',
      year: 2023,
      engineCapacity: '150cc',
      topSpeed: 120,
      sellerName: 'Test User',
      sellerEmail: 'test@example.com',
      sellerPhone: '1234567890'
    };

    const response = await fetch('http://localhost:5000/api/bikes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testBike)
    });

    const data = await response.json();
    console.log('✅ Create Bike:', data.message);
    console.log('🆔 Bike ID:', data.data?._id);
  } catch (error) {
    console.log('❌ Create Bike Failed:', error.message);
  }

  // Test 4: Get Bike Stats
  console.log('\n4️⃣ Testing Get Bike Stats...');
  try {
    const response = await fetch('http://localhost:5000/api/bikes/stats/overview');
    const data = await response.json();
    console.log('✅ Bike Stats:', data.message);
    console.log('📈 Total bikes:', data.data?.total);
    console.log('🟢 Available:', data.data?.available);
    console.log('⛽ Petrol:', data.data?.petrol);
    console.log('🔋 Electric:', data.data?.electric);
  } catch (error) {
    console.log('❌ Get Stats Failed:', error.message);
  }

  console.log('\n🎉 API Testing Complete!');
};

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.log('❌ This script requires Node.js 18+ with fetch support');
  console.log('   Run: node --version to check your Node.js version');
  process.exit(1);
}

testAPI().catch(console.error);