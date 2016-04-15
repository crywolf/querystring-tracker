'use strict';

const ApiController = require('./api_controller');
const qs = require('qs'); // querystring parser that supports nesting and arrays
const tracker = require('../models/tracker');

class TrackerApi extends ApiController {

  constructor () {
    super();
    this.tracker = tracker;
    this.tracker.init();
  }

  /**
   * @param {ctx} object Koa context
   * @returns {promise}
   */
  track (ctx) {
    ctx.body = `Hello World at ${new Date()}`;
    ctx.body += ` | querystring: ${JSON.stringify(qs.parse(ctx.querystring))}`;

    const parsedQueryString = qs.parse(ctx.querystring);
    return this.tracker.track(parsedQueryString);
  }
}

module.exports = TrackerApi;
