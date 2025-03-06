# Command prefix
# start- : start a process (npm run dev, reverb, queue worker)
# run- : run a oneshot command, not a long lasting process (phpstan)
# d- : run docker command like starting container shell or containers

# Executables
DOCKER_PHP_BASH  = docker exec -it tms_web bash

# Variables
LOCAL_PROJECT_PATH= www
PHP_STANDARD= PSR12
PHP_CS_PARAMS= -s --standard=$(PHP_STANDARD) app routes database tests
ENV_TESTING_PARAMS= --env=testing
LARASTAN_LEVEL=--level 8
LARASTAN_PARAMS= --memory-limit=512M $(LARASTAN_LEVEL)

# Container names
DOCKER_DB= tms_database
DOCKER_DB_TEST= tms_database_test

# Colors
NOCOLOR=\033[0m
RED=\033[0;31m
GREEN=\033[0;32m
ORANGE=\033[0;33m
BLUE=\033[0;34m
CYAN=\033[0;36m

.PHONY: d-up
	@printf "$(CYAN)Run docker containers$(NOCOLOR) \n"
	docker compose up -d

.PHONY: run-db-init
run-db-init:
	@printf "$(CYAN)Execute npm install in tms_web docker container$(NOCOLOR) \n"
	node ace migration:fresh --seed

.PHONY: run-merge-checker
run-merge-checker:
	@printf "$(CYAN)Execute multiple checks before merge$(NOCOLOR) \n"
	@printf "$(CYAN)Execute linter$(NOCOLOR) \n"
	npm run lint
	@printf "$(GREEN)Linter successful$(NOCOLOR) \n"
	@printf "$(CYAN)Execute prettier format$(NOCOLOR) \n"
	npm run format
	@printf "$(GREEN)Prettier successful$(NOCOLOR) \n"
	@printf "$(CYAN)Execute tsc typecheck$(NOCOLOR) \n"
	npm run typecheck
	@printf "$(GREEN)All checks passed, ready to merge !$(NOCOLOR) \n"