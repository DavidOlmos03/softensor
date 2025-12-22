#!/bin/bash
# Clean Docker resources

echo "🧹 Cleaning Docker resources..."

# Stop all containers
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.yml down

# Remove volumes
read -p "❓ Remove volumes? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker-compose -f docker-compose.yml down -v
    echo "✅ Volumes removed"
fi

# Remove images
read -p "❓ Remove images? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker-compose -f docker-compose.yml down --rmi all
    docker-compose -f docker-compose.dev.yml down --rmi all
    echo "✅ Images removed"
fi

# Prune system
read -p "❓ Prune Docker system? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker system prune -f
    echo "✅ System pruned"
fi

echo ""
echo "✅ Cleanup completed!"
