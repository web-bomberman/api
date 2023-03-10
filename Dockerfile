FROM node:16.15-alpine
WORKDIR /usr/backend
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]