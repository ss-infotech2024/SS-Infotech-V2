#!/usr/bin/env bash
# Render build script
set -e

echo "⬇️ Installing npm@9 (fix for ERR_INVALID_ARG_TYPE)..."
npm install -g npm@9

echo "🧹 Cleaning old installs..."
rm -rf node_modules package-lock.json
npm cache clean --force

echo "📦 Installing dependencies..."
npm install

echo "🏗️ Building project..."
npm run build
