#!/bin/sh

ln -s \
  /app/node_modules/@nestjs/cli/bin/nest.js \
  /usr/local/bin/nest

export XP_SECRET=$(pwgen -s 32 1)

npm install

npm run start:dev
