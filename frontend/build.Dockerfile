FROM node:18-alpine

WORKDIR /app

RUN mkdir /script

COPY package.json /app/package.json
RUN npm install

COPY src /app/src
COPY .env /app/.env
COPY tsconfig.json /app/tsconfig.json
COPY tsconfig.node.json /app/tsconfig.node.json
COPY vite.config.ts /app/vite.config.ts
COPY index.html /app/index.html

COPY entrypoint-build.sh /script/entrypoint.sh

CMD ["sh", "/script/entrypoint.sh"]
