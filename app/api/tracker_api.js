'use strict';

const ApiController = require('./api_controller');
const qs = require('qs'); // querystring parser that supports nesting and arrays
const publisher = require('../models/redis/publisher');
const tracker = require('../models/tracker');
const log = require('../models/log').module('Tracker API');

class TrackerApi extends ApiController {

  /**
   * @param {ctx} object Koa context
   * @returns {promise}
   */
  track (ctx) {
    ctx.body = `Request at ${new Date()}`;
    ctx.body += '\n----------------------\n';
    ctx.body += `querystring: ${JSON.stringify(qs.parse(ctx.querystring))}\n`;

    // publish to Redis for realtime log statistics on the web page
    const querystringLogObject = { q: ctx.querystring, timestamp: Date.now() };
    publisher.publish('log_channel', JSON.stringify(querystringLogObject))
      .catch((err) => log.error(err));

    // save as object to log file
    const parsedQueryString = qs.parse(ctx.querystring);
    return tracker.track(parsedQueryString);
  }

}

module.exports = TrackerApi;
