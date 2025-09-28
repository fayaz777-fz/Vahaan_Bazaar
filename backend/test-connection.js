// Simple server test
const http = require('http');

const postData = JSON.stringify({
  email: 'test@example.com',
  password: 'testpass123!'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/health',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
};

console.log('Testing backend server connection...');

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('✅ Backend server is responding!');
    console.log('Status Code:', res.statusCode);
    console.log('Response:', data);
  });
});

req.on('error', (error) => {
  console.error('❌ Connection failed:', error.message);
});

req.end();