FROM node:14-alpine
ARG SERVER_PORT

ENV DOCKER true

WORKDIR /usr/src/app

# Server
COPY /Server/package*.json ./
COPY /Server ./
RUN rm -rf ./node_modules
RUN npm install

# Branding
COPY /Branding/Artwork/Backdrops/Bricks.png ./wesbites/eclipse/public/img/art/bricks.png
COPY /Branding/Artwork/Backdrops/Main.png ./websites/eclipse/public/img/art/default.png

COPY /Branding/Logos/Primary/Big.png ./websites/eclipse/public/img/brand/large.png
COPY /Branding/Logos/Primary/Small.png ./websites/eclipse/public/img/brand/small.png

# Packaging
RUN mkdir ./packaging
COPY /Packaging/Version ./packaging/version
COPY /.git/refs/heads/main ./packaging/commit

EXPOSE ${SERVER_PORT}
CMD [ "node", "index.js" ]