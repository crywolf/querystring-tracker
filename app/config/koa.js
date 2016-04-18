'use strict';

const koaMorgan = require('koa-morgan');
const koaStatic = require('koa-static');
const routes = require('./routes');

module.exports = (app) => {
  app.use(koaMorgan.middleware('combined'));
  app.use(koaStatic('public/'));
  app.use(routes.routes());
  app.use(routes.allowedMethods());
};
