#!/bin/bash
# View logs script

ENV=${1:-prod}

if [ "$ENV" == "dev" ]; then
    echo "📋 Viewing DEVELOPMENT logs (Ctrl+C to exit)..."
    docker-compose -f docker-compose.dev.yml logs -f
elif [ "$ENV" == "prod" ]; then
    echo "📋 Viewing PRODUCTION logs (Ctrl+C to exit)..."
    docker-compose -f docker-compose.yml logs -f
else
    echo "❌ Invalid environment. Use: ./scripts/logs.sh [dev|prod]"
    exit 1
fi
