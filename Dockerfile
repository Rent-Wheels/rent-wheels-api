FROM node:18

WORKDIR /app

COPY . .

RUN apt-get update

RUN apt-get install ffmpeg -y

RUN npm install

RUN npm run build

CMD ["node", "build/src/server.js"]