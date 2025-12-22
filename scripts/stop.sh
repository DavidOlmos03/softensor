#!/bin/bash
# Stop all Docker containers

echo "🛑 Stopping all Softensor containers..."

# Stop development
docker-compose -f docker-compose.dev.yml down

# Stop production
docker-compose -f docker-compose.yml down

echo ""
echo "✅ All containers stopped!"
