#!/usr/bin/env node

/**
 * Mock Unanet API server for testing without credentials
 * Run with: npm run mock-server
 */

import express from 'express';
import basicAuth from 'express-basic-auth';

const app = express();
app.use(express.json());

// Mock authentication
app.use(basicAuth({
  users: { 'test-user': 'test-pass' },
  challenge: true
}));

// Mock API key validation
app.use((req, res, next) => {
  if (req.headers['x-api-key'] !== 'test-api-key') {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  next();
});

// Mock endpoints
app.get('/projects', (req, res) => {
  res.json([
    {
      id: 'PRJ-001',
      name: 'Test Project Alpha',
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      budget: 150000,
      actualCost: 75000,
      percentComplete: 50,
      projectManager: 'John Doe'
    },
    {
      id: 'PRJ-002',
      name: 'Test Project Beta',
      status: 'Active',
      startDate: '2024-03-01',
      budget: 200000,
      actualCost: 50000,
      percentComplete: 25
    }
  ]);
});

app.get('/projects/:id', (req, res) => {
  res.json({
    id: req.params.id,
    name: 'Test Project Details',
    status: 'Active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    budget: 150000,
    actualCost: 75000,
    percentComplete: 50,
    tasks: [
      {
        id: 'TSK-001',
        name: 'Design Phase',
        status: 'Completed',
        hoursEstimated: 100,
        hoursActual: 95
      }
    ],
    team: [
      {
        id: 'EMP-001',
        name: 'Jane Smith',
        role: 'Developer',
        email: 'jane@test.com',
        allocation: 80
      }
    ]
  });
});

app.get('/timesheets', (req, res) => {
  res.json([
    {
      id: 'TS-001',
      employeeId: 'EMP-001',
      periodStart: '2024-01-01',
      periodEnd: '2024-01-07',
      status: 'Approved',
      totalHours: 40,
      totalBillableHours: 38,
      entries: []
    }
  ]);
});

app.post('/timesheets', (req, res) => {
  res.json({
    id: 'TS-NEW-001',
    status: 'Draft',
    totalHours: req.body.entries.reduce((sum: number, e: any) => sum + e.hours, 0),
    totalBillableHours: req.body.entries.filter((e: any) => e.billable).reduce((sum: number, e: any) => sum + e.hours, 0)
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Mock Unanet API server running on http://localhost:${PORT}`);
  console.log('Use these test credentials:');
  console.log('  Username: test-user');
  console.log('  Password: test-pass');
  console.log('  API Key: test-api-key');
  console.log('  Base URL: http://localhost:3000');
});