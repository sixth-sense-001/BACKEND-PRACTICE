FROM node:22-alpine
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . .
EXPOSE 5000
CMD ["nodemon","./server/server.js"]