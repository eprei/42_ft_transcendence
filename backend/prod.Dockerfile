FROM node:18-alpine

WORKDIR /app

COPY package.json /app
COPY dist /app

RUN npm install

CMD ["node", "/app/dist/main"]
