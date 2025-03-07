# Command prefix
# start- : start a process (npm run dev, queue worker)
# run- : run a oneshot command, not a long lasting process (tests)
# d- : run docker command like starting container shell or containers

# Variables

## Executables
DOCKER_DB_BASH  = docker exec -it adonis_learn_postgres bash

## Container names
DOCKER_DB= adonis_learn

## Colors
NOCOLOR=\033[0m
RED=\033[0;31m
GREEN=\033[0;32m
ORANGE=\033[0;33m
BLUE=\033[0;34m
CYAN=\033[0;36m

# Commands

## Docker

.PHONY: d-up
d-up:
	@printf "$(CYAN)Run docker containers$(NOCOLOR) \n"
	docker compose up -d

.PHONY: d-init-db
d-init-db:
	@printf "$(CYAN)Creates the database for test, runs migrations with seeders on local and test$(NOCOLOR) \n"
	${DOCKER_DB_BASH} -c "psql -U postgres -c 'CREATE DATABASE adonis_learn_test;'"
	make run-db-refresh && make run-dbt-refresh
## Database

.PHONY: run-db-refresh
run-db-refresh:
	@printf "$(CYAN)Refresh the whole database and executes seeders$(NOCOLOR) \n"
	node ace migration:fresh --seed
	@printf "$(GREEN)Database migrations and seeders execution was successful$(NOCOLOR) \n"

.PHONY: run-db-test-refresh
run-dbt-refresh:
	@printf "$(CYAN)Refresh the whole database and executes seeders for test database$(NOCOLOR) \n"
	NODE_ENV=test node ace migration:fresh --seed
	@printf "$(GREEN)Test database migrations and seeders execution was successful$(NOCOLOR) \n"

## Tests

.PHONY: run-tests
run-tests:
	@printf "$(CYAN)Execute all test suites$(NOCOLOR) \n"
	NODE_ENV=test node ace test

## Code quality

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