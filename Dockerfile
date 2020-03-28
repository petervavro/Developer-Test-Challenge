FROM node:10
EXPOSE 3000 9229

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# RUN npm audit fix --force

# Bundle app source
COPY . .

RUN npm run build

CMD ./scripts/start.sh
