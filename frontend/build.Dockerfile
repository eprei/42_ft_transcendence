FROM node:18-alpine

WORKDIR /app

RUN mkdir /script

COPY entrypoint-build.sh /script/entrypoint.sh

CMD ["sh", "/script/entrypoint.sh"]
