#!/bin/sh

alias pwgen="docker run \
	--rm \
	--interactive \
	backplane/pwgen \
	--ambiguous \
	--capitalize \
	--secure 20 1"

generate_postgres_credentials () {
	POSTGRES_USER=$(whoami)
	POSTGRES_PASSWORD=$(pwgen)
	POSTGRES_NAME="our-data"
}

create_env_postgres () {
	cat > env/postgres.env <<- eof
	POSTGRES_USER=${POSTGRES_USER}
	POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
	POSTGRES_DB=${POSTGRES_NAME}
	eof
}

create_env_nest () {
	cat > env/nest.env <<- eof
	DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_NAME}
	PORT=3000
	eof
}

ask_api_42_credentials () {
	printf "42 UID   : "; read -r FORTYTWO_APP_ID
	printf "42 SECRET: "; read -r FORTYTWO_APP_SECRET

	cat >> env/nest.env <<- 42
	FORTYTWO_APP_ID=${FORTYTWO_APP_ID}
	FORTYTWO_APP_SECRET=${FORTYTWO_APP_SECRET}
	42
}

main () {
	mkdir -p env
	generate_postgres_credentials
	create_env_nest
	create_env_postgres
	ask_api_42_credentials
}

main
