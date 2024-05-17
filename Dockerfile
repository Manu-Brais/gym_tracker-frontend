# Node latest frontend with React
FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]

