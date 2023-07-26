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
	cat >> .env <<- eof
	POSTGRES_USER=${POSTGRES_USER}
	POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
	POSTGRES_DB=${POSTGRES_NAME}
	eof
}

create_env_nest () {
	cat >> .env <<- eof
	DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_NAME}
	PORT=3000
	eof
}

ask_api_42_credentials () {
	printf "42 UID   : "; read -r FT_UUID
	printf "42 SECRET: "; read -r FT_SECRET

	cat >> .env <<- 42
	FT_UUID=${FT_UUID}
	FT_SECRET=${FT_SECRET}
	42
}

main () {
	generate_postgres_credentials
	create_env_nest
	create_env_postgres
	ask_api_42_credentials
}

main
