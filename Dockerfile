FROM node:21-alpine3.18

WORKDIR /webServer

EXPOSE 8080

RUN mkdir -p /webServer/application_layer
RUN mkdir -p /webServer/presentation_layer

COPY /application_layer/package.json /webServer/application_layer
COPY /application_layer/package-lock.json /webServer/application_layer/package-lock.json

WORKDIR /webServer/application_layer

RUN npm install

WORKDIR /webServer

COPY /application_layer/ /webServer/application_layer/

#COPY /presentation_layer /webServer/presentation_layer

WORKDIR /webServer/application_layer

CMD ["npx","nodemon", "server.js"]