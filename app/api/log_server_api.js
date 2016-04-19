'use strict';

const ApiController = require('./api_controller');
const logServer = require('../models/logServer');

class LogServerApi extends ApiController {

  /**
   * @param {ctx} object Koa context
   * @returns {promise}
   */
  getLog (ctx) {
    return logServer.streamLogFile(ctx);
  }

}

module.exports = LogServerApi;
