FROM node:17

WORKDIR /src

EXPOSE 4000

RUN apt-get update 

RUN npm install i npm@latest -g

COPY package.json package-lock*.json ./

RUN npm install 

COPY . .

CMD ["node", "src/index.js"]

