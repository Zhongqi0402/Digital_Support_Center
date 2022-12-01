FROM node

WORKDIR /app

COPY package.json /app

RUN npm config set unsafe-perm true

RUN npm install -g typescript

RUN npm install -g ts-node

RUN npm install

COPY . .

ENV PORT 3000

EXPOSE 3000

CMD [ "npm", "start" ]
