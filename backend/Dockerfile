FROM node

WORKDIR /backend

COPY package.json .

RUN npm config set unsafe-perm true

RUN npm install -g typescript

RUN npm install -g ts-node

RUN npm install

ENV HOST=34.136.221.76

ENV NODE_ENV=development
ENV PORT=50000
ENV JWT_SECRET=20

COPY . .

EXPOSE 50000

CMD ["node", "dist/server.js"]

