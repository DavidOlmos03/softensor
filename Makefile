.PHONY: help dev prod build up down restart logs clean status health

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

help: ## Show this help message
	@echo "$(BLUE)Softensor - Docker Commands$(NC)"
	@echo ""
	@echo "$(GREEN)Available commands:$(NC)"
	@awk 'BEGIN {FS = ":.*##"; printf ""} /^[a-zA-Z_-]+:.*?##/ { printf "  $(BLUE)%-15s$(NC) %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

dev: ## Start development environment
	@echo "$(GREEN)🚀 Starting DEVELOPMENT environment...$(NC)"
	@docker-compose -f docker-compose.dev.yml up --build

dev-d: ## Start development environment in background
	@echo "$(GREEN)🚀 Starting DEVELOPMENT environment (detached)...$(NC)"
	@docker-compose -f docker-compose.dev.yml up --build -d
	@echo "$(GREEN)✅ Development running at http://localhost:3000$(NC)"

prod: ## Start production environment
	@echo "$(GREEN)🚀 Starting PRODUCTION environment...$(NC)"
	@docker-compose -f docker-compose.yml up --build -d
	@echo "$(GREEN)✅ Production running at http://localhost$(NC)"

build: ## Build Docker images
	@echo "$(YELLOW)🔨 Building Docker images...$(NC)"
	@docker-compose -f docker-compose.yml build

build-dev: ## Build development Docker image
	@echo "$(YELLOW)🔨 Building development Docker image...$(NC)"
	@docker-compose -f docker-compose.dev.yml build

up: ## Start services without building
	@docker-compose -f docker-compose.yml up -d

down: ## Stop all services
	@echo "$(YELLOW)🛑 Stopping all services...$(NC)"
	@docker-compose -f docker-compose.yml down
	@docker-compose -f docker-compose.dev.yml down
	@echo "$(GREEN)✅ All services stopped$(NC)"

restart: down prod ## Restart production services

restart-dev: ## Restart development services
	@docker-compose -f docker-compose.dev.yml restart

logs: ## View production logs
	@docker-compose -f docker-compose.yml logs -f

logs-dev: ## View development logs
	@docker-compose -f docker-compose.dev.yml logs -f

logs-nginx: ## View Nginx logs
	@docker-compose -f docker-compose.yml logs -f nginx

logs-nextjs: ## View Next.js logs
	@docker-compose -f docker-compose.yml logs -f nextjs

clean: ## Clean Docker resources (containers, volumes, images)
	@echo "$(RED)🧹 Cleaning Docker resources...$(NC)"
	@docker-compose -f docker-compose.yml down -v --rmi all
	@docker-compose -f docker-compose.dev.yml down -v --rmi all
	@docker system prune -f
	@echo "$(GREEN)✅ Cleanup completed$(NC)"

clean-volumes: ## Remove all volumes
	@echo "$(RED)🗑️  Removing volumes...$(NC)"
	@docker-compose -f docker-compose.yml down -v
	@echo "$(GREEN)✅ Volumes removed$(NC)"

status: ## Show container status
	@echo "$(BLUE)📊 Container Status:$(NC)"
	@docker-compose -f docker-compose.yml ps
	@docker-compose -f docker-compose.dev.yml ps

health: ## Check health of services
	@echo "$(BLUE)🏥 Health Check:$(NC)"
	@docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

shell-nextjs: ## Access Next.js container shell
	@docker exec -it softensor-nextjs sh

shell-nginx: ## Access Nginx container shell
	@docker exec -it softensor-nginx sh

shell-dev: ## Access development container shell
	@docker exec -it softensor-nextjs-dev sh

backup-volumes: ## Backup Docker volumes
	@echo "$(YELLOW)💾 Backing up volumes...$(NC)"
	@mkdir -p backups
	@docker run --rm -v softensor_nextjs_cache:/data -v $(PWD)/backups:/backup alpine tar czf /backup/nextjs_cache_$$(date +%Y%m%d_%H%M%S).tar.gz -C /data .
	@docker run --rm -v softensor_nginx_cache:/data -v $(PWD)/backups:/backup alpine tar czf /backup/nginx_cache_$$(date +%Y%m%d_%H%M%S).tar.gz -C /data .
	@echo "$(GREEN)✅ Volumes backed up to ./backups/$(NC)"

# Default target
.DEFAULT_GOAL := help
