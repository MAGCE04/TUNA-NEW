#!/bin/bash

# Force clean rebuild script for Next.js application

echo "===== STARTING CLEAN REBUILD PROCESS ====="

# Stop any running processes
echo "Stopping any running processes..."
pkill -f "node" || true

# Clear Next.js specific caches that might cause SWC issues
echo "Clearing Next.js and SWC caches..."
rm -rf .next/cache
rm -rf .next/swc

# Remove all build artifacts and caches
echo "Removing build artifacts and caches..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf out
rm -rf .vercel/output
rm -rf .swc

# Remove any conflicting files
echo "Removing any conflicting files..."
rm -f index.html
rm -f vite.config.js
rm -rf src

# Clean npm cache
echo "Cleaning npm cache..."
npm cache clean --force

# Remove package-lock.json to ensure fresh dependency resolution
echo "Removing package-lock.json for fresh dependency resolution..."
rm -f package-lock.json

# Reinstall dependencies
echo "Reinstalling dependencies..."
rm -rf node_modules
npm install

# Verify Next.js installation
echo "Verifying Next.js installation..."
npx next --version

# Build the application
echo "Building the application..."
NODE_ENV=production npm run build

echo "===== REBUILD COMPLETE ====="
echo "You can now deploy the application with:"
echo "npm run start"