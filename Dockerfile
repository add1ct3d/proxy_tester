FROM node:4-onbuild
RUN mkdir -p /usr/src/proxy_tester
WORKDIR /usr/src/proxy_tester
COPY package.json /usr/src/proxy_tester/
RUN npm install
COPY . /usr/src/proxy_tester
EXPOSE 9000
CMD ["npm", "start"]
