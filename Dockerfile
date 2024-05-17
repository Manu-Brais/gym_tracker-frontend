# Node latest frontend with React
FROM node:latest

WORKDIR /gym_tracker/frontend

COPY . .

RUN npm install

EXPOSE 4000

CMD ["npm", "run", "dev"]

