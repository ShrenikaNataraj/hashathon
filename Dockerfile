FROM node:16.13.0-slim

WORKDIR /usr/src/app

# add config files
ADD *.json ./
ADD .* ./

# install dependencies
RUN apt update
RUN apt install -y curl
RUN npm install

# copy sources
ADD ./src ./src

# transpile TS to JS
RUN npm run build

# default port
ENV PORT=8000
EXPOSE 8000

CMD npm run migrate