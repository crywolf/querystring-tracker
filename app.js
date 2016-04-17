'use strict';

const app = require('koa')();
const server = require('./server');
const log = require('./models/log').module('App');

require('./config/koa')(app);

require('./config/bootstrap')
  .then(server.run(app))
  .catch(err => log.error(err));

module.exports = app;
