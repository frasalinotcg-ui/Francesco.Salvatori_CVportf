#!/bin/bash

echo "🧪 Testing Vite build configuration..."
echo ""

# Clean previous build
echo "🧹 Cleaning dist folder..."
rm -rf dist

# Run build
echo "🔨 Running build..."
npm run build

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ BUILD SUCCESSFUL!"
  echo ""
  echo "📊 Build output:"
  ls -lh dist/
  echo ""
  echo "🚀 Ready for deployment!"
else
  echo ""
  echo "❌ BUILD FAILED!"
  echo ""
  echo "Check errors above ☝️"
  exit 1
fi
