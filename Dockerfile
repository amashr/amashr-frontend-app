FROM node:alpine as builder

WORKDIR '/app'
COPY package*.json ./
RUN yarn install 
COPY . .
RUN yarn && yarn build

FROM nginx
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]