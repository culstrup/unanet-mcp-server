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