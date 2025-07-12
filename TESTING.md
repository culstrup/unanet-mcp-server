# Testing the Unanet MCP Server

This guide explains how to test the MCP server without real Unanet credentials.

## Quick Test (No Credentials Needed)

### 1. Basic Server Test

First, install dependencies and build:
```bash
npm install
npm run build
```

Then run the test with mock credentials:
```bash
cp .env.test .env
npm run test:server
```

This will:
- Start the MCP server with test credentials
- Send test requests to list tools and resources
- Show the server's responses
- Exit after 5 seconds

Expected output shows:
- "Authentication configured successfully"
- "Server started successfully"
- List of 15 tools (projects, timesheets, contacts, financials)
- List of 2 resources (active projects, timesheet templates)

### 2. Test in Claude Desktop (Without Real API)

You can test the MCP protocol with Claude Desktop using test credentials:

1. **Configure Claude Desktop** with test credentials:
```json
{
  "mcpServers": {
    "unanet-test": {
      "command": "node",
      "args": ["C:\\path\\to\\unanet-mcp-server\\dist\\index.js"],
      "env": {
        "UNANET_USERNAME": "test-user",
        "UNANET_PASSWORD": "test-pass",
        "UNANET_API_KEY": "test-api-key",
        "UNANET_FIRM_CODE": "TEST001",
        "UNANET_BASE_URL": "https://test.unanet.com"
      }
    }
  }
}
```

2. **Restart Claude Desktop**

3. **Test commands** (these will fail with network errors but prove the integration works):
   - "Can you connect to Unanet?"
   - "List Unanet tools"
   - "Show me projects" (will fail but shows the tool is called)

## Advanced Testing with Mock API

### 1. Run Mock Unanet API Server

For more realistic testing, use the mock API server:

```bash
# Terminal 1: Start mock API server
npm run mock-server
```

This starts a mock Unanet API on http://localhost:3000 with:
- Test endpoints for projects, timesheets, etc.
- Basic authentication (test-user/test-pass)
- API key validation (test-api-key)

### 2. Test with Mock API

```bash
# Terminal 2: Run MCP server against mock API
cp .env.test .env
npm run dev
```

The `.env.test` file points to http://localhost:3000 (the mock server).

### 3. Full Integration Test

With both servers running, in Claude Desktop you can actually test real commands:
- "Show me all projects" - Returns mock project data
- "Get details for project PRJ-001" - Returns mock project details
- "Show my timesheets" - Returns mock timesheet data

## What You Can Test Without Credentials

### ✅ Can Test:
1. **Server startup and configuration**
   - Authentication validation
   - Environment variable loading
   - Server initialization

2. **MCP Protocol**
   - Tool listing and registration
   - Resource listing
   - Request/response format
   - Error handling structure

3. **Claude Desktop Integration**
   - Configuration format
   - Connection establishment
   - Tool discovery

4. **Build Process**
   - TypeScript compilation
   - Package structure
   - Dependencies

### ❌ Cannot Test:
1. **Real API calls** (need valid credentials)
2. **Actual data operations** (need Unanet access)
3. **Authentication errors** (need real API)
4. **Rate limiting** (need real API)

## Debugging Tips

### Check Server Logs
The server logs to stderr (not stdout which is reserved for MCP protocol):
```bash
npm run dev 2> server.log
```

### Test Individual Components
```bash
# Test TypeScript compilation
npm run build

# Test with explicit test env
UNANET_USERNAME=test npm run dev
```

### Common Issues

1. **"Authentication failed"** - Normal without real credentials
2. **"Network error"** - Expected when not using mock server
3. **"Cannot find module"** - Run `npm install` first
4. **"Command not found"** - Run `npm run build` first

## Summary

You can test:
- The MCP server starts and validates configuration ✅
- Tools and resources are registered correctly ✅
- Claude Desktop can discover and list tools ✅
- The build and setup process works ✅

You cannot test:
- Actual Unanet API calls without credentials ❌
- Real data operations ❌

This is sufficient to verify the MCP server structure and integration work correctly!