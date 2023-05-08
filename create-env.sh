#!/bin/sh

alias pwgen="docker run \
    --rm \
    --interactive \
    --tty \
    backplane/pwgen \
	--ambiguous \
	--capitalize \
	--secure 20 1
	" 

generate_postgres_credentials () {
	POSTGRES_USER=$(whoami)
	POSTGRES_PASSWORD=$(pwgen)
}

create_env_postgres () {
	cat > env/postgres.env << eof
POSTGRES_USER=${POSTGRES_USER}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_DB="bigdata-transcendence"
eof
}

create_env_nest () {
	cat > env/nest.env << eof
DATABASE_URL=postgres://${POSTGRES_USER}::${POSTGRES_PASSWORD}@postgres:5432/db
PORT=3000
eof
}

main () {
	mkdir -p env
	generate_postgres_credentials
	create_env_nest
	create_env_postgres
}

main
