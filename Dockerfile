FROM ubuntu:18.04

RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install curl -y

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -

RUN apt-get install nodejs -y
#RUN apt-get install npm -y

#RUN apt-get upgrade && apt install nodejs && apt-get install fswebcam

#RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories

#RUN apk update\
#    && apk add fswebcam

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

CMD [ "node", "index.js" ]