FROM yodlr/nodejs
MAINTAINER Ross Kukulinski <ross@getyodlr.com>

WORKDIR /src

ADD package.json /src/
RUN npm install

ADD . /src/

CMD ["index.js"]
