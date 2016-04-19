'use strict';

const ApiController = require('./api_controller');
const qs = require('qs'); // querystring parser that supports nesting and arrays
const tracker = require('../models/tracker');

class TrackerApi extends ApiController {

  /**
   * @param {ctx} object Koa context
   * @returns {promise}
   */
  track (ctx) {
    ctx.body = `Request at ${new Date()}`;
    ctx.body += '\n----------------------\n';
    ctx.body += `querystring: ${JSON.stringify(qs.parse(ctx.querystring))}`;

    const parsedQueryString = qs.parse(ctx.querystring);
    return tracker.track(parsedQueryString);
  }

}

module.exports = TrackerApi;
