# Unanet MCP Server - Production Testing Checklist

## ⚠️ Before You Start

### Safety First
- [ ] Using TEST/UAT environment (not production)
- [ ] Have backup of any data you might modify
- [ ] Using read-only API user if possible
- [ ] IT team aware of testing

### Prerequisites
- [ ] Unanet API credentials confirmed working
- [ ] Claude Desktop installed and running
- [ ] Node.js 18+ installed
- [ ] Can access Unanet web interface as backup

## 🧪 Progressive Testing Steps

### Phase 1: Setup Verification (5 min)
```bash
# 1. Test your credentials work
cd unanet-mcp-server
cp .env.example .env
# Edit .env with your REAL credentials

# 2. Build and start
npm install
npm run build
npm run dev
```

**Expected**: Server starts with "Authentication configured successfully"

### Phase 2: Read-Only Operations (10 min)

Test these in Claude Desktop in order:

#### 1. Basic Connection
```
"Can you connect to Unanet?"
```
✅ Success: "Yes, I can connect..."
❌ Failure: Check credentials and base URL

#### 2. List Projects
```
"Show me all active projects"
```
✅ Success: See your actual projects
❌ Failure: Check API permissions

#### 3. Project Details
```
"Get details for project [YOUR-PROJECT-ID]"
```
✅ Success: Detailed project info
❌ Failure: Verify project ID exists

#### 4. Timesheets (Read)
```
"Show my timesheets from last week"
```
✅ Success: Your timesheet data
❌ Failure: Check timesheet permissions

### Phase 3: Advanced Queries (10 min)

#### 5. Complex Queries
```
"Give me an executive summary of all projects"
"Show projects over budget"
"Which team members are working on project X?"
```

#### 6. Financial Data
```
"What's the billing status for project [ID]?"
"Show financial metrics for active projects"
```

### Phase 4: Write Operations (USE CAUTION)

⚠️ **Only if in TEST environment!**

#### 7. Test Timesheet Entry
```
"Submit 1 hour to project [TEST-PROJECT-ID] for today with description 'MCP testing'"
```

#### 8. Create Test Contact
```
"Create a contact: Test User, test@example.com"
```

## 📊 Performance Benchmarks

Track response times:
- Simple queries: < 2 seconds
- Complex reports: < 5 seconds
- Bulk operations: < 10 seconds

## 🚨 Common Issues & Solutions

### "Authentication failed"
- Verify credentials in .env match exactly
- Check API key hasn't expired
- Ensure user has API access enabled

### "Resource not found"
- Project/resource IDs are case-sensitive
- ID might be archived/inactive
- Try listing all first to get valid IDs

### "Rate limit exceeded"
- Wait 5-10 minutes
- Check if your API has rate limits
- Reduce query frequency

### Slow responses
- Check Unanet server status
- Verify network connectivity
- Try simpler queries first

## 📝 Test Log Template

Copy and fill out:

```
Date: ___________
Tester: ___________
Environment: TEST / UAT / PROD
Unanet Version: ___________

Connection Test: ✅/❌
List Projects: ✅/❌ (Count: ___)
Get Details: ✅/❌
Timesheets: ✅/❌
Financial: ✅/❌
Write Ops: ✅/❌ / N/A

Average Response Time: ___ seconds
Errors Encountered:
_________________________________

Notes:
_________________________________
```

## 🎯 Success Criteria

You're ready for production when:
- [ ] All read operations work correctly
- [ ] Response times are acceptable
- [ ] No credential/security errors
- [ ] Error messages are helpful
- [ ] Can handle invalid inputs gracefully

## 🚀 Next Steps

If all tests pass:
1. Document any Unanet-specific quirks
2. Create team training materials
3. Set up monitoring/alerts
4. Plan phased rollout

## ⚡ Quick Smoke Test

For daily verification (30 seconds):
```
"List my projects"
```
If this works, core functionality is operational.

---

**Remember**: Start small, test thoroughly, expand gradually!