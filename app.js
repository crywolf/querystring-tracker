'use strict';

const config = require('./config/environment');
const app = require('koa')();
const http = require('http');

require('./config/koa')(app);

const server = http.createServer(app.callback());

server.listen(config.port);

server.on('listening', () => {
  const addr = server.address();
  console.log(`Server is listening on port ${addr.port}`); // eslint-disable-line no-console
});
