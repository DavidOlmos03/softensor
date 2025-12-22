#!/bin/bash
# Development startup script

echo "🚀 Starting Softensor in DEVELOPMENT mode..."
echo ""

# Check if .env.development exists
if [ ! -f .env.development ]; then
    echo "⚠️  .env.development not found, copying from .env.example..."
    cp .env.example .env.development
fi

# Start development environment
docker-compose -f docker-compose.dev.yml up --build

echo ""
echo "✅ Development environment started!"
echo "🌐 Access the application at: http://localhost:3000"
