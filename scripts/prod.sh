#!/bin/bash
# Production startup script

echo "🚀 Starting Softensor in PRODUCTION mode..."
echo ""

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "❌ .env.production not found!"
    echo "Please create .env.production from .env.example and configure it."
    exit 1
fi

# Build and start production environment
docker-compose -f docker-compose.yml up --build -d

echo ""
echo "✅ Production environment started!"
echo "🌐 Access the application at: http://localhost"
echo ""
echo "📊 View logs:"
echo "   docker-compose -f docker-compose.yml logs -f"
echo ""
echo "🛑 Stop services:"
echo "   docker-compose -f docker-compose.yml down"
