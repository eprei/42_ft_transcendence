#!/bin/sh

alias pwgen="docker run \
	--rm \
	--interactive \
	backplane/pwgen \
	--ambiguous \
	--capitalize \
	--secure 20 1"

is_environment_file_already_exist () {
	if [ -e ".env" ]
	then
		echo "The '.env' file already exists."
		echo "You need to delete it to recreate a new one."
		exit 0
	fi
}

generate_all_variables () {
	POSTGRES_USER=$(whoami)
	POSTGRES_PASSWORD=$(pwgen)
	POSTGRES_NAME="our-data"
}

ask_42_api_credentials () {
	printf "42 UID   : "; read -r FT_UUID
	printf "42 SECRET: "; read -r FT_SECRET

	printf "production 42 UID   : "; read -r PROD_FT_UUID
	printf "production 42 SECRET: "; read -r PROD_FT_SECRET
}

ask_hostname_option () {
	printf "Do you want to use the machine's hostname (localhost otherwise)? (Y/n): "
	read -r USE_HOSTNAME
	if [ -z "$USE_HOSTNAME" ] || [ "$USE_HOSTNAME" = "Y" ] || [ "$USE_HOSTNAME" = "y" ]
	then
		HOSTNAME=$(uname -n)
	else
		HOSTNAME="localhost"
	fi
}

create_the_environment_file () {
	cat > .env <<- environment_file
	# Cosmic Pong
	# > all secret and environment data

	# File created on $(date +"%Y.%m.%d") by $(whoami)

	# 42 credentials
	FT_UUID=${FT_UUID}
	FT_SECRET=${FT_SECRET}

	# 42 credentials PROD
	PROD_FT_UUID=${PROD_FT_UUID}
	PROD_FT_SECRET=${PROD_FT_SECRET}

	# PostgreSQL
	POSTGRES_USER=${POSTGRES_USER}
	POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
	POSTGRES_DB=${POSTGRES_NAME}

	# NestJS
	DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_NAME}
	PORT=3000

	# Hostname
	HOSTNAME=${HOSTNAME}
	environment_file
}

is_docker_running () {
	if ! docker ps 2> /dev/null 1> /dev/null
	then
		echo docker is not running
		echo please launch docker to run this script
		exit 1
	fi
}

main () {
	is_docker_running
	is_environment_file_already_exist

	ask_42_api_credentials
	generate_all_variables
	ask_hostname_option
	create_the_environment_file
}

main
