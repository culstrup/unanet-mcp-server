# Unanet MCP Server - Windows Setup Guide

This guide will help you connect Claude Desktop to your Unanet GovCon ERP system. No technical experience required!

## 📋 Before You Start

You will need:
- ✅ A Windows computer (Windows 10 or 11)
- ✅ Claude Desktop installed and working
- ✅ Your Unanet login credentials:
  - Username
  - Password
  - API Key
  - Firm Code
  - Your Unanet URL (looks like: https://yourcompany.unanet.com)
- ✅ About 15 minutes

## 🚀 Step-by-Step Installation

### Step 1: Install Node.js (5 minutes)

Node.js is required to run the Unanet connector.

1. **Open your web browser** and go to: https://nodejs.org/
2. **Click the big green button** that says "Download Node.js (LTS)"
   - It should say something like "20.x.x LTS Recommended For Most Users"
3. **Run the downloaded file** (it will be in your Downloads folder)
4. **Click "Next" through the installer**
   - ✅ Accept the license agreement
   - ✅ Keep all the default options
   - ✅ Click "Install"
5. **Click "Finish"** when done

### Step 2: Download the Unanet Connector (2 minutes)

1. **Download the connector** from GitHub:
   - Go to: https://github.com/culstrup/unanet-mcp-server
   - Click the green "Code" button
   - Click "Download ZIP"
   
2. **Extract the files**:
   - Go to your Downloads folder
   - Right-click on the downloaded ZIP file
   - Click "Extract All..."
   - Click "Extract"

3. **Move the folder** to a permanent location:
   - We recommend: `C:\UnanetMCP\`
   - Create this folder if it doesn't exist
   - Move the extracted folder there

### Step 3: Run the Setup (5 minutes)

1. **Open the UnanetMCP folder** in File Explorer

2. **Double-click** `setup-windows.bat`
   - If Windows asks "Do you want to allow this?", click "Yes"
   - A black window (Command Prompt) will open

3. **Follow the prompts**:
   - The setup will check that everything is installed correctly
   - It will download necessary files (this takes 1-2 minutes)
   - When asked "Would you like to edit the .env file now?", type `Y` and press Enter

4. **Enter your Unanet credentials** in Notepad:
   ```
   UNANET_USERNAME=your-username-here
   UNANET_PASSWORD=your-password-here
   UNANET_API_KEY=your-api-key-here
   UNANET_FIRM_CODE=your-firm-code-here
   UNANET_BASE_URL=https://your-company.unanet.com
   ```
   - Replace each `your-xxx-here` with your actual information
   - **Save the file** (Ctrl+S) and close Notepad

5. **Configure Claude Desktop**:
   - When asked "Would you like to automatically configure Claude Desktop?", type `Y` and press Enter
   - When asked "Would you like to edit the Claude config now?", type `Y` and press Enter
   - In the file that opens, find the Unanet section and update it with your credentials (same as step 4)
   - **Save the file** (Ctrl+S) and close Notepad

### Step 4: Restart Claude Desktop (1 minute)

1. **Close Claude Desktop** completely:
   - Right-click the Claude icon in your system tray (bottom-right corner)
   - Click "Quit" or "Exit"

2. **Start Claude Desktop** again:
   - Double-click the Claude Desktop icon on your desktop

### Step 5: Test It Out! (2 minutes)

1. **Open Claude Desktop**

2. **Test with these commands**:
   - "Can you connect to Unanet?"
   - "Show me my active Unanet projects"
   - "What projects am I working on?"

If Claude responds with your project information, congratulations! 🎉 You're all set up!

## 🔧 Troubleshooting

### "Node.js is not installed" error
- Make sure you completed Step 1
- Try restarting your computer after installing Node.js

### "Cannot find Claude Desktop config" error
- Make sure Claude Desktop is installed
- Try running Claude Desktop at least once before setup

### Claude says "I don't have access to Unanet"
1. Make sure you restarted Claude Desktop
2. Check that your credentials are correct in both files
3. Try the setup again

### "Failed to install dependencies" error
- Check your internet connection
- Temporarily disable antivirus software
- Try running setup-windows.bat as Administrator (right-click → Run as administrator)

## 📝 What Can You Ask Claude?

Once set up, you can ask Claude things like:

**Project Management:**
- "Show me all my active projects"
- "What's the status of project ABC123?"
- "Update the budget for project XYZ to $200,000"

**Time Tracking:**
- "Submit 8 hours to project ABC today"
- "Show my timesheets from last week"
- "How many hours did I bill this month?"

**Financial Reports:**
- "Generate a project profitability report"
- "Show the billing status for project DEF456"
- "What's our cash flow for Q4?"

**Contacts:**
- "Create a new contact: John Smith from Acme Corp"
- "Show me all contacts from ABC Company"
- "Create a new opportunity worth $500k"

## 🆘 Getting Help

If you're stuck:

1. **Check the troubleshooting section** above
2. **Try the setup again** - sometimes it just needs a second try
3. **Ask your IT department** - they can help with installation issues
4. **Contact support** with:
   - What step you're on
   - What error message you see
   - A screenshot of the error (Windows Key + Shift + S)

## 🔒 Security Notes

- Your credentials are stored locally on your computer
- They are never sent anywhere except to Unanet
- The connection to Unanet is encrypted
- Only you can access your Unanet data through Claude

## 📄 License

This software is provided under the MIT License. See LICENSE file for details.

---

*Made with ❤️ for Unanet users who want to work smarter with Claude*