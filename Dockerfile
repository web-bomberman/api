FROM node:16.15-alpine
WORKDIR /usr/src/backend
COPY . /usr/src/backend
RUN npm install
RUN npm run build