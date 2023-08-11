FROM node:18-alpine

WORKDIR /app

# the packages installation takes a long times,
# so do it first
COPY package.json /app
RUN npm install

# we copy the source files
COPY dist /app/dist


CMD ["node", "/app/dist/main"]
