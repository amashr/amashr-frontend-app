FROM node:alpine as builder

WORKDIR /app
COPY package*.json ./
RUN yarn install 
COPY . .
CMD ["yarn","start"]

