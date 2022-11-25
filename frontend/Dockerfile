FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .


ENV PORT ${DEFAULT_PORT}

EXPOSE $PORT

CMD [ "npm", "start" ]
