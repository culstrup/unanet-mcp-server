#!/bin/bash

echo "🚀 Unanet MCP Server Setup"
echo "========================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env with your Unanet credentials"
fi

# Display Claude Desktop configuration
echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env with your Unanet credentials"
echo "2. Add the following to your Claude Desktop config:"
echo ""
echo "Location:"
echo "  macOS: ~/Library/Application Support/Claude/claude_desktop_config.json"
echo "  Windows: %APPDATA%\\Claude\\claude_desktop_config.json"
echo ""
echo "Configuration:"
cat << 'EOF'
{
  "mcpServers": {
    "unanet": {
      "command": "node",
      "args": ["${PWD}/dist/index.js"],
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
EOF
echo ""
echo "3. Replace ${PWD} with: $(pwd)"
echo "4. Restart Claude Desktop"
echo ""
echo "🎉 Happy coding with Unanet MCP!"