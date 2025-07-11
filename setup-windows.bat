@echo off
setlocal enabledelayedexpansion

echo ============================================
echo   Unanet MCP Server Setup for Windows
echo ============================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo [OK] Running with administrator privileges
) else (
    echo [WARNING] Not running as administrator. Some features may not work.
    echo Please right-click this file and select "Run as administrator"
    pause
)

echo.
echo Checking prerequisites...
echo.

REM Check for Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js first:
    echo 1. Visit https://nodejs.org/
    echo 2. Download the LTS version for Windows
    echo 3. Run the installer
    echo 4. Restart this setup after installation
    echo.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo [OK] Node.js found: !NODE_VERSION!
)

REM Check for npm
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed properly!
    echo Please reinstall Node.js
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo [OK] npm found: !NPM_VERSION!
)

echo.
echo Installing project dependencies...
echo This may take a few minutes...
echo.

call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies!
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)

echo.
echo Building the project...
echo.

call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Failed to build the project!
    pause
    exit /b 1
)

echo.
echo [OK] Build completed successfully!
echo.

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating configuration file...
    copy .env.example .env >nul
    echo [OK] Created .env file
    echo.
    echo IMPORTANT: You need to edit the .env file with your Unanet credentials!
    echo.
    choice /C YN /M "Would you like to edit the .env file now"
    if !errorlevel! equ 1 (
        notepad .env
        echo.
        echo Please save the file after entering your credentials.
        pause
    )
) else (
    echo [OK] .env file already exists
)

echo.
echo ============================================
echo   Claude Desktop Configuration
echo ============================================
echo.

REM Get the current directory
set CURRENT_DIR=%CD%

REM Find Claude Desktop config location
set CLAUDE_CONFIG=%APPDATA%\Claude\claude_desktop_config.json

echo Claude Desktop configuration location:
echo %CLAUDE_CONFIG%
echo.

if not exist "%APPDATA%\Claude\" (
    echo [WARNING] Claude Desktop config directory not found!
    echo Make sure Claude Desktop is installed.
    echo.
    echo Creating directory...
    mkdir "%APPDATA%\Claude\"
)

REM Create config generator script
echo Creating configuration helper...
echo.

REM Create a PowerShell script to handle JSON
echo $configPath = "%CLAUDE_CONFIG%" > config-helper.ps1
echo $currentDir = "%CURRENT_DIR%" >> config-helper.ps1
echo. >> config-helper.ps1
echo # Read existing config or create new one >> config-helper.ps1
echo if (Test-Path $configPath) { >> config-helper.ps1
echo     $config = Get-Content $configPath -Raw ^| ConvertFrom-Json >> config-helper.ps1
echo } else { >> config-helper.ps1
echo     $config = @{ mcpServers = @{} } >> config-helper.ps1
echo } >> config-helper.ps1
echo. >> config-helper.ps1
echo # Add Unanet server configuration >> config-helper.ps1
echo $config.mcpServers ^| Add-Member -Type NoteProperty -Name "unanet" -Value @{ >> config-helper.ps1
echo     command = "node" >> config-helper.ps1
echo     args = @("$currentDir\dist\index.js") >> config-helper.ps1
echo     env = @{ >> config-helper.ps1
echo         UNANET_USERNAME = "your-username" >> config-helper.ps1
echo         UNANET_PASSWORD = "your-password" >> config-helper.ps1
echo         UNANET_API_KEY = "your-api-key" >> config-helper.ps1
echo         UNANET_FIRM_CODE = "your-firm-code" >> config-helper.ps1
echo         UNANET_BASE_URL = "https://your-instance.unanet.com" >> config-helper.ps1
echo     } >> config-helper.ps1
echo } -Force >> config-helper.ps1
echo. >> config-helper.ps1
echo # Save the config >> config-helper.ps1
echo $config ^| ConvertTo-Json -Depth 10 ^| Set-Content $configPath >> config-helper.ps1
echo. >> config-helper.ps1
echo Write-Host "Configuration saved to: $configPath" -ForegroundColor Green >> config-helper.ps1

echo.
choice /C YN /M "Would you like to automatically configure Claude Desktop"
if !errorlevel! equ 1 (
    echo.
    echo Configuring Claude Desktop...
    powershell -ExecutionPolicy Bypass -File config-helper.ps1
    
    echo.
    echo [OK] Claude Desktop configured!
    echo.
    echo IMPORTANT: You still need to:
    echo 1. Edit the configuration with your actual Unanet credentials
    echo 2. Restart Claude Desktop
    echo.
    choice /C YN /M "Would you like to edit the Claude config now"
    if !errorlevel! equ 1 (
        notepad "%CLAUDE_CONFIG%"
        echo.
        echo Please update the Unanet credentials in the config file.
        pause
    )
) else (
    echo.
    echo Manual configuration required:
    echo 1. Open: %CLAUDE_CONFIG%
    echo 2. Add the following configuration:
    echo.
    type manual-config.txt
)

REM Clean up
if exist config-helper.ps1 del config-helper.ps1

echo.
echo ============================================
echo   Setup Complete!
echo ============================================
echo.
echo Next steps:
echo 1. Make sure your .env file has your Unanet credentials
echo 2. Make sure Claude Desktop config has your Unanet credentials
echo 3. Restart Claude Desktop
echo 4. Test by asking Claude: "Can you list my Unanet projects?"
echo.
echo If you encounter issues, see troubleshooting.md
echo.
pause