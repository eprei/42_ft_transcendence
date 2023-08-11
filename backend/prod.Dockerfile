FROM node:18-alpine

WORKDIR /app

# the packages installation takes a long times,
# so do it first
COPY package.json /app
RUN npm install

COPY tsconfig.json /app

# we copy the source files
COPY src /app/src
RUN npm run build

CMD ["node", "/app/dist/main"]
