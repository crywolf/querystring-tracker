'use strict';

const app = require('koa')();
const server = require('./app/server');
const log = require('./app/models/log').module('App');

require('./app/config/koa')(app);

require('./app/config/bootstrap')
  .then(server.run(app))
  .catch(err => log.error(err));

module.exports = app;
