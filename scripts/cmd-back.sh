#!/bin/sh

# no parameters
usage () {
	printf "Usage cmd-back.sh:\n\n"

	printf "nest generate:\n"
	printf "sh ./cmd-back.sh nestcli <nest_element_type> <name> (<path>)\n"
	printf "the <path> is optional\n\n"

	printf "npm install:\n"
	printf "sh ./cmd-back.sh npm <package_to_install>\n"
}

# no parameters
format_code () {
	make format
}

# $1 (useless)  : option
# $2            : Nest element type
# $3            : name
# $4 (optional) : path
nestcli () {
	docker exec our-backend nest g ${2} ${3} ${4}
	format_code
	git add .
	git commit -F - <<- body
	nestcli: g ${2} ${3} ${4}

	command used:

	docker exec our-backend nest g \\
	${2} ${3} ${4}
	body
}

# $1 (useless)  : option
# $2            : package name
npm_install () {
	docker exec our-backend npm install ${2}
	format_code
	git add .
	git commit -F - <<- body
	npm install: ${2}

	command used:

	docker exec our-backend npm install \\
	${2}
	body

}

# $1 : option
main () {
	if [ "${1}" == "nestcli" ]
	then
		nestcli "${@}"
	elif [ "${1}" == "npm" ]
	then
		npm_install "${@}"
	else
		usage
	fi
}

main "${@}"
