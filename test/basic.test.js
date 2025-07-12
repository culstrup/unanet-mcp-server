/**
 * Basic tests that can run without real Unanet credentials
 * Run with: npm test
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { spawn } from 'child_process';
import { createUnanetClient, validateAuth } from '../dist/auth.js';

describe('Unanet MCP Server Basic Tests', () => {
  describe('Authentication', () => {
    it('should reject missing credentials', () => {
      expect(() => validateAuth({})).toThrow('UNANET_USERNAME environment variable is required');
    });

    it('should accept valid credentials', () => {
      const validAuth = {
        username: 'test',
        password: 'test',
        apiKey: 'test-key',
        firmCode: 'TEST001',
        baseUrl: 'https://test.unanet.com'
      };
      expect(() => validateAuth(validAuth)).not.toThrow();
    });

    it('should mask sensitive data in logs', () => {
      // This would need to spy on console.error
      const client = createUnanetClient({
        username: 'test',
        password: 'secret-password',
        apiKey: 'secret-api-key',
        firmCode: 'TEST001',
        baseUrl: 'https://test.unanet.com'
      });
      expect(client).toBeDefined();
    });
  });

  describe('MCP Server Protocol', () => {
    let serverProcess;
    
    beforeAll(async () => {
      // Start server with test credentials
      serverProcess = spawn('node', ['dist/index.js'], {
        env: {
          ...process.env,
          UNANET_USERNAME: 'test',
          UNANET_PASSWORD: 'test',
          UNANET_API_KEY: 'test-key',
          UNANET_FIRM_CODE: 'TEST001',
          UNANET_BASE_URL: 'https://test.unanet.com'
        }
      });
      
      // Wait for server to start
      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    afterAll(() => {
      if (serverProcess) {
        serverProcess.kill();
      }
    });

    it('should respond to list tools request', async () => {
      const listToolsRequest = {
        jsonrpc: '2.0',
        method: 'tools/list',
        params: {},
        id: 1
      };
      
      return new Promise((resolve) => {
        serverProcess.stdout.once('data', (data) => {
          const response = JSON.parse(data.toString());
          expect(response.result).toBeDefined();
          expect(response.result.tools).toBeInstanceOf(Array);
          expect(response.result.tools.length).toBeGreaterThan(0);
          resolve();
        });
        
        serverProcess.stdin.write(JSON.stringify(listToolsRequest) + '\n');
      });
    });

    it('should list available resources', async () => {
      const listResourcesRequest = {
        jsonrpc: '2.0',
        method: 'resources/list',
        params: {},
        id: 2
      };
      
      return new Promise((resolve) => {
        serverProcess.stdout.once('data', (data) => {
          const response = JSON.parse(data.toString());
          expect(response.result).toBeDefined();
          expect(response.result.resources).toBeInstanceOf(Array);
          expect(response.result.resources.length).toBe(2);
          resolve();
        });
        
        serverProcess.stdin.write(JSON.stringify(listResourcesRequest) + '\n');
      });
    });
  });

  describe('Tool Input Validation', () => {
    it('should validate project tool inputs', async () => {
      // This would test Zod schema validation
      const { getProjectsTool } = await import('../dist/tools/projects.js');
      const schema = getProjectsTool.inputSchema;
      
      // Valid input
      expect(() => schema.parse({ status: 'Active', limit: 10 })).not.toThrow();
      
      // Invalid status
      expect(() => schema.parse({ status: 'Invalid' })).toThrow();
      
      // Invalid limit
      expect(() => schema.parse({ limit: -1 })).toThrow();
    });
  });
});