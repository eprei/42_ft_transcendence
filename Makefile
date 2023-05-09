ADOC	=	asciidoctor --require=asciidoctor-diagram
DOCU	=	docs/README.adoc
INDEX	=	docs/index.html

start:
	docker compose up

stop:
	docker compose down

doc:
	@printf "$(YELLOW)Generating documentations..$(DEFAULT)\n"
	@$(ADOC) $(DOCU) -o $(INDEX)

docdocker:
	@printf "$(YELLOW)launch the asciidoctor/docker-asciidoctor docker image..$(DEFAULT)\n"
	@docker run --rm -v $(shell pwd):/documents/ asciidoctor/docker-asciidoctor make doc

cleandocker:
	docker container prune -f
	docker image prune -a -f
	docker volume prune -f


# Colors
RED     = \033[1;31m
GREEN   = \033[1;32m
YELLOW  = \033[1;33m
CYAN    = \033[1;36m
DEFAULT = \033[0m
