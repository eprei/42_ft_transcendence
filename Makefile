ADOC	=	asciidoctor --require=asciidoctor-diagram
DOCU	=	docs/README.adoc
INDEX	=	docs/index.html

CONTAINER_POST	=	our-postgresql
CONTAINER_BACK	=	our-backend
CONTAINER_FRONT	=	our-frontend
VOLUME_DATA		=	our-volume

start: env
	docker compose up

stop:
	docker compose down

env:
	@if [ ! -d env ]; then \
		printf "$(GREEN)Generate environment variables\n$(DEFAULT)"; \
		sh scripts/create-env.sh; \
	fi
# --write {backend,frontend} \
# --write backend \
# --write frontend \

format:
	docker run \
	--rm \
	--volume $(shell pwd):/app tgrivel/prettier \
	--write frontend \
	--write backend \
	--config .prettierrc \
	--ignore-path .prettierignore

cmd-back:
	docker exec -it our-backend sh

cmd-front:
	docker exec -it our-frontend sh

doc:
	@printf "$(YELLOW)Generating documentations..$(DEFAULT)\n"
	@$(ADOC) $(DOCU) -o $(INDEX)

docdocker:
	@printf "$(YELLOW)launch the asciidoctor/docker-asciidoctor docker image..$(DEFAULT)\n"
	@docker run --rm -v $(shell pwd):/documents/ asciidoctor/docker-asciidoctor make doc

clean-container: clean-postgresql clean-front clean-back

clean-image:
	docker image rm our-frontend-image
	docker image rm our-backend-image

clean-database: clean-postgresql
	@if docker volume inspect $(VOLUME_DATA) 1>/dev/null 2>/dev/null ; then docker volume rm $(VOLUME_DATA); fi

clean-postgresql:
	@if docker container inspect $(CONTAINER_POST) 1>/dev/null 2>/dev/null ; then docker container rm $(CONTAINER_POST); fi

clean-front:
	@if docker container inspect $(CONTAINER_FRONT) 1>/dev/null 2>/dev/null ; then docker container rm $(CONTAINER_FRONT); fi

clean-back:
	@if docker container inspect $(CONTAINER_BACK) 1>/dev/null 2>/dev/null ; then docker container rm $(CONTAINER_BACK); fi

kill-your-work:
	docker container prune -f
	docker image prune -a -f
	docker compose down --volumes
	rm -rf ./frontend/node_modules
	rm -rf ./backend/node_modules
	rm -rf ./backend/dist

.PHONY: env

# Colors
RED     = \033[1;31m
GREEN   = \033[1;32m
YELLOW  = \033[1;33m
CYAN    = \033[1;36m
DEFAULT = \033[0m
