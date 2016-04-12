'use strict';

const ApiController = require('./api_controller');

module.exports = class TrackerApi extends ApiController {
  track (ctx) {
    const query = ctx.query;
    ctx.body = `Hello World at ${new Date()}`;
    ctx.body += ` | query: ${JSON.stringify(query)}`;
  }
};
