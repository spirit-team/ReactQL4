#FROM node:11.8.0-alpine AS builder
FROM node:12.19.0-alpine3.12 AS builder

# log most things
ENV NPM_CONFIG_LOGLEVEL notice

# OS packages for compilation
RUN apk add --no-cache python2 make g++ curl openssl ca-certificates

# install NPM packages
WORKDIR /build
ADD package*.json ./
RUN npm i
RUN npm audit fix

# add source
ADD . .

# build
RUN npm run build:production

########################

#FROM node:11.8.0-alpine
FROM node:12.19.0-alpine3.12
WORKDIR /app

RUN apk update && apk add --no-cache curl openssl ca-certificates

# copy source + compiled `node_modules` 
COPY --from=builder /build .

# by default, run in production mode
CMD npm run production
