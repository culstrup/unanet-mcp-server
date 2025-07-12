#!/usr/bin/env node

// Test server that simulates the MCP protocol without needing real credentials
// Run with: node test-server.js

import { spawn } from 'child_process';

console.log('Starting MCP test server...');

// Spawn the server
const server = spawn('node', ['dist/index.js'], {
  env: {
    ...process.env,
    UNANET_USERNAME: 'test-user',
    UNANET_PASSWORD: 'test-pass',
    UNANET_API_KEY: 'test-api-key',
    UNANET_FIRM_CODE: 'TEST001',
    UNANET_BASE_URL: 'https://test.unanet.com'
  }
});

// Handle server output
server.stdout.on('data', (data) => {
  console.log('Server output:', data.toString());
});

server.stderr.on('data', (data) => {
  console.log('Server log:', data.toString());
});

// Send test commands
setTimeout(() => {
  console.log('\nSending list tools request...');
  const listToolsRequest = {
    jsonrpc: '2.0',
    method: 'tools/list',
    params: {},
    id: 1
  };
  
  server.stdin.write(JSON.stringify(listToolsRequest) + '\n');
}, 1000);

setTimeout(() => {
  console.log('\nSending list resources request...');
  const listResourcesRequest = {
    jsonrpc: '2.0',
    method: 'resources/list',
    params: {},
    id: 2
  };
  
  server.stdin.write(JSON.stringify(listResourcesRequest) + '\n');
}, 2000);

// Exit after 5 seconds
setTimeout(() => {
  console.log('\nTest complete. Exiting...');
  process.exit(0);
}, 5000);