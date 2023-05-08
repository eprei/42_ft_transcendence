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

create_env_postgres () {
	cat > env/postgres.env << eof
POSTGRES_USER=$(whoami)
POSTGRES_PASSWORD=$(pwgen)
POSTGRES_DB="bigdata-transcendence"
eof
}

create_env_nest () {
	cat > env/nest.env << eof
DATABASE_URL=postgres://user::password@postgres:5432/db
PORT=3000
eof
}

main () {
	mkdir -p env
	create_env_nest
	create_env_postgres
}

main
