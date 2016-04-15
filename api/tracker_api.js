'use strict';

const ApiController = require('./api_controller');
const qs = require('qs'); // querystring parser that supports nesting and arrays
const Q = require('q');
const log = require('../models/log').module('Tracker Api');

module.exports = class TrackerApi extends ApiController {

  /**
    @param {ctx} object Koa context
    @returns promise
  */
  track (ctx) {
    const query = ctx.query;
    ctx.body = `Hello World at ${new Date()}`;
    ctx.body += ` | querystring: ${JSON.stringify(qs.parse(ctx.querystring))}`;

    const Redis = require('ioredis');
    const redis = new Redis();

    let result;
    if (query.count) {
      const count = parseInt(query.count, 10);
      result = redis.incrby('count', count).catch(err => {
        log.info(err, 'Error incrementing value in Redis');
      });
    } else {
      result = new Q();
    }
    return result;
  }
};
