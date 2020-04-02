FROM node:10

# By specifying -p, you can create all the parent folders on the fly if they don't already exist
RUN mkdir -p /usr/src/app

# Create app directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
RUN npm run build

EXPOSE 3000 9229

CMD ./start.sh