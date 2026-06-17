MAVEN = ./mvnw
NPM = npm
BACKEND_DIR = apl
FRONTEND_DIR = ecofit-frontend

GREEN  = \033[0;32m
YELLOW = \033[0;33m
CYAN   = \033[0;36m
NC     = \033[0m

.PHONY: all build backend-build frontend-build run-backend run-frontend run clean help

all: build

build: backend-build frontend-build

backend-build:
	@echo "$(GREEN)Backend: compilando...$(NC)"
	cd $(BACKEND_DIR) && $(MAVEN) clean package -DskipTests

frontend-build:
	@echo "$(GREEN)Frontend: compilando...$(NC)"
	cd $(FRONTEND_DIR) && $(NPM) install && $(NPM) run build

run-backend:
	@echo "$(YELLOW)Backend: http://localhost:65009$(NC)"
	cd $(BACKEND_DIR) && $(MAVEN) spring-boot:run

run-frontend:
	@echo "$(YELLOW)Frontend: http://localhost:5173$(NC)"
	cd $(FRONTEND_DIR) && $(NPM) run dev

run:
	@echo "$(CYAN)A iniciar servidores (Ctrl+C para parar)...$(NC)"
	cd $(BACKEND_DIR) && $(MAVEN) spring-boot:run & \
	cd $(FRONTEND_DIR) && $(NPM) run dev & \
	wait

clean:
	@echo "$(GREEN)A limpar...$(NC)"
	cd $(BACKEND_DIR) && $(MAVEN) clean
	cd $(FRONTEND_DIR) && rm -rf dist node_modules

help:
	@echo "Comandos disponiveis:"
	@echo "  build          Compila backend + frontend"
	@echo "  backend-build  Compila apenas o backend"
	@echo "  frontend-build Compila apenas o frontend"
	@echo "  run-backend    Inicia o backend (porta 65009)"
	@echo "  run-frontend   Inicia o frontend (porta 5173)"
	@echo "  run            Inicia ambos em paralelo"
	@echo "  clean          Remove artefactos de build"
	@echo "  help           Mostra esta ajuda"
