FROM node:22-alpine3.19

USER root
VOLUME /output

WORKDIR /app
COPY . /app

RUN npm install

EXPOSE 8081

CMD npm run dev