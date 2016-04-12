'use strict';

const koaMorgan = require('koa-morgan');
const routes = require('./routes');

module.exports = (app) => {
  app.use(koaMorgan.middleware('combined'));
  app.use(routes.routes());
  app.use(routes.allowedMethods());
};
