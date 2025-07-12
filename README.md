# Unanet GovCon ERP MCP Server

A connector that lets Claude Desktop talk to your Unanet GovCon ERP system, allowing you to manage projects, submit timesheets, and generate reports using natural language.

## 🎯 New Here? Start with the [Getting Started Guide](GETTING-STARTED.md)

The Getting Started guide will help you:
- ✅ Choose the right setup path for your skill level
- 📚 Find the documentation you need
- 🚀 Get up and running quickly

### Quick Links for Windows Users
- 🪟 **Non-technical?** → [Windows Setup Guide](README-WINDOWS.md)
- 💻 **Technical?** → Jump to [Installation](#installation) below
- ❓ **Questions?** → [FAQ](FAQ.md)
- 🔧 **Issues?** → [Troubleshooting](TROUBLESHOOTING-WINDOWS.md)

## Features

### Tools Available

#### Project Management
- `unanet_get_projects` - List all projects with filtering options
- `unanet_get_project_details` - Get detailed information about a specific project
- `unanet_update_project_budget` - Update project budget
- `unanet_get_project_status` - Get project status and dashboard metrics

#### Time & Expense Tracking
- `unanet_submit_timesheet` - Submit time entries
- `unanet_get_timesheets` - Retrieve timesheets for a date range
- `unanet_submit_expense` - Submit expense reports
- `unanet_approve_timesheet` - Approve submitted timesheets

#### Contact Management
- `unanet_create_contact` - Create new contacts
- `unanet_update_lead` - Update lead information
- `unanet_create_opportunity` - Create new opportunities
- `unanet_get_company_info` - Get company details

#### Financial Operations
- `unanet_get_billing_status` - Get project billing information
- `unanet_generate_invoice` - Generate project invoices
- `unanet_get_financial_report` - Generate various financial reports

### Resources Available
- `unanet://projects/active` - List of active projects
- `unanet://timesheets/templates` - Timesheet templates and common entries

## Installation

### 🪟 Windows Users (Recommended)

1. **Download the project**:
   - Download from GitHub as a ZIP file
   - Extract to `C:\UnanetMCP\`

2. **Run the automated setup**:
   - Double-click `setup-windows.bat`
   - Follow the prompts

That's it! See [Windows Setup Guide](README-WINDOWS.md) for detailed instructions.

### 🐧 Mac/Linux Users

1. Clone this repository:
```bash
git clone https://github.com/culstrup/unanet-mcp-server.git
cd unanet-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Set up your environment variables:
```bash
cp .env.example .env
# Edit .env with your Unanet credentials
```

## Configuration

### Environment Variables

Create a `.env` file with your Unanet credentials:

```env
UNANET_USERNAME=your-username
UNANET_PASSWORD=your-password
UNANET_API_KEY=your-api-key
UNANET_FIRM_CODE=your-firm-code
UNANET_BASE_URL=https://your-instance.unanet.com
```

### Claude Desktop Configuration

Add the following to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "unanet": {
      "command": "node",
      "args": ["/absolute/path/to/unanet-mcp-server/dist/index.js"],
      "env": {
        "UNANET_USERNAME": "your-username",
        "UNANET_PASSWORD": "your-password",
        "UNANET_API_KEY": "your-api-key",
        "UNANET_FIRM_CODE": "your-firm-code",
        "UNANET_BASE_URL": "https://your-instance.unanet.com"
      }
    }
  }
}
```

## Usage Examples

Once configured, you can interact with Unanet through Claude:

### Project Management
```
"Show me all active projects"
"Get details for project ABC123"
"Update the budget for project XYZ to $150,000"
"What's the status of the government contract project?"
```

### Time Tracking
```
"Submit 8 hours for project ABC123 for today"
"Show my timesheets for last week"
"Approve timesheet TS-2024-001"
```

### Financial Reports
```
"Generate a project profitability report for Q4"
"Show billing status for project DEF456"
"Create an invoice for the last billing period"
```

### Contact Management
```
"Create a new contact: John Smith from ABC Corp"
"Update the lead status to 'Proposal' with 75% probability"
"Create a new opportunity worth $500k closing next month"
```

## Power User Examples: Real Value & Time Savings

See how the Unanet MCP integration transforms complex ERP queries into simple conversations:

📸 **[View Screenshot Examples](docs/POWER-USER-SCREENSHOTS.md)** - See real examples of these queries in action

### Executive Project Status Updates (Save 15-30 minutes daily)

**Traditional Method:** Log into Unanet → Navigate to Projects → Open each project → Copy data → Format in Excel → Write summary
**With Claude:** "Can you provide an executive update on the status of everything Unanet project-wise?"

**Example Output:**
```
Executive Update: Unanet Project Portfolio Status

Portfolio Overview
• Total Active Projects: 2
• Combined Portfolio Budget: $350,000
• Total Actual Costs to Date: $125,000
• Overall Portfolio Utilization: 35.7%

Project Status Summary
Test Project Alpha (PRJ-001)
• Status: Active
• Timeline: January 1 - December 31, 2024
• Progress: 50% Complete
• Budget Performance: $75,000 spent of $150,000 (50% budget utilization)
• Project Manager: John Doe
```

### Daily Executive Briefings (Save 20 minutes each morning)

**Traditional Method:** Run multiple reports → Analyze data → Identify risks → Format briefing
**With Claude:** "Give me an exec daily briefing in 3-5 bullet points with one recommended action item"

**Example Output:**
```
Executive Daily Briefing - Unanet Projects

• Portfolio Health: 2 active projects ($350K total budget) tracking on schedule with $125K spent (36% utilization)
• Project Alpha: 50% complete with proportional budget burn ($75K/$150K) - entering critical second half of project timeline
• Project Beta: Early stage execution at 25% complete, healthy budget trajectory ($50K/$200K spent)
• Resource Status: Current team allocation stable with Jane Smith at 80% on Alpha; no resource conflicts identified
• Risk Assessment: No red flags - both projects showing green status with budget and timeline alignment

Recommended Action: Schedule mid-project review for Project Alpha this week to validate second-half resource planning and identify any scope adjustments needed to maintain on-time delivery.
```

### Instant Financial Analysis (Save 45 minutes per analysis)

**Traditional Method:** Export financial data → Create pivot tables → Calculate metrics → Generate charts
**With Claude:** "Show me the financial performance metrics for all active projects with budget variance analysis"

### Resource Optimization Queries (Save 1-2 hours weekly)

**Traditional Method:** Pull resource reports → Check allocations → Identify conflicts → Email managers
**With Claude:** "Which team members are overallocated next month and what projects are affected?"

### Compliance & Audit Readiness (Save hours during audits)

**Traditional Method:** Gather timesheet data → Verify approvals → Create audit trail → Format reports
**With Claude:** "Generate a compliance report showing all unapproved timesheets and expenses for the last quarter"

### ROI & Value Proposition

Based on typical GovCon operations:
- **Time Saved:** 2-4 hours per week for project managers, 1-2 hours daily for executives
- **Error Reduction:** Eliminate manual data entry errors and inconsistencies
- **Decision Speed:** Get answers in seconds instead of running reports for 20-30 minutes
- **Audit Readiness:** Instant access to compliance data without manual compilation
- **Strategic Focus:** Spend time on analysis and decisions, not data gathering

### Pro Tips for Power Users

1. **Chain Complex Queries:** "Show me all projects over budget, then create a risk mitigation plan for the top 3"
2. **Automate Regular Reports:** "Every Monday, give me a portfolio health check with recommended actions"
3. **Deep Dive Analysis:** "Compare this quarter's project performance to last quarter and identify trends"
4. **What-If Scenarios:** "If we increase Project Alpha's budget by 20%, how does that affect our portfolio metrics?"

## Development

### Running in Development Mode
```bash
npm run dev
```

### Project Structure
```
src/
├── index.ts           # Main server entry point
├── auth.ts            # Authentication handling
├── tools/             # MCP tool implementations
│   ├── projects.ts    # Project management tools
│   ├── timesheet.ts   # Time/expense tools
│   ├── contacts.ts    # Contact management
│   └── financials.ts  # Financial tools
├── resources/         # MCP resource providers
│   └── reports.ts     # Report resources
└── types/             # TypeScript type definitions
    └── unanet.ts      # Unanet API types
```

### Adding New Tools

1. Create a new tool in the appropriate file under `src/tools/`
2. Export the tool definition with:
   - `name`: Unique tool identifier
   - `description`: Clear description of what the tool does
   - `inputSchema`: Zod schema for input validation
   - `handler`: Async function that executes the tool
3. Import and add the tool to the `tools` array in `src/index.ts`

## Security Considerations

- Never commit your `.env` file
- Use environment variables for all sensitive data
- The server implements rate limiting protection
- All API calls use HTTPS
- Credentials are transmitted using Basic Auth + API Key

## Troubleshooting

### Authentication Errors
- Verify your credentials in the `.env` file
- Ensure your API key has the necessary permissions
- Check that your firm code is correct

### Connection Issues
- Verify the `UNANET_BASE_URL` is correct
- Check network connectivity
- Ensure the Unanet API is accessible from your network

### Claude Desktop Integration
- Restart Claude Desktop after configuration changes
- Check the logs for any MCP connection errors
- Verify the absolute path to the server is correct

## Support

For issues or questions:
1. Check the Unanet API documentation
2. Review the MCP documentation at https://modelcontextprotocol.io
3. Open an issue in this repository

## About

Created by [GSD at Work LLC](https://gsdat.work) - We help CEOs integrate AI into their core business operations and accelerate growth, including GovCons (civilian & DoD).

Contact: christian@gsdat.work

## License

MIT License - Copyright (c) 2025 GSD at Work LLC - See LICENSE file for details