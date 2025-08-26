#!/bin/bash
# Validation script for VS Code Tagged Comment Extension
# Run this script to validate the build and development environment

set -e

echo "🚀 Validating VS Code Tagged Comment Extension Environment"
echo "============================================================"

echo "1. Installing dependencies..."
npm install

echo "2. Running linter..."
npm run lint

echo "3. Building extension (development mode)..."
npm run build

echo "4. Building extension (production mode)..."
npm run vscode:prepublish

echo "5. Compiling TypeScript..."
npm run compile

echo "6. Verifying build outputs..."
if [ -f "dist/extension-node.js" ] && [ -f "dist/extension-web.js" ]; then
    echo "✅ Build outputs created successfully"
    ls -la dist/
else
    echo "❌ Build outputs missing"
    exit 1
fi

echo "7. Checking TypeScript compilation outputs..."
if [ -f "out/src/extension.js" ]; then
    echo "✅ TypeScript compilation successful"
else
    echo "❌ TypeScript compilation failed"
    exit 1
fi

echo ""
echo "✅ All validation checks passed!"
echo ""
echo "Next steps for development:"
echo "  1. Run 'npm run watch' to start auto-rebuilding on file changes"
echo "  2. Open this project in VS Code and press F5 to test the extension"
echo "  3. Test the extension commands:"
echo "     - Tagged: Add a Tagged Comment (Ctrl+Alt+M)"
echo "     - Tagged: Re-Add the Previously Tagged Comment (Ctrl+Alt+Shift+M)"
echo ""
echo "Note: Integration tests (npm test) will fail due to network connectivity"
echo "      but the extension builds and can be manually tested in VS Code."