#!/usr/bin/env node

// Test script to verify mock server connection
import axios from 'axios';

async function testConnection() {
  const config = {
    baseURL: 'http://localhost:3000',
    auth: {
      username: 'test-user',
      password: 'test-pass'
    },
    headers: {
      'X-API-Key': 'test-api-key'
    }
  };

  try {
    console.log('Testing connection to mock server...');
    const response = await axios.get('/projects', config);
    console.log('✅ SUCCESS! Mock server is running and accessible');
    console.log('Projects found:', response.data.length);
    console.log('Sample project:', JSON.stringify(response.data[0], null, 2));
  } catch (error) {
    console.error('❌ ERROR: Cannot connect to mock server');
    console.error('Error:', error.message);
    console.error('\nMake sure the mock server is running:');
    console.error('  npm run mock-server');
  }
}

testConnection();