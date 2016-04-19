'use strict';

const config = require('./config/environment');
const http = require('http');
const log = require('./models/log').module('Server');

module.exports.run = (app) => {
  const server = http.createServer(app.callback());

  require('./sockets')(server);

  server.listen(config.port);

  server.on('listening', () => {
    const addr = server.address();
    log.info(`Server is listening on port ${addr.port}.`);
  });
};
