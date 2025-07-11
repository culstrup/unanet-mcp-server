# Visual Setup Guide - Unanet MCP Server

This guide shows you exactly what you'll see during setup.

## 📸 What Each Step Looks Like

### Step 1: Download Node.js

```
Browser Window:
┌─────────────────────────────────────────┐
│ 🌐 nodejs.org                           │
├─────────────────────────────────────────┤
│                                         │
│        Node.js                          │
│                                         │
│    ┌─────────────────────┐             │
│    │  Download Node.js    │ ← Click this│
│    │      20.11.0         │             │
│    │  (LTS) Recommended   │             │
│    └─────────────────────┘             │
│                                         │
└─────────────────────────────────────────┘
```

### Step 2: Node.js Installer

```
Node.js Setup Window:
┌─────────────────────────────────────────┐
│ Node.js Setup                           │
├─────────────────────────────────────────┤
│                                         │
│  Welcome to Node.js Setup Wizard        │
│                                         │
│  ☑ I accept the terms                  │
│                                         │
│  Installation folder:                   │
│  C:\Program Files\nodejs\               │
│                                         │
│  [Next >]  [Cancel]                     │
└─────────────────────────────────────────┘
```

### Step 3: Running the Setup

When you double-click `setup-windows.bat`:

```
Command Prompt Window:
┌─────────────────────────────────────────┐
│ C:\UnanetMCP\setup-windows.bat          │
├─────────────────────────────────────────┤
│ =====================================   │
│   Unanet MCP Server Setup for Windows   │
│ =====================================   │
│                                         │
│ Checking prerequisites...               │
│                                         │
│ [OK] Node.js found: v20.11.0            │
│ [OK] npm found: 10.2.4                  │
│                                         │
│ Installing project dependencies...      │
│ This may take a few minutes...          │
│                                         │
│ ████████████████████ 100% complete      │
│                                         │
│ Would you like to edit the .env file    │
│ now? (Y/N):                             │
└─────────────────────────────────────────┘
```

### Step 4: Editing Credentials

When Notepad opens with the .env file:

```
Notepad Window:
┌─────────────────────────────────────────┐
│ .env - Notepad                          │
├─────────────────────────────────────────┤
│ File  Edit  Format  View  Help          │
├─────────────────────────────────────────┤
│ # Unanet API Configuration              │
│ UNANET_USERNAME=your-username    ← Change this │
│ UNANET_PASSWORD=your-password    ← Change this │
│ UNANET_API_KEY=your-api-key      ← Change this │
│ UNANET_FIRM_CODE=your-firm-code  ← Change this │
│ UNANET_BASE_URL=https://...      ← Change this │
│                                         │
│ # Optional: Logging level               │
│ LOG_LEVEL=info                          │
└─────────────────────────────────────────┘

Example with real values:
UNANET_USERNAME=jsmith
UNANET_PASSWORD=MySecurePass123!
UNANET_API_KEY=abc123-def456-ghi789
UNANET_FIRM_CODE=ACME001
UNANET_BASE_URL=https://acme.unanet.com
```

### Step 5: Claude Desktop Config

Location of config file:
```
File Explorer:
┌─────────────────────────────────────────┐
│ 📁 This PC > C: > Users > YourName >    │
│    AppData > Roaming > Claude           │
├─────────────────────────────────────────┤
│ 📄 claude_desktop_config.json           │
└─────────────────────────────────────────┘
```

The config file should look like:
```json
{
  "mcpServers": {
    "unanet": {
      "command": "node",
      "args": ["C:\\UnanetMCP\\unanet-mcp-server\\dist\\index.js"],
      "env": {
        "UNANET_USERNAME": "jsmith",
        "UNANET_PASSWORD": "MySecurePass123!",
        "UNANET_API_KEY": "abc123-def456-ghi789",
        "UNANET_FIRM_CODE": "ACME001",
        "UNANET_BASE_URL": "https://acme.unanet.com"
      }
    }
  }
}
```

### Step 6: Testing in Claude Desktop

```
Claude Desktop Window:
┌─────────────────────────────────────────┐
│ Claude                                  │
├─────────────────────────────────────────┤
│                                         │
│ You: Show me my Unanet projects         │
│                                         │
│ Claude: I'll help you get your Unanet   │
│ projects. Let me fetch that data...     │
│                                         │
│ Here are your active projects:          │
│                                         │
│ 1. Project Alpha (PRJ-001)              │
│    Status: Active                       │
│    Budget: $150,000                     │
│    Complete: 45%                        │
│                                         │
│ 2. Project Beta (PRJ-002)               │
│    Status: Active                       │
│    Budget: $275,000                     │
│    Complete: 72%                        │
│                                         │
└─────────────────────────────────────────┘
```

## ✅ Success Indicators

You'll know it's working when:

1. **During Setup:**
   - You see `[OK]` messages in green
   - No `[ERROR]` messages in red
   - Setup says "Setup Complete!"

2. **In Claude:**
   - Claude can list your projects
   - Claude shows real data from Unanet
   - No error messages about "cannot access Unanet"

## ❌ Common Error Messages

### Error: "Node.js is not installed"
```
[ERROR] Node.js is not installed!

Please install Node.js first:
1. Visit https://nodejs.org/
```
**Solution:** Complete Step 1 first

### Error: "Failed to install dependencies"
```
[ERROR] Failed to install dependencies!
Please check your internet connection and try again.
```
**Solution:** Check internet, disable antivirus temporarily

### Error: "Access Denied"
```
Windows cannot access the specified device, path, or file.
```
**Solution:** Right-click setup-windows.bat → Run as administrator

## 📍 Finding Hidden Folders

If you can't see the AppData folder:

1. Open File Explorer
2. Click "View" in the menu
3. Check "Hidden items"
4. Now you can see AppData

Or use this shortcut:
- Press `Windows Key + R`
- Type `%APPDATA%\Claude`
- Press Enter

## 🎯 Quick Checklist

Before starting:
- [ ] Claude Desktop is installed
- [ ] You have your Unanet credentials
- [ ] You have 15 minutes

During setup:
- [ ] Node.js installed successfully
- [ ] Setup completed without errors
- [ ] Edited .env file with credentials
- [ ] Updated Claude config
- [ ] Restarted Claude Desktop

After setup:
- [ ] Claude responds to Unanet questions
- [ ] Can see your projects
- [ ] Can submit time entries

---

💡 **Tip:** Take a screenshot at each step if you need help later!
Press `Windows Key + Shift + S` to take a screenshot.