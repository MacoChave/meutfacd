FROM node:18-alpine as builder 

WORKDIR /app 

COPY package*.json ./ 

RUN npm ci 

COPY . . 

RUN npm run build 

EXPOSE 5000

CMD [ "npm", "run", "start" ]