FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

WORKDIR /usr/src/app/src

EXPOSE 3000

CMD ["npm", "run", "dev"]